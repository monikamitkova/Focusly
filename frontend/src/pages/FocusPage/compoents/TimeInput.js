export default function TimeInputs({
  minutes,
  seconds,
  isRunning,
  onMinutesChange,
  onSecondsChange
}) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <input
        type="number"
        value={minutes}
        onChange={onMinutesChange}
        disabled={isRunning}
        style={{ width: "60px", textAlign: "center" }}
      />

      :

      <input
        type="number"
        value={seconds}
        onChange={onSecondsChange}
        disabled={isRunning}
        style={{ width: "60px", textAlign: "center" }}
      />
    </div>
  );
}