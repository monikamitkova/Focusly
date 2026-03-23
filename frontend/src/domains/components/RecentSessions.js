import { useState } from "react";
import { FiCoffee } from "react-icons/fi";
import { LuBrain } from "react-icons/lu";
import { IoMdBed } from "react-icons/io";
import { CiClock1 } from "react-icons/ci";

export default function RecentSessions({ sessions }) {
  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "20px",
        background: "linear-gradient(90deg, #6365f117, #ec489a13)",
        boxShadow: "0 10px 30px rgba(101, 78, 122, 0.49)",
        maxWidth: "400px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "15px",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "12px",
            background: "linear-gradient(135deg, #6366f1, #a855f7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            boxShadow: "0 5px 15px rgba(99,102,241,0.4)",
          }}
        >
          <CiClock1 size={20} />
        </div>

        <h2
          style={{
            margin: 0,
            fontWeight: "600",
            color: "#6d28d9",
          }}
        >
          Recent Sessions
        </h2>
      </div>

      {sessions.length === 0 && <p>No sessions yet</p>}

      {sessions.slice(0, 5).map((s, i) => (
        <SessionItem key={i} session={s} />
      ))}
    </div>
  );
}

function SessionItem({ session: s }) {
  const [isHovered, setIsHovered] = useState(false);

  const colors = {
    focus: {
      bg: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(99,102,241,0.2))",
      glow: "rgba(168,85,247,0.4)",
      iconBg: "linear-gradient(135deg, #a855f7, #6366f1)",
    },
    long: {
      bg: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(37,99,235,0.2))",
      glow: "rgba(59,130,246,0.4)",
      iconBg: "linear-gradient(135deg, #60a5fa, #2563eb)",
    },
    short: {
      bg: "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(74,222,128,0.2))",
      glow: "rgba(34,197,94,0.4)",
      iconBg: "linear-gradient(135deg, #4ade80, #24af57)",
    }
  };

  const currentColors = colors[s.type] || colors.short;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        marginTop: "15px",
        padding: "15px",
        borderRadius: "16px",
        background: currentColors.bg,
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.3)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "all 0.3s ease",
        transform: isHovered ? "translateY(-5px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: isHovered
          ? `0 15px 30px ${currentColors.glow}, 0 0 20px ${currentColors.glow}`
          : `0 8px 20px ${currentColors.glow.replace("0.4", "0.2")}`,
        cursor: "pointer"
      }}
    >
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontWeight: "bold",
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "30%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: currentColors.iconBg,
              color: "white",
            }}
          >
            {s.type === "focus" ? (
              <LuBrain size={16} />
            ) : s.type === "long" ? (
              <IoMdBed size={16} />
            ) : (
              <FiCoffee size={16} />
            )}
          </div>

          {s.type === "focus"
            ? "Focus Session"
            : s.type === "long"
            ? "Long Break"
            : "Break"}
        </div>

        <div style={{ fontSize: "12px", color: "gray" }}>
          ⏱ {s.duration} minutes
        </div>
      </div>

      <div style={{ textAlign: "right" }}>
        <div style={{ fontSize: "12px", color: "gray" }}>
          {s.time}
        </div>

        {s.xp > 0 && (
          <div
            style={{
              marginTop: "5px",
              padding: "5px 10px",
              borderRadius: "10px",
              background: "linear-gradient(90deg, #6366f1, #a855f7)",
              color: "white",
              fontSize: "12px",
            }}
          >
            +{s.xp} XP
          </div>
        )}
      </div>
    </div>
  );
}
