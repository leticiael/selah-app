import { useEffect, useState } from "react";

export type Protocol = {
  label: string;
  duration: number;
  inhale: number;
  hold?: number;
  exhale: number;
};

export function useBreathingProtocol(sel: Protocol | null) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [phaseTimeLeft, setPhaseTimeLeft] = useState(0);

  useEffect(() => {
    if (!sel) return;
    setTimeLeft(sel.duration);
    setPhase("inhale");
    setPhaseTimeLeft(sel.inhale);
  }, [sel]);

  useEffect(() => {
    if (!sel || timeLeft <= 0) return;
    const iv = setInterval(() => setTimeLeft(t => Math.max(t - 1, 0)), 1000);
    return () => clearInterval(iv);
  }, [sel, timeLeft]);

  useEffect(() => {
    if (!sel || timeLeft <= 0) return;

    if (phaseTimeLeft <= 0) {
      if (phase === "inhale" && sel.hold != null) {
        setPhase("hold");
        setPhaseTimeLeft(sel.hold);
      } else if (phase === "hold") {
        setPhase("exhale");
        setPhaseTimeLeft(sel.exhale);
      } else if (phase === "exhale") {
        setPhase("inhale");
        setPhaseTimeLeft(sel.inhale);
      } else if (phase === "inhale" && sel.hold == null) {
        setPhase("exhale");
        setPhaseTimeLeft(sel.exhale);
      }
      return;
    }

    const iv = setInterval(() => setPhaseTimeLeft(t => t - 1), 1000);
    return () => clearInterval(iv);
  }, [phaseTimeLeft, phase, sel, timeLeft]);

  return {
    timeLeft,
    phase,
    phaseTimeLeft,
  };
}