export default function LoadingSpinner({ size = "medium" }: { size?: "small" | "medium" | "large" }) {
  const sizeMap = {
    small: 20,
    medium: 40,
    large: 60,
  };

  const spinnerSize = sizeMap[size];

  return (
    <div style={styles.spinnerContainer}>
      <div style={{ ...styles.spinner, width: spinnerSize, height: spinnerSize }} />
    </div>
  );
}

const styles = {
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  } as React.CSSProperties,
  spinner: {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #2563eb",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  } as React.CSSProperties,
};
