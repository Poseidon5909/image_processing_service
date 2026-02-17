"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout, getUserImages } from "@/lib/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import UploadForm from "@/components/UploadForm";
import ImageCard from "@/components/ImageCard";
import withAuth from "@/components/withAuth";

interface Image {
  id: number;
  filename: string;
  created_at: string;
  transformation_count: number;
}

function DashboardPage() {
  const router = useRouter();
  
  // Images list state
  const [images, setImages] = useState<Image[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);
  const [imagesError, setImagesError] = useState("");

  useEffect(() => {
    fetchImages();
  }, []);

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

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

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
        <UploadForm onUploadSuccess={fetchImages} />
      </div>

      {/* Images List */}
      <div style={styles.card}>
        <h2 style={styles.cardTitle}>Your Images</h2>
        
        {loadingImages && <LoadingSpinner size="medium" />}
        {imagesError && <div style={styles.error}>{imagesError}</div>}
        
        {!loadingImages && images.length === 0 && (
          <p style={styles.cardText}>No images uploaded yet.</p>
        )}
        
        {!loadingImages && images.length > 0 && (
          <div style={styles.imageGrid}>
            {images.map((image) => (
              <ImageCard 
                key={image.id} 
                image={image}
                onTransformSuccess={fetchImages}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// Export with authentication wrapper
export default withAuth(DashboardPage);

const styles = {
  container: {
    padding: "40px 20px",
    maxWidth: "1400px",
    margin: "0 auto",
    minHeight: "calc(100vh - 60px)",
  } as React.CSSProperties,
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    gap: "20px",
    flexWrap: "wrap" as "wrap",
  } as React.CSSProperties,
  title: {
    fontSize: "32px",
    fontWeight: "700",
    margin: "0",
    color: "#1a1a1a",
  } as React.CSSProperties,
  logoutButton: {
    padding: "12px 24px",
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#dc2626",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(220, 38, 38, 0.2)",
  } as React.CSSProperties,
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    padding: "32px",
    marginBottom: "30px",
    border: "1px solid #f0f0f0",
  } as React.CSSProperties,
  cardTitle: {
    fontSize: "22px",
    fontWeight: "600",
    margin: "0 0 24px 0",
    color: "#1a1a1a",
  } as React.CSSProperties,
  cardText: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#666",
    margin: "0",
  } as React.CSSProperties,
  imageGrid: {
    display: "grid",
    gap: "24px",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
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
};

