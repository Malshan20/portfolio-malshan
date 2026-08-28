import type { Metadata } from "next";
import { Syne, DM_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ProgressBar from "@/components/ui/ProgressBar";
import NoiseOverlay from "@/components/ui/NoiseOverlay";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Malshan Dissanayaka — AI & SaaS Developer",
  description:
    "Full-Stack Developer specializing in AI-powered SaaS applications, mobile development, and cutting-edge web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body className="noise">
        <NoiseOverlay />
        <CustomCursor />
        <ProgressBar />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}