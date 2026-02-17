"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [pathname]);

  return (
    <nav style={styles.nav}>
      <Link href="/" style={styles.logo}>
        📸 Image Service
      </Link>

      <div style={styles.links}>
        {!isAuthenticated ? (
          <>
            <Link href="/login" style={pathname === "/login" ? styles.activeLink : styles.link}>
              Login
            </Link>
            <Link href="/register" style={pathname === "/register" ? styles.activeLink : styles.link}>
              Register
            </Link>
          </>
        ) : (
          <Link href="/dashboard" style={pathname === "/dashboard" ? styles.activeLink : styles.link}>
            Dashboard
          </Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    backgroundColor: "#ffffff",
    borderBottom: "2px solid #f0f0f0",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
  } as React.CSSProperties,
  logo: {
    fontWeight: "700",
    fontSize: "20px",
    color: "#1a1a1a",
    textDecoration: "none",
    transition: "color 0.2s",
  } as React.CSSProperties,
  links: {
    display: "flex",
    gap: "24px",
    fontSize: "15px",
  } as React.CSSProperties,
  link: {
    textDecoration: "none",
    color: "#666",
    fontWeight: "500",
    transition: "color 0.2s",
    padding: "6px 12px",
    borderRadius: "4px",
  } as React.CSSProperties,
  activeLink: {
    textDecoration: "none",
    color: "#2563eb",
    fontWeight: "600",
    padding: "6px 12px",
    borderRadius: "4px",
    backgroundColor: "#eff6ff",
  } as React.CSSProperties,
};