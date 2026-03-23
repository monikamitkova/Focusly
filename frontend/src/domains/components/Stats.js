import { useState } from "react";
import { FaFireFlameCurved } from "react-icons/fa6";
import { CiTrophy } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { FiTarget } from "react-icons/fi";

export default function Stats({ xp, level, streak, totalFocusedTime, sessionsCount }) {
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
        background: "linear-gradient(90deg, #6365f117, #ec489a13)",
        boxShadow: "0 10px 30px rgba(101, 78, 122, 0.25)",
      }}
    >
      <StatCard
        icon={<CiTrophy />}
        color="linear-gradient(135deg, #ecbc41, #e18940)"
        glowColor="rgba(236, 188, 65, 0.8)"
        value={level}
        label="Level"
        sub={`${xp} XP`}
      />

      <StatCard
        icon={<FaFireFlameCurved />}
        color="linear-gradient(135deg, #ef4444, #f97316)"
        glowColor="rgba(239, 68, 68, 0.8)"
        value={streak}
        label="Day Streak"
        sub="Keep going!"
      />

      <StatCard
        icon={<FiTarget />}
        color="linear-gradient(135deg, #22c55e, #4ade80)"
        glowColor="rgba(34, 197, 94, 0.8)"
        value={0}
        label="Today's Focus"
        sub="Start now"
      />

      <StatCard
        icon={<IoMdTime />}
        color="linear-gradient(135deg, #3b82f6, #6366f1)"
        glowColor="rgba(59, 130, 246, 0.8)"
        value={`${totalFocusedTime}h`}
        label="Total Hours"
        sub="Sessions tracked"
      />
    </div>
  );
}

function StatCard({ icon, color, value, label, sub, glowColor }) {
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

      <h2 style={{ margin: 0, fontSize: "1.2rem" }}>{value}</h2>
      <p style={{ margin: "2px 0", color: "#666", fontWeight: "500" }}>{label}</p>

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
