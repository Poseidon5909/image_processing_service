import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>Image Service</div>

      <div style={styles.links}>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
        <Link href="/dashboard">Dashboard</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 40px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e5e5e5",
  },
  logo: {
    fontWeight: "600",
    fontSize: "18px",
    color: "#111",
  },
  links: {
    display: "flex",
    gap: "30px",
    fontSize: "15px",
  },
};