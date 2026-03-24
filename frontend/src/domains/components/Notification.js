export default function Notification({ message }) {
  if (!message) return null;

  return (
    <div
      style={{
        width: "fit-content",
        margin: "0 auto 12px",
        padding: "10px 16px",
        background: "rgba(255,255,255,0.62)",
        color: "#5642e8",
        borderRadius: "999px",
        border: "1px solid rgba(120, 94, 177, 0.12)",
        boxShadow: "0 10px 18px rgba(120, 94, 177, 0.08)",
        fontWeight: 700,
      }}
    >
      {message}
    </div>
  );
}
