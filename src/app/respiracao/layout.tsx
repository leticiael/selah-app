"use client";
import FloatingAudioPlayer from "@/components/FloatingAudioPlayer";
import { ZenModeContext } from "@/components/ZenModeProvider";
import { useContext } from "react";

export default function RespiracaoLayout({ children }: { children: React.ReactNode }) {
  const { isZenMode } = useContext(ZenModeContext);

  return (
    <>
      {children}
      {!isZenMode && <FloatingAudioPlayer />}
    </>
  );
}