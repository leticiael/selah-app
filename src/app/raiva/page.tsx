"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function CloudIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={props.className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 19.5h10.5A4.75 4.75 0 0 0 22 14.75a4.75 4.75 0 0 0-4.75-4.75h-.982A6.001 6.001 0 0 0 3 13.5c0 3.314 2.686 6 6 6z"
      />
    </svg>
  );
}

type Protocol = {
  label: string;
  duration: number;
  inhale: number;
  hold?: number;
  exhale: number;
};

const PROTOCOLS: Protocol[] = [
  { label: "5 minutos",  duration: 5 * 60,  inhale: 4, exhale: 8 },
  { label: "15 minutos", duration: 15 * 60, inhale: 4, exhale: 8 },
  { label: "20 minutos", duration: 20 * 60, inhale: 4, exhale: 8 },
];

export default function RaivaPage() {
  const [sel, setSel] = useState<Protocol | null>(null);
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
    const iv = setInterval(() => {
      setTimeLeft(t => Math.max(t - 1, 0));
    }, 1000);
    return () => clearInterval(iv);
  }, [sel, timeLeft]);

  useEffect(() => {
    if (!sel || timeLeft <= 0) return;
    if (phaseTimeLeft <= 0) {
      if (phase === "inhale" && sel.hold != null) {
        setPhase("hold"); setPhaseTimeLeft(sel.hold);
      } else if (phase === "hold") {
        setPhase("exhale"); setPhaseTimeLeft(sel.exhale);
      } else if (phase === "exhale") {
        setPhase("inhale"); setPhaseTimeLeft(sel.inhale);
      } else if (phase === "inhale" && sel.hold == null) {
        setPhase("exhale"); setPhaseTimeLeft(sel.exhale);
      }
      return;
    }
    const iv = setInterval(() => {
      setPhaseTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(iv);
  }, [phaseTimeLeft, phase, sel, timeLeft]);

  const animationDuration = sel ? sel[phase] : 1;

  return (
    <main className="min-h-screen bg-[#FF91AF] flex flex-col items-center justify-center p-6 relative">
      {!sel ? (
        <>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CloudIcon className="w-7 h-7 text-black" />
              <h1 className="text-2xl font-bold text-black">
                Controle sua Raiva
              </h1>
              <CloudIcon className="w-7 h-7 text-black" />
            </div>
            <p className="mb-4 text-base text-black font-medium">
              Está tudo bem sentir raiva. Vamos respirar juntos para aliviar a tensão e acalmar seu corpo e mente.
            </p>
            <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4 mb-4">
              {PROTOCOLS.map(p => (
                <button
                  key={p.label}
                  onClick={() => setSel(p)}
                  className="px-4 py-2 bg-white/80 text-[#FF91AF] rounded-xl hover:bg-white transition font-semibold w-full md:w-auto"
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p className="mt-6 text-xs text-black/70 max-w-md mx-auto">
              O fundo rosa desta página (Baker-Miller Pink) foi estudado por psicólogos e pode ajudar a acalmar emoções intensas, como a raiva.{" "}
              <a href="https://www.researchgate.net/publication/236843504_The_Physiological_Effect_of_Color_on_the_Suppression_of_Human_Aggression_Research_on_Baker-Miller_Pink" target="_blank" rel="noopener noreferrer" className="underline">Veja o estudo original</a>.<br />
              A respiração lenta (inspire por 4 segundos, expire por 8 segundos) também é comprovada para reduzir emoções negativas e acalmar o corpo.{" "}
              <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6137615/" target="_blank" rel="noopener noreferrer" className="underline">Saiba mais sobre a técnica</a>.
            </p>
          </div>
          <div className="fixed bottom-0 left-0 w-full">
            <div className="w-full flex justify-center items-center p-4 bg-white/40 backdrop-blur-md">
              <a
                href="/"
                className="px-6 py-3 text-black rounded-xl border border-black/30 hover:bg-black/10 transition"
              >
                Voltar para início
              </a>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex flex-col items-center">
            <h1 className="text-3xl font-semibold text-black mt-8 md:mt-12 mb-2 text-center">
              {sel.label} de Respiração
            </h1>
            <div className="mb-15"></div>
            <p className="mb-8 text-black text-center">
              {phase === "inhale"
                ? "Inspire profundamente"
                : "Expire lentamente"}
            </p>
          </div>
          {/* Neon/fumaça animada atrás da bola */}
          <div className="relative flex items-center justify-center mb-6">
            <motion.div
              className="absolute"
              style={{
                width: "340px",
                height: "340px",
                borderRadius: "9999px",
                pointerEvents: "none",
                boxShadow:
                  "0 0 80px 20px #ff5fa2cc, 0 0 160px 60px #ffb3d9aa, 0 0 40px 10px #ff91af99",
                zIndex: 0,
              }}
              animate={{
                scale: phase === "inhale" ? 1.5 : 1.1,
                opacity: phase === "inhale" ? 0.7 : 0.4,
              }}
              transition={{ duration: animationDuration, ease: "linear" }}
            />
            <motion.div
              className="w-60 h-60 bg-white/60 rounded-full flex items-center justify-center text-2xl font-medium text-[#FF91AF] relative z-10"
              animate={{
                scale: phase === "inhale" ? 1.4 : 0.8,
              }}
              transition={{ duration: animationDuration, ease: "linear" }}
            >
              {phase === "inhale" ? "Inspire" : "Expire"}
            </motion.div>
          </div>
          <div className="text-xl text-black mb-6 text-center">
            {Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}
          </div>
          {/* Botão de seta para encerrar sessão, centralizado e abaixo da bola */}
          <div className="flex justify-center mt-8 mb-4">
            <button
              onClick={() => setSel(null)}
              aria-label="Encerrar sessão"
              className="flex items-center justify-center w-14 h-14 rounded-full bg-white/80 border border-black/30 text-black hover:bg-black/10 transition shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
        </>
      )}
    </main>
  );
}