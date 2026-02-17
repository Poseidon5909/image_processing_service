import { useState } from "react";
import { uploadImage } from "@/lib/api";

interface UploadFormProps {
  onUploadSuccess: () => void;
}

export default function UploadForm({ onUploadSuccess }: UploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setError("");
      setSuccess("");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError("Please select a file");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess("");

    try {
      await uploadImage(selectedFile);
      setSuccess("Image uploaded successfully!");
      setSelectedFile(null);
      
      // Reset file input
      const fileInput = document.getElementById("fileInput") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      
      // Notify parent component
      onUploadSuccess();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleUpload} style={styles.uploadForm}>
      <input
        id="fileInput"
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        style={styles.fileInput}
      />
      
      {selectedFile && (
        <p style={styles.selectedFile}>
          Selected: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
        </p>
      )}
      
      <button 
        type="submit" 
        style={styles.uploadButton}
        disabled={!selectedFile || uploading}
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
      
      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}
    </form>
  );
}

const styles = {
  uploadForm: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  } as React.CSSProperties,
  fileInput: {
    padding: "10px",
    border: "2px solid #e5e7eb",
    borderRadius: "6px",
    fontSize: "14px",
    cursor: "pointer",
    transition: "border-color 0.2s",
  } as React.CSSProperties,
  selectedFile: {
    fontSize: "14px",
    color: "#666",
    margin: "0",
    padding: "8px 12px",
    backgroundColor: "#f9fafb",
    borderRadius: "4px",
  } as React.CSSProperties,
  uploadButton: {
    padding: "14px 28px",
    fontSize: "15px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
  } as React.CSSProperties,
  error: {
    padding: "14px 18px",
    backgroundColor: "#fee2e2",
    color: "#dc2626",
    borderRadius: "6px",
    fontSize: "14px",
    border: "1px solid #fecaca",
    lineHeight: "1.5",
  } as React.CSSProperties,
  success: {
    padding: "14px 18px",
    backgroundColor: "#d1fae5",
    color: "#059669",
    borderRadius: "6px",
    fontSize: "14px",
    border: "1px solid #a7f3d0",
    lineHeight: "1.5",
  } as React.CSSProperties,
};
