export default function TimeInputs({
  minutes,
  seconds,
  isRunning,
  onMinutesChange,
  onSecondsChange
}) {
  const inputStyle = {
    width: "48px",
    border: "none",
    outline: "none",
    background: "transparent",
    textAlign: "center",
    fontSize: "1rem",
    fontWeight: 700,
    color: isRunning ? "rgba(42, 34, 56, 0.45)" : "#2a2238",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "6px",
        marginBottom: 0,
      }}
    >
      <input
        type="number"
        value={minutes}
        onChange={onMinutesChange}
        disabled={isRunning}
        style={inputStyle}
      />

      <span style={{ color: "#7f7398", fontWeight: 700 }}>:</span>

      <input
        type="number"
        value={seconds}
        onChange={onSecondsChange}
        disabled={isRunning}
        style={inputStyle}
      />
    </div>
  );
}
