import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Titus",
  description: "A guided canon word-study course library.",
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
