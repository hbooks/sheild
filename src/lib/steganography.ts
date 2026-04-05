// LSB Steganography: embed and extract text in image pixel data

function textToBits(text: string): number[] {
  const bits: number[] = [];
  const encoder = new TextEncoder();
  const bytes = encoder.encode(text);
  // First 32 bits = length of message in bytes
  for (let i = 31; i >= 0; i--) {
    bits.push((bytes.length >> i) & 1);
  }
  for (const byte of bytes) {
    for (let i = 7; i >= 0; i--) {
      bits.push((byte >> i) & 1);
    }
  }
  return bits;
}

function bitsToText(bits: number[]): string {
  // First 32 bits = length
  let length = 0;
  for (let i = 0; i < 32; i++) {
    length = (length << 1) | bits[i];
  }
  if (length <= 0 || length > 100000) return '';
  
  const bytes = new Uint8Array(length);
  for (let i = 0; i < length; i++) {
    let byte = 0;
    for (let j = 0; j < 8; j++) {
      const bitIndex = 32 + i * 8 + j;
      if (bitIndex >= bits.length) return '';
      byte = (byte << 1) | bits[bitIndex];
    }
    bytes[i] = byte;
  }
  
  try {
    return new TextDecoder().decode(bytes);
  } catch {
    return '';
  }
}

export function embedLSB(canvas: HTMLCanvasElement, message: string): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Cannot get canvas context');
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data; // RGBA array
  const bits = textToBits(message);
  
  // We use R, G, B channels (skip A), so 3 bits per pixel
  const maxBits = Math.floor(data.length / 4) * 3;
  if (bits.length > maxBits) {
    throw new Error('Image too small to hold the message');
  }
  
  let bitIndex = 0;
  for (let i = 0; i < data.length && bitIndex < bits.length; i += 4) {
    // Modify R, G, B channels' LSB
    for (let ch = 0; ch < 3 && bitIndex < bits.length; ch++) {
      data[i + ch] = (data[i + ch] & 0xFE) | bits[bitIndex];
      bitIndex++;
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
}

export function extractLSB(canvas: HTMLCanvasElement): string {
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  // Extract enough bits for length header first (32 bits)
  const bits: number[] = [];
  let bitIndex = 0;
  
  for (let i = 0; i < data.length; i += 4) {
    for (let ch = 0; ch < 3; ch++) {
      bits.push(data[i + ch] & 1);
      bitIndex++;
    }
  }
  
  return bitsToText(bits);
}

// PNG tEXt chunk injection for metadata layer
export function addPngTextChunk(pngBlob: Blob, key: string, value: string): Promise<Blob> {
  return pngBlob.arrayBuffer().then(buffer => {
    const original = new Uint8Array(buffer);
    
    // Build tEXt chunk
    const keyBytes = new TextEncoder().encode(key);
    const valueBytes = new TextEncoder().encode(value);
    const chunkData = new Uint8Array(keyBytes.length + 1 + valueBytes.length);
    chunkData.set(keyBytes, 0);
    chunkData[keyBytes.length] = 0; // null separator
    chunkData.set(valueBytes, keyBytes.length + 1);
    
    const chunkLength = chunkData.length;
    const chunkType = new TextEncoder().encode('tEXt');
    
    // Calculate CRC32 over type + data
    const crcInput = new Uint8Array(4 + chunkLength);
    crcInput.set(chunkType, 0);
    crcInput.set(chunkData, 4);
    const crc = crc32(crcInput);
    
    // Full chunk: 4 bytes length + 4 bytes type + data + 4 bytes CRC
    const chunk = new Uint8Array(12 + chunkLength);
    const view = new DataView(chunk.buffer);
    view.setUint32(0, chunkLength);
    chunk.set(chunkType, 4);
    chunk.set(chunkData, 8);
    view.setUint32(8 + chunkLength, crc);
    
    // Insert after IHDR (first chunk). PNG sig = 8 bytes, IHDR = 25 bytes (4+4+13+4)
    const insertPos = 8 + 25;
    const result = new Uint8Array(original.length + chunk.length);
    result.set(original.slice(0, insertPos), 0);
    result.set(chunk, insertPos);
    result.set(original.slice(insertPos), insertPos + chunk.length);
    
    return new Blob([result], { type: 'image/png' });
  });
}

// CRC32 implementation
function crc32(data: Uint8Array): number {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < data.length; i++) {
    crc ^= data[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// Extract tEXt chunks from PNG
export function extractPngTextChunks(blob: Blob): Promise<Record<string, string>> {
  return blob.arrayBuffer().then(buffer => {
    const data = new Uint8Array(buffer);
    const result: Record<string, string> = {};
    let pos = 8; // skip PNG signature
    
    while (pos < data.length - 8) {
      const view = new DataView(data.buffer, pos);
      const length = view.getUint32(0);
      const type = new TextDecoder().decode(data.slice(pos + 4, pos + 8));
      
      if (type === 'tEXt') {
        const chunkData = data.slice(pos + 8, pos + 8 + length);
        const nullIdx = chunkData.indexOf(0);
        if (nullIdx !== -1) {
          const key = new TextDecoder().decode(chunkData.slice(0, nullIdx));
          const value = new TextDecoder().decode(chunkData.slice(nullIdx + 1));
          result[key] = value;
        }
      }
      
      pos += 12 + length;
      if (type === 'IEND') break;
    }
    
    return result;
  });
}
