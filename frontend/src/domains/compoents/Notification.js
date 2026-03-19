export default function Notification({ message }) {
  if (!message) return null;

  return (
    <div
      style={{
        margin: "20px auto",
        padding: "12px 20px",
        backgroundColor: "#e6f7ff",
        borderRadius: "10px"
      }}
    >
      {message}
    </div>
  );
}