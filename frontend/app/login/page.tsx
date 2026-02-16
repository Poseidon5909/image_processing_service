"use client";

import { useState } from "react";
import { login } from "@/lib/api";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login</h1>
        <p style={styles.subtitle}>Sign in to your account</p>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account?{" "}
          <Link href="/register" style={styles.link}>
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  } as React.CSSProperties,
  card: {
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    padding: "40px",
    maxWidth: "400px",
    width: "100%",
  } as React.CSSProperties,
  title: {
    fontSize: "28px",
    fontWeight: "700",
    margin: "0 0 8px 0",
    color: "#1a1a1a",
  } as React.CSSProperties,
  subtitle: {
    fontSize: "14px",
    color: "#666",
    margin: "0 0 30px 0",
  } as React.CSSProperties,
  form: {
    marginBottom: "20px",
  } as React.CSSProperties,
  formGroup: {
    marginBottom: "20px",
  } as React.CSSProperties,
  label: {
    display: "block",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "6px",
    color: "#333",
  } as React.CSSProperties,
  input: {
    width: "100%",
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  } as React.CSSProperties,
  button: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#4f46e5",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.2s",
  } as React.CSSProperties,
  error: {
    backgroundColor: "#fee",
    color: "#c33",
    padding: "12px",
    borderRadius: "4px",
    marginBottom: "20px",
    fontSize: "14px",
    border: "1px solid #fcc",
  } as React.CSSProperties,
  footer: {
    textAlign: "center",
    fontSize: "14px",
    color: "#666",
    margin: "0",
  } as React.CSSProperties,
  link: {
    color: "#4f46e5",
    textDecoration: "none",
    fontWeight: "600",
  } as React.CSSProperties,
};