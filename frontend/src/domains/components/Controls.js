export default function Controls({ isRunning, onToggle, onReset }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={onToggle}>
        {isRunning ? "Pause" : "Start"}
      </button>

      <button onClick={onReset} style={{ marginLeft: "10px" }}>
        Reset
      </button>
    </div>
  );
}