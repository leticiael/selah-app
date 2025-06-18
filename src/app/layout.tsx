import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { ZenModeProvider } from "@/components/ZenModeProvider";
import SmoothScroll from "@/components/smoothScroll";
import FloatingAudioPlayer from "@/components/FloatingAudioPlayer";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Selah",
  description: "Respire, você está seguro.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ZenModeProvider>
      <html lang="pt-BR">
        <body
          className={`${playfairDisplay.variable} ${inter.variable} antialiased font-sans`}
        >
          <SmoothScroll />
          {children}
        </body>
      </html>
    </ZenModeProvider>
  );
}