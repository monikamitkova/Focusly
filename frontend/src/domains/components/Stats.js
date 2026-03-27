import { useState } from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import { CiTrophy } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { FiTarget } from "react-icons/fi";

export default function Stats({
  xp,
  level,
  streak,
  totalFocusedTime,
  sessionsCount,
  xpIntoCurrentLevel,
  currentLevelXpRequired,
  levelProgressPercent
}) {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        justifyContent: "space-between",
          gap: "20px",
          padding: "25px",
        borderRadius: "20px",
        background:
          "linear-gradient(135deg, rgba(251,249,255,0.92) 0%, rgba(244,238,255,0.95) 52%, rgba(255,243,246,0.92) 100%)",
        boxShadow: "0 10px 30px rgba(101, 78, 122, 0.25)",
      }}
    >
      <StatCard
        icon={<CiTrophy />}
        color="linear-gradient(135deg, #ecbc41, #e18940)"
        glowColor="rgba(236, 188, 65, 0.8)"
        valueColor="#f2a62b"
        value={level}
        label="Level"
        sub={`${xp} XP`}
        progress={levelProgressPercent}
        progressLabel={`${xpIntoCurrentLevel}/${currentLevelXpRequired} XP`}
      />

      <StatCard
        icon={<FaFireFlameCurved />}
        color="linear-gradient(135deg, #ef4444, #f97316)"
        glowColor="rgba(239, 68, 68, 0.8)"
        valueColor="#ea5b2c"
        value={streak}
        label="Day Streak"
        sub="Keep going!"
      />

      <StatCard
        icon={<FiTarget />}
        color="linear-gradient(135deg, #22c55e, #4ade80)"
        glowColor="rgba(34, 197, 94, 0.8)"
        valueColor="#3daf62"
        value={sessionsCount}
        label="Today's Focus"
        sub="Start now"
      />

      <StatCard
        icon={<IoMdTime />}
        color="linear-gradient(135deg, #3b82f6, #6366f1)"
        glowColor="rgba(59, 130, 246, 0.8)"
        valueColor="#4658f0"
        value={`${totalFocusedTime}h`}
        label="Total Hours"
        sub="Sessions tracked"
      />
    </div>
  );
}

function StatCard({ icon, color, value, label, sub, glowColor, valueColor, progress, progressLabel }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        flex: 1,
        textAlign: "center",
        fontSize: "14px",
        transition: "transform 0.3s ease",
        transform: isHovered ? "translateY(-10px)" : "translateY(0)",
        cursor: "pointer",
      }}
    >
      <div
        style={{
            width: "60px",
            height: "60px",
          margin: "0 auto 10px",
          borderRadius: "16px",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          fontSize: "22px",
          transition: "all 0.3s ease",
          boxShadow: isHovered
            ? `0 10px 40px ${glowColor}, 0 0 20px ${glowColor}`
            : `0 0 25px ${glowColor}`,
        }}
      >
        {icon}
      </div>

      <h2 style={{ margin: 0, fontSize: "1.2rem", color: valueColor }}>{value}</h2>
      <p style={{ margin: "2px 0", color: "#666", fontWeight: "500" }}>{label}</p>

      {typeof progress === "number" && (
        <div style={{ margin: "10px 0 8px" }}>
          <div
            style={{
              width: "100%",
              height: "8px",
              borderRadius: "999px",
              background: "rgba(0, 0, 0, 0.08)",
              overflow: "hidden"
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                borderRadius: "999px",
                background: color,
                transition: "width 0.3s ease"
              }}
            />
          </div>
          <div style={{ marginTop: "6px", fontSize: "11px", color: "#666" }}>
            {progressLabel}
          </div>
        </div>
      )}

      <div
        style={{
          display: "inline-block",
          padding: "3px 8px",
          borderRadius: "10px",
          background: "#eee",
          fontSize: "11px",
          color: "#444"
        }}
      >
        {sub}
      </div>
    </div>
  );
}
