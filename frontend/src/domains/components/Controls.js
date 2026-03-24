import { FiPlay, FiPause, FiRotateCcw } from "react-icons/fi";

export default function Controls({ isRunning, onToggle, onReset }) {
  const baseButtonStyle = {
    border: "none",
    borderRadius: "16px",
    minWidth: "140px",
    padding: "16px 24px",
    fontSize: "1.05rem",
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    cursor: "pointer",
    transition: "transform 0.18s ease, box-shadow 0.18s ease",
  };

  return (
    <div
      style={{
        marginTop: "8px",
        display: "flex",
        justifyContent: "center",
        gap: "16px",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          ...baseButtonStyle,
          color: "#ffffff",
          background: "linear-gradient(135deg, #6860ff 0%, #9d35ff 100%)",
          boxShadow: "0 14px 28px rgba(126, 86, 255, 0.35)",
        }}
      >
        {isRunning ? <FiPause size={18} /> : <FiPlay size={18} />}
        {isRunning ? "Pause" : "Start"}
      </button>

      <button
        onClick={onReset}
        style={{
          ...baseButtonStyle,
          color: "#2a2238",
          background: "linear-gradient(180deg, #ffffff 0%, #f6f1ff 100%)",
          boxShadow: "0 12px 24px rgba(61, 38, 110, 0.12)",
          border: "1px solid rgba(90, 69, 133, 0.12)",
        }}
      >
        <FiRotateCcw size={18} />
        Reset
      </button>
    </div>
  );
}
