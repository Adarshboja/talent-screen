import { useRef, useState } from "react";
import { FileText, UploadCloud, X } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

type FileUploadZoneProps = {
  file: File | null;
  error?: string;
  onChange: (file: File | null, error?: string) => void;
};

export function FileUploadZone({ file, error, onChange }: FileUploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (nextFile: File | undefined) => {
    if (!nextFile) return;
    const isPdf =
      nextFile.type === "application/pdf" &&
      nextFile.name.toLowerCase().endsWith(".pdf");
    if (!isPdf) return onChange(null, "Please upload a PDF file.");
    if (nextFile.size > MAX_FILE_SIZE)
      return onChange(null, "Your resume must be smaller than 5 MB.");
    onChange(nextFile);
  };

  return (
    <div>
      <div
        className={`upload-zone ${isDragging ? "is-dragging" : ""} ${error ? "has-error" : ""}`}
        role="button"
        tabIndex={0}
        aria-label="Upload PDF resume"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ")
            inputRef.current?.click();
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          validateFile(event.dataTransfer.files[0]);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          hidden
          onChange={(event) => validateFile(event.target.files?.[0])}
        />
        {file ? (
          <div
            className="selected-file"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="file-icon">
              <FileText size={21} aria-hidden="true" />
            </span>
            <span className="file-details">
              <strong>{file.name}</strong>
              <small>{(file.size / 1024 / 1024).toFixed(2)} MB · PDF</small>
            </span>
            <button
              className="icon-button"
              type="button"
              aria-label="Remove resume"
              onClick={() => {
                onChange(null);
                if (inputRef.current) inputRef.current.value = "";
              }}
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <>
            <span className="upload-icon">
              <UploadCloud size={23} aria-hidden="true" />
            </span>
            <strong>Drop your resume here, or browse</strong>
            <span>PDF only · up to 5 MB</span>
          </>
        )}
      </div>
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
