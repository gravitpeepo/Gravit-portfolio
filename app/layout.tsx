import type { Metadata } from "next";
import { Bodoni_Moda, Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const display = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const mono = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gravit-portfolio.vercel.app"),
  title: "GRAVIT — After Effects Editor & Visual Storyteller",
  description:
    "9 years of After Effects mastery. Turning raw footage into cinematic retention engines that keep audiences locked in.",
  openGraph: {
    title: "GRAVIT — After Effects Editor & Visual Storyteller",
    description:
      "Turning raw footage into cinematic retention engines that keep audiences locked in.",
    url: "https://gravit-portfolio.vercel.app",
    siteName: "GRAVIT",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-void text-bone font-body antialiased selection:bg-crimson-bright/30 selection:text-bone">
        {children}
      </body>
    </html>
  );
}
