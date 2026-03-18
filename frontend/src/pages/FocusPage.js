import { useState, useEffect } from "react";

export default function FocusPage() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  const [time, setTime] = useState(1500);
  const [selectedTime, setSelectedTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);

  const [notification, setNotification] = useState("");

  // TIMER
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);

          // показва notification
          setNotification("🔥 Session completed! +50 XP");

          setTimeout(() => {
            setNotification("");
          }, 2500);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // MINUTES INPUT
  const handleMinutesChange = (e) => {
    if (isRunning) return;

    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 0) value = 0;
    if (value > 59) value = 59;

    setMinutes(value);

    const total = value * 60 + seconds;
    setTime(total);
    setSelectedTime(total);
  };

  // SECONDS INPUT
  const handleSecondsChange = (e) => {
    if (isRunning) return;

    let value = parseInt(e.target.value);
    if (isNaN(value) || value < 0) value = 0;
    if (value > 59) value = 59;

    setSeconds(value);

    const total = minutes * 60 + value;
    setTime(total);
    setSelectedTime(total);
  };

  // RESET
  const handleReset = () => {
    setIsRunning(false);
    setTime(selectedTime);
  };

  // DISPLAY TIME
  const displayMinutes = Math.floor(time / 60);
  const displaySeconds = time % 60;

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Focusly 🚀</h1>

      {/* 🔔 NOTIFICATION */}
      {notification && (
        <div
          style={{
            margin: "20px auto",
            padding: "12px 20px",
            backgroundColor: "#e6f7ff",
            color: "#0077cc",
            borderRadius: "10px",
            width: "fit-content",
            fontWeight: "500"
          }}
        >
          {notification}
        </div>
      )}

      {/* INPUTS */}
      <div style={{ marginBottom: "30px" }}>
        <input
          type="number"
          value={minutes}
          onChange={handleMinutesChange}
          disabled={isRunning}
          style={{
            width: "60px",
            fontSize: "20px",
            textAlign: "center",
            marginRight: "10px"
          }}
        />

        :

        <input
          type="number"
          value={seconds}
          onChange={handleSecondsChange}
          disabled={isRunning}
          style={{
            width: "60px",
            fontSize: "20px",
            textAlign: "center",
            marginLeft: "10px"
          }}
        />
      </div>

      {/* TIMER */}
      <h2 style={{ fontSize: "48px" }}>
        {displayMinutes.toString().padStart(2, "0")}:
        {displaySeconds.toString().padStart(2, "0")}
      </h2>

      {/* BUTTONS */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => setIsRunning(!isRunning)}>
          {isRunning ? "Pause" : "Start"}
        </button>

        <button onClick={handleReset} style={{ marginLeft: "10px" }}>
          Reset
        </button>
      </div>
    </div>
  );
}   