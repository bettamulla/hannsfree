export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#0b0b0f",
      color: "white",
      fontFamily: "Inter, system-ui, sans-serif"
    }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        HannsFree
      </h1>

      <p style={{ opacity: 0.7, marginBottom: "2rem" }}>
        Autonomous Brand Engine
      </p>

      <button style={{
        padding: "12px 24px",
        borderRadius: "8px",
        border: "none",
        background: "white",
        color: "black",
        fontWeight: "600",
        cursor: "pointer"
      }}>
        Generate Brand
      </button>
    </main>
  );
}
