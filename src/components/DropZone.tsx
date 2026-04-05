import { useCallback, useState } from "react";
import { Upload } from "lucide-react";

interface DropZoneProps {
  onFile: (file: File) => void;
  accept?: string;
  label?: string;
}

export default function DropZone({ onFile, accept = "image/png,image/jpeg", label = "Drop an image here or click to upload" }: DropZoneProps) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) onFile(file);
  }, [onFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onFile(file);
    e.target.value = '';
  }, [onFile]);

  return (
    <label
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className={`flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-10 cursor-pointer transition-all duration-300 ${
        dragging
          ? "border-primary bg-primary/5 scale-[1.01]"
          : "border-border/60 hover:border-primary/40 hover:bg-primary/5"
      }`}
    >
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-muted/50">
        <Upload className="h-5 w-5 text-muted-foreground" />
      </div>
      <span className="text-sm text-muted-foreground text-center">{label}</span>
      <span className="text-xs text-muted-foreground/50">PNG or JPG</span>
      <input type="file" accept={accept} onChange={handleChange} className="hidden" />
    </label>
  );
}
