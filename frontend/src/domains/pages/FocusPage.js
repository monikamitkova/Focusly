import { useState, useEffect, useRef } from "react";

import TimerDisplay from "../components/TimeDisplay";
import TimeInputs from "../components/TimeInput";
import Controls from "../components/Controls";
import Stats from "../components/Stats";
import Notification from "../components/Notification";
import RecentSessions from "../components/RecentSessions";
import ModeSelector from "../components/ModeSelector";

export default function FocusPage() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(1500);
  const [mode, setMode] = useState("focus");
  const [selectedTime, setSelectedTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);


  const handleModeChange = (newMode) => {
    if (isRunning) return;

    let newTime = 1500;

    if (newMode === "focus") newTime = 1500;
    if (newMode === "short") newTime = 300;
    if (newMode === "long") newTime = 900;

    setMode(newMode);
    setTime(newTime);
    setSelectedTime(newTime);
    setMinutes(Math.floor(newTime / 60));
    setSeconds(newTime % 60);

    hasCompleted.current = false;
  };

  const [totalFocusedTime, setTotalFocusedTime] = useState(() => {
    const saved = localStorage.getItem("totalFocusedTime");
    return saved !== null ? Number(saved) : 0;
  });

  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem("xp");
    return saved !== null ? Number(saved) : 0;
  });

  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem("streak");
    return saved !== null ? Number(saved) : 0;
  });

  const [notification, setNotification] = useState("");


  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("sessions");
    return saved ? JSON.parse(saved) : [];
  });


  const hasCompleted = useRef(false);

  const level = Math.floor(0.1 * Math.sqrt(xp));

  useEffect(() => {
    localStorage.setItem("xp", xp);
    localStorage.setItem("streak", streak);
    localStorage.setItem("totalFocusedTime", totalFocusedTime);
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [xp, streak, totalFocusedTime, sessions]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          if (hasCompleted.current) return 0;

          hasCompleted.current = true;

          clearInterval(interval);
          setIsRunning(false);

          const minutesSpent = Math.floor(selectedTime / 60);

          if (mode === "focus") {
            setTotalFocusedTime((prev) => prev + minutesSpent);
          }

          let earnedXP = 0;

          if (mode === "focus") {
            const minutes = minutesSpent;

            let baseXP = Math.pow(minutes, 1.2);
            let streakBonus = 1 + Math.min(streak * 0.02, 0.5);
            let focusBonus = minutes >= 20 ? 1.25 : 1;
            let penalty = minutes < 5 ? 0.5 : 1;

            earnedXP = Math.max(1, Math.floor(baseXP * streakBonus * focusBonus * penalty));

            if (minutes === selectedTime / 60) {
              earnedXP += 10;
            }

            if (earnedXP > 0) {
              setXp((prev) => prev + earnedXP);
              setStreak((prev) => prev + 1);
              setNotification(`🔥 +${earnedXP} XP`);
            } else {
              setNotification("⚠️ Session too short");
            }
          }

          const newSession = {
            type: mode,
            duration: minutesSpent,
            xp: earnedXP,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          }

          setSessions((prev) => [newSession, ...prev]);

          setTimeout(() => setNotification(""), 2000);

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, selectedTime, streak, mode]);

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
    hasCompleted.current = false;
  };

  const handleToggle = () => {
    if (!isRunning) {
      hasCompleted.current = false;
    }
    setIsRunning(!isRunning);
  };

  return (
    <div style={{ padding: "40px" }}>

      <div style={{ marginBottom: "40px" }}>
        <Stats
          xp={xp}
          level={level}
          streak={streak}
          totalFocusedTime={totalFocusedTime}
        />
      </div>

      <div
        style={{
          display: "flex",
          gap: "30px",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >

        <div
          style={{
            width: "500px",
            padding: "30px",
            borderRadius: "20px",
            background: "#f5f3fc",
            boxShadow: "0 10px 30px rgba(101, 78, 122, 0.4)",
            textAlign: "center",
          }}
        >
          <h1>Focusly 🚀</h1>

          <ModeSelector mode={mode} onChange={handleModeChange} />

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
            onToggle={handleToggle}
            onReset={handleReset}
          />
        </div>

        <div style={{ width: "320px" }}>
          <RecentSessions sessions={sessions} />
        </div>
      </div>
    </div>
  );
}