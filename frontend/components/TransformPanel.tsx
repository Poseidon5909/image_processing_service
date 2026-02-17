import { useState } from "react";
import { transformImage } from "@/lib/api";

interface TransformPanelProps {
  imageId: number;
  onSuccess: () => void;
}

export default function TransformPanel({ imageId, onSuccess }: TransformPanelProps) {
  const [action, setAction] = useState("resize");
  const [params, setParams] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleParamChange = (param: string, value: any) => {
    setParams((prev: any) => ({
      ...prev,
      [param]: value
    }));
    setError("");
    setSuccess("");
  };

  const handleTransform = async () => {
    // Validate required parameters
    if (action === "resize") {
      if (!params.width || !params.height || isNaN(params.width) || isNaN(params.height)) {
        setError("Please enter valid width and height");
        return;
      }
    }

    if (action === "rotate") {
      if (!params.angle || isNaN(params.angle)) {
        setError("Please enter a valid angle");
        return;
      }
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await transformImage(imageId, action, params);
      setSuccess(`${action} transformation completed!`);
      setTimeout(() => {
        onSuccess();
      }, 1500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.transformForm}>
      <label style={styles.label}>Transformation:</label>
      <select
        value={action}
        onChange={(e) => {
          setAction(e.target.value);
          setParams({});
          setError("");
          setSuccess("");
        }}
        style={styles.select}
      >
        <option value="resize">Resize</option>
        <option value="rotate">Rotate</option>
        <option value="grayscale">Grayscale</option>
        <option value="sepia">Sepia</option>
      </select>

      {/* Conditional inputs based on action */}
      {action === "resize" && (
        <div style={styles.inputGroup}>
          <input
            type="number"
            placeholder="Width"
            value={params.width || ""}
            onChange={(e) => {
              const val = e.target.value ? parseInt(e.target.value) : undefined;
              handleParamChange("width", val);
            }}
            style={styles.input}
          />
          <input
            type="number"
            placeholder="Height"
            value={params.height || ""}
            onChange={(e) => {
              const val = e.target.value ? parseInt(e.target.value) : undefined;
              handleParamChange("height", val);
            }}
            style={styles.input}
          />
        </div>
      )}

      {action === "rotate" && (
        <div style={styles.inputGroup}>
          <input
            type="number"
            placeholder="Angle (degrees)"
            value={params.angle || ""}
            onChange={(e) => {
              const val = e.target.value ? parseInt(e.target.value) : undefined;
              handleParamChange("angle", val);
            }}
            style={styles.input}
          />
        </div>
      )}

      {/* Format conversion option */}
      <div style={styles.inputGroup}>
        <label style={styles.smallLabel}>Output Format:</label>
        <select
          value={params.output_format || "jpeg"}
          onChange={(e) => handleParamChange("output_format", e.target.value)}
          style={styles.select}
        >
          <option value="jpeg">JPEG</option>
          <option value="png">PNG</option>
          <option value="webp">WebP</option>
        </select>
      </div>

      <button
        onClick={handleTransform}
        disabled={loading}
        style={styles.transformButton}
      >
        {loading ? "Transforming..." : "Apply Transform"}
      </button>

      {error && <div style={styles.error}>{error}</div>}
      {success && <div style={styles.success}>{success}</div>}
    </div>
  );
}

const styles = {
  transformForm: {
    marginTop: "16px",
    padding: "16px",
    backgroundColor: "#f9fafb",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  } as React.CSSProperties,
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
    margin: "0 0 4px 0",
  } as React.CSSProperties,
  smallLabel: {
    fontSize: "12px",
    fontWeight: "500",
    color: "#6b7280",
    margin: "0 0 4px 0",
  } as React.CSSProperties,
  select: {
    padding: "10px",
    fontSize: "14px",
    border: "2px solid #e5e7eb",
    borderRadius: "6px",
    backgroundColor: "white",
    cursor: "pointer",
    transition: "border-color 0.2s",
  } as React.CSSProperties,
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  } as React.CSSProperties,
  input: {
    padding: "10px",
    fontSize: "14px",
    border: "2px solid #e5e7eb",
    borderRadius: "6px",
    transition: "border-color 0.2s",
  } as React.CSSProperties,
  transformButton: {
    padding: "12px 24px",
    fontSize: "14px",
    fontWeight: "600",
    color: "white",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
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
  success: {
    padding: "14px 18px",
    backgroundColor: "#d1fae5",
    color: "#059669",
    borderRadius: "6px",
    fontSize: "14px",
    border: "1px solid #a7f3d0",
    lineHeight: "1.5",
  } as React.CSSProperties,
};
