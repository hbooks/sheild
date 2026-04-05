import { useState, useRef } from "react";
import { Search, Loader2, ShieldCheck, ShieldX } from "lucide-react";
import DropZone from "./DropZone";
import { extractLSB, extractPngTextChunks } from "@/lib/steganography";

export default function VerifyCard() {
  const [result, setResult] = useState<string | null>(null);
  const [found, setFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const verify = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file.");
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.src = url;
      await new Promise<void>((res, rej) => {
        img.onload = () => res();
        img.onerror = () => rej(new Error("Failed to load image"));
      });

      const canvas = canvasRef.current!;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      URL.revokeObjectURL(url);

      const lsbMessage = extractLSB(canvas);

      let metaMessage = '';
      if (file.type === 'image/png') {
        const chunks = await extractPngTextChunks(file);
        metaMessage = chunks['PMEFA'] || '';
      }

      const message = lsbMessage.startsWith('PMEFA|') ? lsbMessage : metaMessage;

      if (message && message.startsWith('PMEFA|')) {
        setFound(true);
        setResult(message);
      } else {
        setFound(false);
        setResult('none');
      }
    } catch (e: any) {
      setError(e.message || "An error occurred during verification.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-strong rounded-2xl p-8 shadow-card animate-fade-in-up group hover:border-secondary/20 transition-all duration-300" style={{ animationDelay: "0.15s" }}>
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-secondary/10">
          <Search className="h-5 w-5 text-secondary" />
        </div>
        <h2 className="text-lg font-semibold tracking-tight">Verify a Photo</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Upload an image to check for a PMEFA watermark.
      </p>

      <DropZone onFile={verify} label="Drop an image to verify" />

      {loading && (
        <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Analyzing image…
        </div>
      )}

      {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

      {result && !loading && (
        <div className={`mt-5 p-4 rounded-xl border ${found ? 'bg-accent/5 border-accent/20' : 'bg-destructive/5 border-destructive/20'}`}>
          {found ? (
            <div className="flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 text-accent mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-accent">Protected by PMEFA – AI training prohibited</p>
                <p className="text-xs text-muted-foreground mt-1.5 font-mono break-all bg-background/50 rounded-lg p-2">{result}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <ShieldX className="h-5 w-5 text-destructive shrink-0" />
              <p className="text-sm font-medium text-destructive">No PMEFA watermark found</p>
            </div>
          )}
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
