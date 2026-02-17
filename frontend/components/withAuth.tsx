"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/api";
import LoadingSpinner from "./LoadingSpinner";

export default function withAuth<P extends object>(
  Component: React.ComponentType<P>
) {
  return function ProtectedRoute(props: P) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Check authentication
      if (!isAuthenticated()) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return (
        <div style={styles.container}>
          <LoadingSpinner size="large" />
        </div>
      );
    }

    return <Component {...props} />;
  };
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(100vh - 80px)",
  } as React.CSSProperties,
};
