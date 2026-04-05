import { useState, useRef } from "react";
import { ShieldCheck, Download, Loader2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import DropZone from "./DropZone";
import { embedLSB, addPngTextChunk } from "@/lib/steganography";
import { getUserId } from "@/lib/userId";

export default function ProtectCard() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFile = (f: File) => {
    if (!f.type.startsWith("image/")) {
      setError("Please upload an image file (PNG or JPG).");
      return;
    }
    setError(null);
    setDownloadUrl(null);
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const protect = async () => {
    if (!file || !canvasRef.current) return;
    setLoading(true);
    setError(null);

    try {
      const img = new Image();
      img.src = preview!;
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = () => rej(new Error("Failed to load image"));
      });

      if (img.width < 10 || img.height < 10) {
        throw new Error("Image is too small to embed a watermark.");
      }

      const canvas = canvasRef.current;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);

      const userId = getUserId();
      const payload = `PMEFA|${userId}|${Date.now()}|AI_OPT_OUT`;

      embedLSB(canvas, payload);

      const blob = await new Promise<Blob>((res, rej) => {
        canvas.toBlob(b => (b ? res(b) : rej(new Error("Canvas export failed"))), "image/png");
      });

      const finalBlob = await addPngTextChunk(blob, "PMEFA", payload);

      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
      setDownloadUrl(URL.createObjectURL(finalBlob));
    } catch (e: any) {
      setError(e.message || "An error occurred during protection.");
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setFile(null);
    setPreview(null);
    setDownloadUrl(null);
    setError(null);
  };

  return (
    <div className="glass-strong rounded-2xl p-8 shadow-card animate-fade-in-up group hover:border-primary/20 transition-all duration-300">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
          <ShieldCheck className="h-5 w-5 text-primary" />
        </div>
        <h2 className="text-lg font-semibold tracking-tight">Protect a Photo</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Upload an image to embed pMEFA protection.
      </p>

      {!preview ? (
        <DropZone onFile={handleFile} />
      ) : (
        <div className="space-y-4">
          <div className="rounded-xl overflow-hidden bg-background/50 p-2">
            <img src={preview} alt="Preview" className="max-h-56 rounded-lg mx-auto object-contain" />
          </div>
          <div className="flex gap-3 flex-wrap">
            <Button onClick={protect} disabled={loading} className="gap-2 rounded-xl">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
              Protect & Download
            </Button>
            <Button variant="ghost" onClick={clear} className="gap-2 rounded-xl text-muted-foreground">
              <RotateCcw className="h-4 w-4" /> Clear
            </Button>
          </div>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {downloadUrl && (
        <div className="mt-5 p-4 rounded-xl bg-accent/5 border border-accent/20">
          <p className="text-sm text-accent font-medium mb-3"> Image protected successfully!</p>
          <a href={downloadUrl} download="pmefa-protected.png">
            <Button variant="outline" size="sm" className="gap-2 rounded-xl border-accent/30 text-accent hover:bg-accent/10">
              <Download className="h-4 w-4" /> Download Protected Image
            </Button>
          </a>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
