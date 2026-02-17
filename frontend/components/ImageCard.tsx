import { useState } from "react";
import TransformPanel from "@/components/TransformPanel";
import config from "@/lib/config";

interface Image {
  id: number;
  filename: string;
  created_at: string;
  transformation_count: number;
}

interface ImageCardProps {
  image: Image;
  onTransformSuccess: () => void;
}

function ImageCard({ image, onTransformSuccess }: ImageCardProps) {
  const [showTransform, setShowTransform] = useState(false);

  const handleDownload = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/images/${image.id}/file`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = image.filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div style={styles.imageCard}>
      {/* Image Preview */}
      <div style={styles.imagePreview}>
        <img 
          src={`${config.apiUrl}/images/${image.id}/file`}
          alt={image.filename}
          style={styles.previewImg}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23999"%3ENo Preview%3C/text%3E%3C/svg%3E';
          }}
        />
      </div>
      
      {/* Image Info */}
      <div style={styles.imageInfo}>
        <p style={styles.imageName}>{image.filename}</p>
        <p style={styles.imageMeta}>
          Uploaded: {new Date(image.created_at).toLocaleDateString()}
        </p>
        <p style={styles.imageMeta}>
          Transformations: {image.transformation_count}
        </p>
        
        <div style={styles.buttonGroup}>
          <button 
            onClick={() => setShowTransform(!showTransform)}
            style={styles.transformToggle}
          >
            {showTransform ? "Hide Transform" : "Transform Image"}
          </button>
          
          <button 
            onClick={handleDownload}
            style={styles.downloadButton}
            title="Download image"
          >
            ⬇ Download
          </button>
        </div>

        {/* Transform Panel */}
        {showTransform && (
          <TransformPanel 
            imageId={image.id}
            onSuccess={() => {
              setShowTransform(false);
              onTransformSuccess();
            }}
          />
        )}
      </div>
    </div>
  );
}

const styles = {
  imageCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "#ffffff",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.06)",
    transition: "all 0.2s ease",
  } as React.CSSProperties,
  imagePreview: {
    width: "100%",
    height: "200px",
    backgroundColor: "#f3f4f6",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } as React.CSSProperties,
  previewImg: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as "cover",
  } as React.CSSProperties,
  imageInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "20px",
  } as React.CSSProperties,
  imageName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1a1a1a",
    margin: "0",
    wordBreak: "break-word",
  } as React.CSSProperties,
  imageMeta: {
    fontSize: "13px",
    color: "#6b7280",
    margin: "0",
  } as React.CSSProperties,
  buttonGroup: {
    display: "flex",
    gap: "8px",
    marginTop: "8px",
  } as React.CSSProperties,
  transformToggle: {
    flex: 1,
    padding: "10px 18px",
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#059669",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(5, 150, 105, 0.2)",
  } as React.CSSProperties,
  downloadButton: {
    padding: "10px 18px",
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
    whiteSpace: "nowrap" as "nowrap",
  } as React.CSSProperties,
};

// Memoized export for performance
export default ImageCard;
