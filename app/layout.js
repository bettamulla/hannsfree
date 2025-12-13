import "./globals.css";

export const metadata = {
  title: "HannsFree",
  description: "Autonomous Brand Engine"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
