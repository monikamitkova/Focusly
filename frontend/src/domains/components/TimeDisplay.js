import { useEffect, useRef } from "react";

const MODE_LABELS = {
  focus: "FOCUS TIME",
  short: "SHORT BREAK",
  long: "LONG BREAK",
};

const MODE_THEMES = {
  focus: {
    inner:
      "radial-gradient(circle at 30% 30%, #ffffff, #d6bdff 42%, #be99ff 100%)",
    labelBg: "rgba(255,255,255,0.72)",
    labelColor: "#8477e9",
    emoji: "🧠",
    shadow: "0 36px 80px rgba(157,117,255,0.28)",
  },
  short: {
    inner:
      "radial-gradient(circle at 30% 30%, #ffffff, #b7f8db 42%, #50e3c2 100%)",
    labelBg: "rgba(255,255,255,0.75)",
    labelColor: "#349983",
    emoji: "☕",
    shadow: "0 36px 80px rgba(80,227,194,0.28)",
  },
  long: {
    inner:
      "radial-gradient(circle at 30% 30%, #ffffff, #c8dbff 42%, #93b1e6 100%)",
    labelBg: "rgba(255,255,255,0.75)",
    labelColor: "#4b75cf",
    emoji: "🌴",
    shadow: "0 36px 80px rgba(15, 61, 131, 0.28)",
  },
};

export default function TimerDisplay({
  time,
  mode = "focus",
  totalTime = time,
}) {
  const timeTextRef = useRef(null);
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const safeTotal = Math.max(totalTime, 1);
  const progress = Math.max(0, Math.min(1, time / safeTotal));
  const ringDegrees = progress * 360;
  const theme = MODE_THEMES[mode] || MODE_THEMES.focus;

  useEffect(() => {
    if (!timeTextRef.current || totalTime <= 0 || time <= 0) return;

    timeTextRef.current.animate(
      [
        { transform: "scale(1)", opacity: 1 },
        { transform: "scale(1.07)", opacity: 0.92 },
        { transform: "scale(0.985)", opacity: 1 },
        { transform: "scale(1)", opacity: 1 },
      ],
      {
        duration: 360,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      }
    );
  }, [time, totalTime]);

  return (
    <div
      style={{
        width: "280px",
        height: "280px",
        margin: "18px auto 28px",
        borderRadius: "50%",
        position: "relative",
        display: "grid",
        placeItems: "center",
        transition: "all 0.4s ease",
        background: `conic-gradient(
          from 210deg,
          ${theme.labelColor} 0deg ${ringDegrees}deg,
          rgba(255,255,255,0.14) ${ringDegrees}deg 360deg
        )`,
        boxShadow: `${theme.shadow}, inset 0 0 0 14px rgba(255,255,255,0.1)`,
      }}
    >
      <div
        style={{
          width: "242px",
          height: "242px",
          borderRadius: "50%",
          background: theme.inner,
          transition: "all 0.4s ease",
          boxShadow:
            "inset 0 18px 32px rgba(255,255,255,0.35), inset 0 -18px 34px rgba(149, 105, 255, 0.16), 0 14px 36px rgba(0,0,0,0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
        }}
      >
        <div
          ref={timeTextRef}
          style={{
            fontSize: "4rem",
            lineHeight: 1,
            fontWeight: 700,
            letterSpacing: "-0.08em",
            color: "#2b2538",
            fontVariantNumeric: "tabular-nums",
            transformOrigin: "center",
            willChange: "transform, opacity",
          }}
        >
          {minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "9px 16px",
            borderRadius: "999px",
            background: theme.labelBg,
            color: theme.labelColor,
            fontSize: "0.84rem",
            fontWeight: 700,
            letterSpacing: "0.14em",
            backdropFilter: "blur(8px)",
            transition: "all 0.4s ease",
          }}
        >
          <span style={{ fontSize: "0.85rem", lineHeight: 1 }}>{theme.emoji}</span>
          {MODE_LABELS[mode] ?? "FOCUS TIME"}
        </div>
      </div>
    </div>
  );
}
