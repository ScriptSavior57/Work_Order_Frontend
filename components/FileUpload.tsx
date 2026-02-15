"use client";

import { useCallback, useState } from "react";

const ACCEPT = ".pdf,.xlsx,.xls";

interface FileUploadProps {
  onUpload: (file: File) => Promise<void>;
  disabled?: boolean;
}

export default function FileUpload({ onUpload, disabled }: FileUploadProps) {
  const [drag, setDrag] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    async (file: File | null) => {
      if (!file) return;
      setError(null);
      const ext = file.name.toLowerCase().split(".").pop();
      if (!["pdf", "xlsx", "xls"].includes(ext || "")) {
        setError("Please upload a PDF or Excel file.");
        return;
      }
      try {
        await onUpload(file);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Upload failed");
      }
    },
    [onUpload]
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    handleFile(e.dataTransfer.files[0] ?? null);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0] ?? null);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={onDrop}
      style={{
        border: `2px dashed ${drag ? "var(--accent)" : "var(--border)"}`,
        borderRadius: 8,
        padding: 24,
        textAlign: "center",
        background: drag ? "rgba(88,166,255,0.08)" : "var(--surface)",
        opacity: disabled ? 0.6 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      <input
        type="file"
        accept={ACCEPT}
        onChange={onInputChange}
        style={{ display: "none" }}
        id="file-upload"
      />
      <label htmlFor="file-upload" style={{ cursor: "pointer" }}>
        Drop a work order report (PDF or Excel) here, or click to browse.
      </label>
      {error && (
        <p style={{ color: "var(--danger)", marginTop: 8, fontSize: 14 }}>
          {error}
        </p>
      )}
    </div>
  );
}
