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
        <div
          key={i}
           className="session-card"
          style={{
            marginTop: "15px",
            padding: "15px",
            borderRadius: "16px",
            background:
              s.type === "focus"
                ? "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(99,102,241,0.2))"
                : s.type === "long"
                ? "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(37,99,235,0.2))"
                : "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(74,222,128,0.2))",

            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.3)",

            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow:
              s.type === "focus"
                ? "0 8px 20px rgba(168,85,247,0.2)"
                : s.type === "long"
                ? "0 8px 20px rgba(59,130,246,0.2)"
                : "0 8px 20px rgba(34,197,94,0.2)",
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
                  background:
                    s.type === "focus"
                      ? "linear-gradient(135deg, #a855f7, #6366f1)"
                      : s.type === "long"
                      ? "linear-gradient(135deg, #60a5fa, #2563eb)"
                      : "linear-gradient(135deg, #4ade80, #24af57)",
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
      ))}
    </div>
  );
}