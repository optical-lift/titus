import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Titus",
  description: "Greek & Hebrew word study through whole-canon function pattern discovery.",
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
