import AuthInput from "./AuthInput";

export default function AuthForm({
  buttonStyle,
  buttonIcon,
  buttonLabel,
  isSubmitting,
  message,
  name,
  toggleLabel,
  togglePrompt,
  onNameChange,
  onSubmit,
  onToggleMode,
}) {
  return (
    <form onSubmit={onSubmit} style={{ marginTop: "32px" }}>
      <AuthInput value={name} onChange={onNameChange} />

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          marginTop: "24px",
          width: "100%",
          height: "44px",
          border: 0,
          borderRadius: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          color: "#fff",
          fontSize: "15px",
          fontWeight: 800,
          cursor: isSubmitting ? "not-allowed" : "pointer",
          opacity: isSubmitting ? 0.8 : 1,
          ...buttonStyle,
        }}
      >
        {buttonIcon}
        {isSubmitting ? "Please wait..." : buttonLabel}
      </button>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <p style={{ margin: 0, fontSize: "14px", color: "#84869a" }}>
          {togglePrompt}
        </p>
        <button
          type="button"
          onClick={onToggleMode}
          style={{
            marginTop: "6px",
            border: 0,
            background: "transparent",
            fontSize: "14px",
            fontWeight: 800,
            color: "#4e45f6",
            cursor: "pointer",
          }}
        >
          {toggleLabel}
        </button>
      </div>

      {message ? (
        <p
          style={{
            margin: "16px 0 0",
            textAlign: "center",
            fontSize: "13px",
            fontWeight: 600,
            color: "#666b82",
          }}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
