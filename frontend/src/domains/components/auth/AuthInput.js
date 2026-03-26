import { FiUser } from "react-icons/fi";

export default function AuthInput({ value, onChange }) {
  return (
    <label
      style={{
        display: "block",
        fontSize: "14px",
        fontWeight: 700,
        color: "#1b1b22",
      }}
    >
      Username
      <span
        style={{
          marginTop: "12px",
          height: "46px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          borderRadius: "14px",
          background: "#f1f1f4",
          padding: "0 16px",
          color: "#8a8ea3",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.75)",
        }}
      >
        <FiUser size={16} />
        <input
          type="text"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Enter your username"
          style={{
            width: "100%",
            border: 0,
            background: "transparent",
            padding: 0,
            fontSize: "13px",
            color: "#3b3d4d",
            outline: "none",
          }}
        />
      </span>
    </label>
  );
}
