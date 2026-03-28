import { FiLogOut } from "react-icons/fi";
import { LuUserRound } from "react-icons/lu";

export default function UserMenu({ name, onLogout }) {
  return (
    <button
      type="button"
      onClick={onLogout}
      style={{
        border: "none",
        background: "#ffffff",
        borderRadius: "16px",
        padding: "8px 12px",
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 10px 24px rgba(80, 55, 130, 0.10)",
        cursor: "pointer",
        flexShrink: 0
      }}
    >
      <span
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "8px",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #7c3aed, #9333ea)",
          color: "#ffffff"
        }}
      >
        <LuUserRound size={13} />
      </span>
      <span
        style={{
          fontSize: "0.85rem",
          fontWeight: 500,
          color: "#2b2237"
        }}
      >
        {name}
      </span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "right",
          gap: "5px",
          color: "#2b2237",
          fontSize: "0.85rem",
          fontWeight: 500
        }}
      >
        <FiLogOut size={13} />
        Logout
      </span>
    </button>
  );
}
