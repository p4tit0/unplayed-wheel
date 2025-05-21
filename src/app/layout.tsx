import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Unplayed Game Roulette",
  description: "Randomly select a game from your Steam library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
