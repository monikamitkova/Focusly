import { FiZap } from "react-icons/fi";
import { GiFire, GiTrophyCup } from "react-icons/gi";

const FEATURES = [
  {
    icon: <GiTrophyCup size={18} />,
    label: "Level Up",
    tileStyle: {
      background: "linear-gradient(180deg, #ffbc08 0%, #ff9f0a 100%)",
    },
  },
  {
    icon: <GiFire size={18} />,
    label: "Build Streaks",
    tileStyle: {
      background: "linear-gradient(180deg, #f08b38 0%, #f35a4b 100%)",
    },
  },
  {
    icon: <FiZap size={18} />,
    label: "Stay Focused",
    tileStyle: {
      background: "linear-gradient(180deg, #678dff 0%, #5f63f5 100%)",
    },
  },
];

export default function AuthFeatureStrip() {
  return (
    <div
      style={{
        marginTop: "28px",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: "40px",
      }}
    >
      {FEATURES.map((feature) => (
        <div
          key={feature.label}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "13px",
              color: "#fff",
              boxShadow: "0 10px 18px rgba(0,0,0,0.12)",
              ...feature.tileStyle,
            }}
          >
            {feature.icon}
          </div>
          <span
            style={{
              marginTop: "8px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#777b8f",
            }}
          >
            {feature.label}
          </span>
        </div>
      ))}
    </div>
  );
}
