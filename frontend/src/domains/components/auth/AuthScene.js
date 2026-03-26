import AuthBrand from "./AuthBrand";
import AuthCard from "./AuthCard";
import AuthFeatureStrip from "./AuthFeatureStrip";

export default function AuthScene(props) {
  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "40px 16px",
        background:
          "radial-gradient(circle at top, rgba(255,255,255,0.99), rgba(248,247,251,0.98) 50%, rgba(245,243,249,0.97) 100%)",
      }}
    >
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "-140px",
            top: "-80px",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(175,166,255,0.24) 0%, rgba(175,166,255,0.08) 42%, transparent 72%)",
            filter: "blur(62px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-120px",
            top: "10px",
            width: "360px",
            height: "360px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(193,201,255,0.22) 0%, rgba(193,201,255,0.08) 44%, transparent 74%)",
            filter: "blur(58px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-150px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "420px",
            height: "420px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,196,220,0.28) 0%, rgba(255,196,220,0.1) 42%, transparent 74%)",
            filter: "blur(62px)",
          }}
        />
      </div>

      <section
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1480px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AuthBrand />
        <AuthCard {...props} />
        <AuthFeatureStrip />
      </section>
    </main>
  );
}
