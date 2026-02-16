import Link from "next/link";

export default function Home() {
  return (
    <main style={styles.main}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Transform Your Images<br />
            <span style={styles.heroAccent}>Instantly & Effortlessly</span>
          </h1>
          <p style={styles.heroSubtitle}>
            Professional image processing at your fingertips. Resize, crop, rotate, and apply stunning transformations to your images in seconds.
          </p>
          <div style={styles.heroButtons}>
            <Link href="/register" style={styles.primaryButton}>
              Get Started Free
            </Link>
            <Link href="/login" style={styles.secondaryButton}>
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 style={styles.featuresTitle}>Powerful Features</h2>
        <p style={styles.featuresSubtitle}>Everything you need to work with images</p>
        
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🖼️</div>
            <h3 style={styles.featureTitle}>Smart Resize</h3>
            <p style={styles.featureText}>
              Resize images to any dimension while maintaining quality and aspect ratio.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>✂️</div>
            <h3 style={styles.featureTitle}>Precise Crop</h3>
            <p style={styles.featureText}>
              Crop images with pixel-perfect precision to focus on what matters.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔄</div>
            <h3 style={styles.featureTitle}>Rotate & Flip</h3>
            <p style={styles.featureText}>
              Rotate images to any angle and flip horizontally or vertically.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>⚡</div>
            <h3 style={styles.featureTitle}>Lightning Fast</h3>
            <p style={styles.featureText}>
              Process images in seconds with our optimized backend infrastructure.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>🔒</div>
            <h3 style={styles.featureTitle}>Secure & Private</h3>
            <p style={styles.featureText}>
              Your images are encrypted and secure. We never share your data.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIcon}>☁️</div>
            <h3 style={styles.featureTitle}>Cloud Storage</h3>
            <p style={styles.featureText}>
              Access your processed images anytime, anywhere from any device.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>Ready to Get Started?</h2>
        <p style={styles.ctaText}>Join thousands of users transforming their images today</p>
        <Link href="/register" style={styles.ctaButton}>
          Create Free Account
        </Link>
      </section>
    </main>
  );
}

const styles = {
  main: {
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
  } as React.CSSProperties,

  // Hero Section
  hero: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "80px 20px",
    textAlign: "center",
    color: "white",
  } as React.CSSProperties,
  heroContent: {
    maxWidth: "800px",
    margin: "0 auto",
  } as React.CSSProperties,
  heroTitle: {
    fontSize: "48px",
    fontWeight: "800",
    margin: "0 0 20px 0",
    lineHeight: "1.2",
  } as React.CSSProperties,
  heroAccent: {
    color: "#fbbf24",
  } as React.CSSProperties,
  heroSubtitle: {
    fontSize: "20px",
    lineHeight: "1.6",
    margin: "0 0 40px 0",
    opacity: 0.95,
  } as React.CSSProperties,
  heroButtons: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
  } as React.CSSProperties,
  primaryButton: {
    backgroundColor: "#fbbf24",
    color: "#1a1a1a",
    padding: "14px 32px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
    display: "inline-block",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 12px rgba(251, 191, 36, 0.3)",
  } as React.CSSProperties,
  secondaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "white",
    padding: "14px 32px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
    display: "inline-block",
    border: "2px solid rgba(255, 255, 255, 0.3)",
    transition: "background-color 0.2s",
  } as React.CSSProperties,

  // Features Section
  features: {
    padding: "80px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  } as React.CSSProperties,
  featuresTitle: {
    fontSize: "40px",
    fontWeight: "700",
    textAlign: "center",
    margin: "0 0 12px 0",
    color: "#1a1a1a",
  } as React.CSSProperties,
  featuresSubtitle: {
    fontSize: "18px",
    textAlign: "center",
    color: "#6b7280",
    margin: "0 0 60px 0",
  } as React.CSSProperties,
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "30px",
  } as React.CSSProperties,
  featureCard: {
    backgroundColor: "white",
    padding: "32px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    transition: "transform 0.2s, box-shadow 0.2s",
    textAlign: "center",
  } as React.CSSProperties,
  featureIcon: {
    fontSize: "48px",
    marginBottom: "16px",
  } as React.CSSProperties,
  featureTitle: {
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 12px 0",
    color: "#1a1a1a",
  } as React.CSSProperties,
  featureText: {
    fontSize: "15px",
    lineHeight: "1.6",
    color: "#6b7280",
    margin: "0",
  } as React.CSSProperties,

  // CTA Section
  cta: {
    backgroundColor: "#1f2937",
    padding: "60px 20px",
    textAlign: "center",
    color: "white",
  } as React.CSSProperties,
  ctaTitle: {
    fontSize: "36px",
    fontWeight: "700",
    margin: "0 0 16px 0",
  } as React.CSSProperties,
  ctaText: {
    fontSize: "18px",
    margin: "0 0 32px 0",
    opacity: 0.9,
  } as React.CSSProperties,
  ctaButton: {
    backgroundColor: "#667eea",
    color: "white",
    padding: "14px 40px",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
    display: "inline-block",
    transition: "background-color 0.2s",
  } as React.CSSProperties,
};