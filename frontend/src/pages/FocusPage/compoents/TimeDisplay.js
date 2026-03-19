export default function TimerDisplay({ time }) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <h2 style={{ fontSize: "48px" }}>
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </h2>
  );
}