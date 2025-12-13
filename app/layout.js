export const metadata = {
  title: "HannsFree",
  description: "Autonomous Brand Engine",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        background: "#0b0b0f",
        color: "white",
        fontFamily: "Inter, system-ui, sans-serif"
      }}>
        {children}
      </body>
    </html>
  );
}
