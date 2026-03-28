import { useState, useEffect, useRef } from "react";
import { useUserProgress } from "../../hooks/useUserProgress";

import TimerDisplay from "../components/TimeDisplay";
import TimeInputs from "../components/TimeInput";
import Controls from "../components/Controls";
import Stats from "../components/Stats";
import Notification from "../components/Notification";
import RecentSessions from "../components/RecentSessions";
import ModeSelector from "../components/ModeSelector";

export default function FocusPage({ user: initialUser, setUser: setAppUser }) {
  const { user, updateProgress } = useUserProgress(initialUser);

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState(1500);
  const [mode, setMode] = useState("focus");
  const [selectedTime, setSelectedTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [notification, setNotification] = useState("");
  const todayFocusSessions = user?.todayFocusSessions ?? 0;


  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem("sessions");
    return saved ? JSON.parse(saved) : [];
  });

  const hasCompleted = useRef(false);

  const xp = user?.xp ?? 0;
  const streak = user?.streak ?? 0;
  const level = user?.level ?? 1;
  const xpIntoCurrentLevel = user?.xpIntoCurrentLevel ?? 0;
  const currentLevelXpRequired = user?.currentLevelXpRequired ?? 0;
  const levelProgressPercent = user?.levelProgressPercent ?? 0;
  const totalMinutes = user?.totalMinutes ?? 0;

  const focusSessionsToday = Math.min(7, todayFocusSessions);


  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

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

  const handleSessionComplete = async () => {
    const minutesSpent = Math.floor(selectedTime / 60);
    let earnedXP = 0;

    if (mode === "focus") {
      const baseXP = Math.pow(minutesSpent, 1.2);
      const focusBonus = minutesSpent >= 20 ? 1.25 : 1;
      const penalty = minutesSpent < 5 ? 0.5 : 1;

      earnedXP = Math.max(
        1,
        Math.floor(baseXP * focusBonus * penalty)
      );

      if (minutesSpent === selectedTime / 60) {
        earnedXP += 10;
      }

      if (earnedXP > 0) {
        const updatedUser = await updateProgress(earnedXP, minutesSpent);

        if (updatedUser) {
          setAppUser(updatedUser);
          setNotification(`🔥 +${earnedXP} XP`);
        } else {
          setNotification("⚠️ Progress update failed");
        }
      } else {
        setNotification("⚠️ Session too short");
      }
    }

    const newSession = {
      type: mode,
      duration: minutesSpent,
      xp: earnedXP,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    };

    setSessions((prev) => [newSession, ...prev]);
    setTimeout(() => setNotification(""), 2000);
  };

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          if (hasCompleted.current) return 0;

          hasCompleted.current = true;

          clearInterval(interval);
          setIsRunning(false);

          void handleSessionComplete();

          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, selectedTime, streak, mode]);

  const handleMinutesChange = (e) => {
    if (isRunning) return;

    const value = Math.min(59, Math.max(0, parseInt(e.target.value, 10) || 0));
    setMinutes(value);

    const total = value * 60 + seconds;
    setTime(total);
    setSelectedTime(total);
  };

  const handleSecondsChange = (e) => {
    if (isRunning) return;

    const value = Math.min(59, Math.max(0, parseInt(e.target.value, 10) || 0));
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
    <div
      style={{
        minHeight: "100vh",
        padding: "40px",
        background:
          "radial-gradient(circle at top left, rgba(255,255,255,0.96), rgba(239,231,255,0.95) 48%, rgba(255,239,244,0.92) 100%)",
      }}
    >
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto 30px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "16px",
            padding: 0,
          }}
        >
          <img
            src="/logo.png"
            alt="Focusly logo"
            style={{
              width: "74px",
              height: "74px",
              objectFit: "contain",
              filter: "drop-shadow(0 10px 18px rgba(128, 89, 255, 0.18))",
            }}
          />
          <div style={{ textAlign: "left" }}>
            <h1
              style={{
                margin: 0,
                fontSize: "3rem",
                lineHeight: 1.02,
                letterSpacing: "-0.04em",
                color: "#7f35e8",
                fontWeight: 800,
              }}
            >
              Focusly
            </h1>
          </div>
        </div>

        <p
          style={{
            margin: "0px auto 0",
            maxWidth: "760px",
            fontSize: "0.98rem",
            lineHeight: 1.55,
            color: "#7c778b",
          }}
        >
          Transform your productivity into an epic journey. Level up with every focus session.
        </p>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <Stats
          xp={xp}
          level={level}
          streak={streak}
          totalMinutes={totalMinutes}
          sessionsCount={focusSessionsToday}
          xpIntoCurrentLevel={xpIntoCurrentLevel}
          currentLevelXpRequired={currentLevelXpRequired}
          levelProgressPercent={levelProgressPercent}
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
            width: "min(520px, 100%)",
            padding: "36px 42px 34px",
            borderRadius: "32px",
            background:
              "linear-gradient(135deg, rgba(251,249,255,0.92) 0%, rgba(244,238,255,0.95) 52%, rgba(255,243,246,0.92) 100%)",
            boxShadow:
              "0 26px 60px rgba(115, 87, 178, 0.18), inset 0 1px 0 rgba(255,255,255,0.75)",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-120px auto auto -80px",
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(181,160,255,0.25), rgba(181,160,255,0))",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: "auto -90px -140px auto",
              width: "300px",
              height: "300px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,190,210,0.22), rgba(255,190,210,0))",
              pointerEvents: "none",
            }}
          />

          <ModeSelector mode={mode} onChange={handleModeChange} />

          <Notification message={notification} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <TimerDisplay time={time} mode={mode} totalTime={selectedTime} />
          </div>

          <Controls
            isRunning={isRunning}
            onToggle={handleToggle}
            onReset={handleReset}
          />

          <div
            style={{
              marginTop: "26px",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.46)",
              border: "1px solid rgba(120, 94, 177, 0.1)",
            }}
          >
            <TimeInputs
              minutes={minutes}
              seconds={seconds}
              isRunning={isRunning}
              onMinutesChange={handleMinutesChange}
              onSecondsChange={handleSecondsChange}
            />
          </div>

          <div style={{ marginTop: "28px", color: "#766b8b", fontSize: "0.98rem" }}>
            Focus Sessions Today
          </div>
          <div
            style={{
              marginTop: "14px",
              display: "flex",
              justifyContent: "center",
              gap: "8px",
            }}
          >
            {Array.from({ length: 7 }).map((_, index) => (
              <span
                key={index}
                style={{
                  width: "12px",
                  height: "36px",
                  borderRadius: "999px",
                  background:
                    index < focusSessionsToday
                      ? "linear-gradient(180deg, #9679fd 0%, #aa38ff 100%)"
                      : "rgba(136, 128, 158, 0.16)",
                  boxShadow:
                    index < focusSessionsToday
                      ? "0 10px 18px rgba(123, 85, 255, 0.22)"
                      : "none",
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ width: "320px" }}>
          <RecentSessions sessions={sessions} />
        </div>
      </div>
    </div>
  );
}
