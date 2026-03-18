import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grace Isitua | I build modern websites",
  description: "I help startups, SMEs, and creators transform their ideas into powerful online experiences. Building digital brands that compete globally.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} antialiased bg-black text-white selection:bg-purple-500/30 selection:text-purple-200`}>
        {children}
      </body>
    </html>
  );
}
