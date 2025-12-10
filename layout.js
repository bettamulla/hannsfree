export const metadata = {
  title: "HanssFree",
  description: "Autonomous brand growth engine"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="mx-auto max-w-3xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
