import "./globals.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { GeistPixelSquare } from "geist/font/pixel";

export const metadata: Metadata = {
  title: "Sandeep Kanaram Parmar — Data Analyst",
  description:
    "Sandeep Parmar, Data Analyst. Python, SQL, cloud analytics, dashboards, and production data pipelines.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
