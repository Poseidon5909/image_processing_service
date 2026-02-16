"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, logout, uploadImage, getUserImages } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  // Upload form state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState("");
  
  // Images list state
  const [images, setImages] = useState<any[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [imagesError, setImagesError] = useState("");

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      setLoading(false);
      fetchImages();
    }
  }, [router]);

  const fetchImages = async () => {
    setLoadingImages(true);
    setImagesError("");
    try {
      const data = await getUserImages();
      setImages(data.items || []);
    } catch (err: any) {
      setImagesError(err.message);
    } finally {
      setLoadingImages(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadError("");
      setUploadSuccess("");
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setUploadError("Please select a file");
      return;
    }

    setUploading(true);
    setUploadError("");
    setUploadSuccess("");

    try {
      await uploadImage(selectedFile);
      setUploadSuccess("Image uploaded successfully!");
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById("fileInput") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
      // Refresh images list
      fetchImages();
    } catch (err: any) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <main style={styles.container}>
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <main style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Dashboard</h1>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
      
      {/* Upload Form */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Upload Image</h2>
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
          
          {uploadError && <div style={styles.error}>{uploadError}</div>}
          {uploadSuccess && <div style={styles.success}>{uploadSuccess}</div>}
        </form>
      </div>

      {/* Images List */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Your Images</h2>
        
        {loadingImages && <p>Loading images...</p>}
        {imagesError && <div style={styles.error}>{imagesError}</div>}
        
        {!loadingImages && images.length === 0 && (
          <p style={styles.cardText}>No images uploaded yet.</p>
        )}
        
        {!loadingImages && images.length > 0 && (
          <div style={styles.imageGrid}>
            {images.map((image) => (
              <div key={image.id} style={styles.imageCard}>
                <div style={styles.imageInfo}>
                  <p style={styles.imageName}>{image.filename}</p>
                  <p style={styles.imageMeta}>
                    Uploaded: {new Date(image.created_at).toLocaleDateString()}
                  </p>
                  <p style={styles.imageMeta}>
                    Transformations: {image.transformation_count}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

const styles = {
  container: {
    padding: "40px",
    maxWidth: "1200px",
    margin: "0 auto",
  } as React.CSSProperties,
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  } as React.CSSProperties,
  title: {
    fontSize: "32px",
    fontWeight: "700",
    margin: "0",
    color: "#1a1a1a",
  } as React.CSSProperties,
  logoutButton: {
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#dc2626",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  } as React.CSSProperties,
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    padding: "24px",
    marginBottom: "20px",
  } as React.CSSProperties,
  cardTitle: {
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 16px 0",
    color: "#1a1a1a",
  } as React.CSSProperties,
  cardText: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#666",
    margin: "0",
  } as React.CSSProperties,
  uploadForm: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  } as React.CSSProperties,
  fileInput: {
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
  } as React.CSSProperties,
  selectedFile: {
    fontSize: "14px",
    color: "#666",
    margin: "0",
  } as React.CSSProperties,
  uploadButton: {
    padding: "12px 24px",
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  } as React.CSSProperties,
  error: {
    padding: "12px",
    backgroundColor: "#fee2e2",
    color: "#dc2626",
    borderRadius: "4px",
    fontSize: "14px",
  } as React.CSSProperties,
  success: {
    padding: "12px",
    backgroundColor: "#d1fae5",
    color: "#059669",
    borderRadius: "4px",
    fontSize: "14px",
  } as React.CSSProperties,
  imageGrid: {
    display: "grid",
    gap: "16px",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
  } as React.CSSProperties,
  imageCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    padding: "16px",
    backgroundColor: "#f9fafb",
  } as React.CSSProperties,
  imageInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  } as React.CSSProperties,
  imageName: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1a1a1a",
    margin: "0",
    wordBreak: "break-word",
  } as React.CSSProperties,
  imageMeta: {
    fontSize: "14px",
    color: "#666",
    margin: "0",
  } as React.CSSProperties,
};
