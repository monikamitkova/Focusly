import { FiLogIn, FiUserPlus } from "react-icons/fi";

import AuthForm from "./AuthForm";

const CARD_THEME = {
  login: {
    accentIcon: <FiLogIn size={28} />,
    buttonIcon: <FiLogIn size={18} />,
    iconStyle: {
      background: "linear-gradient(180deg, #7554fe 0%, #7d30eb 100%)",
      boxShadow: "0 12px 22px rgba(121,78,255,0.32)",
    },
    buttonStyle: {
      background: "linear-gradient(90deg, #6468f3 0%, #912af0 100%)",
      boxShadow: "0 10px 22px rgba(125,73,255,0.3)",
    },
  },
  signup: {
    accentIcon: <FiUserPlus size={28} />,
    buttonIcon: <FiUserPlus size={18} />,
    iconStyle: {
      background: "linear-gradient(180deg, #51c967 0%, #41b05e 100%)",
      boxShadow: "0 12px 22px rgba(75,187,103,0.3)",
    },
    buttonStyle: {
      background: "linear-gradient(90deg, #4dc85f 0%, #339f69 100%)",
      boxShadow: "0 10px 22px rgba(64,185,101,0.3)",
    },
  },
};

export default function AuthCard({
  content,
  isSubmitting,
  message,
  name,
  onNameChange,
  onSubmit,
  onToggleMode,
}) {
  const theme = CARD_THEME[content.mode];

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "394px",
        borderRadius: "24px",
        border: "1px solid rgba(223,216,255,0.88)",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.78) 0%, rgba(252,244,251,0.92) 100%)",
        padding: "28px 28px 40px",
        boxShadow:
          "0 18px 40px rgba(128,106,184,0.18), 0 0 34px rgba(246,189,221,0.16)",
        backdropFilter: "blur(14px)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            ...theme.iconStyle,
          }}
        >
          {theme.accentIcon}
        </div>

        <h2
          style={{
            margin: "20px 0 0",
            fontSize: "28px",
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            color: "#12121a",
          }}
        >
          {content.title}
        </h2>

        <p
          style={{
            margin: "12px 0 0",
            fontSize: "14px",
            color: "#7f8297",
          }}
        >
          {content.subtitle}
        </p>
      </div>

      <AuthForm
        buttonStyle={theme.buttonStyle}
        buttonIcon={theme.buttonIcon}
        buttonLabel={content.buttonLabel}
        isSubmitting={isSubmitting}
        message={message}
        name={name}
        toggleLabel={content.toggleLabel}
        togglePrompt={content.togglePrompt}
        onNameChange={onNameChange}
        onSubmit={onSubmit}
        onToggleMode={onToggleMode}
      />
    </div>
  );
}
