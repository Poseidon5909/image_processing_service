"use client";

import React from "react";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={styles.container}>
          <div style={styles.card}>
            <h2 style={styles.title}>⚠️ Something went wrong</h2>
            <p style={styles.message}>
              We encountered an unexpected error. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={styles.button}
            >
              Refresh Page
            </button>
            {this.state.error && (
              <details style={styles.details}>
                <summary style={styles.summary}>Error details</summary>
                <pre style={styles.pre}>{this.state.error.toString()}</pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 80px)",
    padding: "20px",
  } as React.CSSProperties,
  card: {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
    padding: "40px",
    maxWidth: "500px",
    textAlign: "center" as "center",
  } as React.CSSProperties,
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "16px",
  } as React.CSSProperties,
  message: {
    fontSize: "15px",
    color: "#666",
    lineHeight: "1.6",
    marginBottom: "24px",
  } as React.CSSProperties,
  button: {
    padding: "12px 24px",
    fontSize: "15px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  } as React.CSSProperties,
  details: {
    marginTop: "20px",
    textAlign: "left" as "left",
    fontSize: "13px",
  } as React.CSSProperties,
  summary: {
    cursor: "pointer",
    color: "#666",
    marginBottom: "8px",
  } as React.CSSProperties,
  pre: {
    backgroundColor: "#f3f4f6",
    padding: "12px",
    borderRadius: "4px",
    overflow: "auto",
    color: "#dc2626",
  } as React.CSSProperties,
};

export default ErrorBoundary;
