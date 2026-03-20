import { FiCoffee } from "react-icons/fi";
import { LuBrain } from "react-icons/lu";
import { IoMdBed } from "react-icons/io";

export default function ModeSelector({ mode, onChange }) {
  const getStyle = (active, gradient, shadowColor) => ({
    padding: "10px 20px",
    borderRadius: "12px",
    cursor: "pointer",

    display: "flex",
    alignItems: "center",
    gap: "6px",

    background: active ? gradient : "#f5f3fc",
    color: active ? "white" : "#333",

    border: active
      ? "2px solid  rgba(115, 126, 124, 0.2)"
      : "2px solid #dedde2",

    boxShadow: active ? `0 5px 15px ${shadowColor}` : "none",

    transition: "0.2s",
    fontWeight: "500",
  });

  return (
    <div
      style={{
        display: "flex",
        gap: "12px",
        justifyContent: "center",
        marginBottom: "20px",
      }}
    >
      <button
        onClick={() => onChange("focus")}
        style={getStyle(
          mode === "focus",
          "linear-gradient(90deg, #6366f1, #a855f7)",
          "rgba(99,102,241,0.4)"
        )}
      >
        <LuBrain size={18} /> Focus
      </button>
      <button
        onClick={() => onChange("short")}
        style={getStyle(
          mode === "short",
          "linear-gradient(90deg, #4ade80, #22c55e)",
          "rgba(34,197,94,0.4)"
        )}
      >
        <FiCoffee size={18} /> Short Break
      </button>
      <button
        onClick={() => onChange("long")}
        style={getStyle(
          mode === "long",
          "linear-gradient(90deg, #60a5fa, #2563eb)",
          "rgba(59,130,246,0.4)"
        )}
      >
        <IoMdBed size={18} /> Long Break
      </button>
    </div>
  );
}