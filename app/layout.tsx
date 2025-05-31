import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Card Game",
  description: "Card Game",
  generator: "Computer Science Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
