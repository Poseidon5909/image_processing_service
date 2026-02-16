"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, logout } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

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
      
      <div style={styles.content}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Welcome!</h2>
          <p style={styles.cardText}>
            You are successfully logged in. Your JWT token is stored in localStorage and will be automatically attached to all authenticated API requests.
          </p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Next Steps</h2>
          <p style={styles.cardText}>
            Image upload and transformation features will be implemented in the next phase.
          </p>
        </div>
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
  content: {
    display: "grid",
    gap: "20px",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  } as React.CSSProperties,
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    padding: "24px",
  } as React.CSSProperties,
  cardTitle: {
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 12px 0",
    color: "#1a1a1a",
  } as React.CSSProperties,
  cardText: {
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#666",
    margin: "0",
  } as React.CSSProperties,
};
