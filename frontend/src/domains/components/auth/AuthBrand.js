export default function AuthBrand() {
  return (
    <header
      style={{
        marginBottom: "28px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <img
        src="/logo.png"
        alt="Focusly logo"
        style={{
          width: "88px",
          height: "88px",
          objectFit: "contain",
          filter: "drop-shadow(0 14px 28px rgba(110, 86, 220, 0.18))",
        }}
      />

      <h1
        style={{
          margin: "12px 0 0",
          fontSize: "clamp(42px, 6vw, 48px)",
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-0.05em",
          background: "linear-gradient(90deg, #643af2 0%, #7d31eb 58%, #c445c3 100%)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Focusly
      </h1>

      <p
        style={{
          margin: "12px 0 0",
          fontSize: "15px",
          fontWeight: 600,
          color: "#7b7f92",
        }}
      >
        Transform your productivity into an epic journey
      </p>
    </header>
  );
}
