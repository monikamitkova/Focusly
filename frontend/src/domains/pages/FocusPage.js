import { useState, useEffect } from "react";

import TimerDisplay from "../compoents/TimeDisplay"; 
import TimeInputs from "../compoents/TimeInput";
import Controls from "../compoents/Controls";
import Stats from "../compoents/Stats";
import Notification from "../compoents/Notification";

export default function FocusPage() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(1500);
  const [selectedTime, setSelectedTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);

 const [xp, setXp] = useState(() => {
  const saved = localStorage.getItem("xp");
  return saved !== null ? Number(saved) : 0;
});

const [streak, setStreak] = useState(() => {
  const saved = localStorage.getItem("streak");
  return saved !== null ? Number(saved) : 0;
});
  const [notification, setNotification] = useState("");

  const level = Math.floor(xp / 100);


  useEffect(() => {
    localStorage.setItem("xp", xp);
    localStorage.setItem("streak", streak);
  }, [xp, streak]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRunning(false); 

          const minutesSpent = Math.floor(selectedTime / 60);

          let earnedXP = 0;

          if (minutesSpent >= 1) {
            earnedXP = minutesSpent * 2 + 10;
          }
          if (minutesSpent >= 1) {
            earnedXP += 20;
          }

          let multiplier = 1;

          if (streak >= 5) {
            multiplier = 1.5;
          } else if (streak >= 3) {
            multiplier = 1.2;
          }

          earnedXP = Math.floor(earnedXP * multiplier);

          if (earnedXP > 0) {
            setXp((prev) => prev + earnedXP);
            setStreak((prev) => prev + 1);

            setNotification(`🔥 +${earnedXP} XP (x${multiplier})`);
          } else {
            setNotification("⚠️ Session too short");
          }

          setTimeout(() => setNotification(""), 2000);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, selectedTime]); 

  const handleMinutesChange = (e) => {
    if (isRunning) return;

    const value = Math.min(59, Math.max(0, parseInt(e.target.value) || 0));
    setMinutes(value);

    const total = value * 60 + seconds;
    setTime(total);
    setSelectedTime(total);
  };

  const handleSecondsChange = (e) => {
    if (isRunning) return;

    const value = Math.min(59, Math.max(0, parseInt(e.target.value) || 0));
    setSeconds(value);

    const total = minutes * 60 + value;
    setTime(total);
    setSelectedTime(total);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(selectedTime);
    setStreak(0);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Focusly 🚀</h1>

      <Stats xp={xp} level={level} streak={streak} />

      <Notification message={notification} />

      <TimeInputs
        minutes={minutes}
        seconds={seconds}
        isRunning={isRunning}
        onMinutesChange={handleMinutesChange}
        onSecondsChange={handleSecondsChange}
      />

      <TimerDisplay time={time} />

      <Controls
        isRunning={isRunning}
        onToggle={() => setIsRunning(!isRunning)}
        onReset={handleReset}
      />
    </div>
  );
}