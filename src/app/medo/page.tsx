"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function EyeIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M3.98 8.223a10.477 10.477 0 0 0-.861 1.184 1.546 1.546 0 0 0 0 1.186C5.385 14.614 8.408 17 12 17c1.456 0 2.853-.34 4.15-.961M21 21l-6-6m-1.414-1.414a3 3 0 1 1-4.243-4.243"
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
  { label: "5 minutos", duration: 5 * 60, inhale: 4, exhale: 6 },
  { label: "15 minutos", duration: 15 * 60, inhale: 4, exhale: 6 },
  { label: "20 minutos", duration: 20 * 60, inhale: 4, exhale: 6 },
];

export default function MedoPage() {
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
      setTimeLeft((t) => Math.max(t - 1, 0));
    }, 1000);
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
    const iv = setInterval(() => {
      setPhaseTimeLeft((t) => t - 1);
    }, 1000);
    return () => clearInterval(iv);
  }, [phaseTimeLeft, phase, sel, timeLeft]);

  const animationDuration = sel ? sel[phase] : 1;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 flex flex-col items-center justify-center p-4 sm:p-6 relative">
      {/* Imagem do cavalo, só na tela de escolha de tempo e apenas em telas grandes */}
      {!sel && (
        <div className="absolute left-0 top-[6rem] hidden lg:block z-40">
          <img
            src="/cavalosf.png"
            alt="Ilustração de cavalo"
            className="max-h-[24rem] object-contain opacity-90 transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl"
          />
        </div>
      )}
      {!sel ? (
        <>
          <div className="text-center w-full max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <EyeIcon className="w-7 h-7 text-indigo-300" />
              <h1 className="text-2xl font-bold text-indigo-100">
                Escolha um tempo de respiração.
              </h1>
              <EyeIcon className="w-7 h-7 text-indigo-300" />
            </div>
            <p className="mb-4 text-base text-indigo-100 font-medium">
              O medo é uma resposta natural. Você está seguro agora. Respire com calma e escolha um tempo.
            </p>
            <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4 mb-4">
              {PROTOCOLS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setSel(p)}
                  className="px-4 py-2 bg-white/70 text-indigo-900 rounded-xl hover:bg-white transition font-semibold w-full md:w-auto"
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p className="mt-6 text-xs text-indigo-100/60 max-w-md mx-auto">
              A respiração controlada (inspire por 4 segundos, expire por 6 segundos) ajuda seu corpo a sair do modo de alerta.{" "}
              <a
                href="https://www.psychologytoday.com/us/blog/urban-survival/202204/slow-breathing-exercise-can-reduce-stress-and-anxiety"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Saiba mais
              </a>
            </p>
          </div>
          <div className="fixed bottom-0 left-0 w-full">
            <div className="w-full flex justify-center items-center p-4 bg-indigo-950/80 backdrop-blur-md">
              <a
                href="/"
                className="px-6 py-3 text-white rounded-xl border border-white/20 hover:bg-indigo-800 transition"
              >
                Voltar para início
              </a>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex flex-col items-center px-2">
            <h1 className="text-2xl sm:text-3xl font-semibold text-indigo-100 mt-6 sm:mt-12 mb-2 text-center leading-tight">
              {sel.label} de Respiração
            </h1>
            <div className="mb-8 sm:mb-16"></div>
            <p className="mb-6 sm:mb-8 text-indigo-100 text-center text-base sm:text-lg">
              {phase === "inhale"
                ? "Inspire com calma"
                : phase === "hold"
                ? "Segure o ar"
                : "Expire devagar"}
            </p>
          </div>
          {/* Neon/fumaça animada atrás da bola */}
          <div className="relative flex items-center justify-center mb-6 w-full">
            <motion.div
              className="absolute"
              style={{
                width: "min(90vw,340px)",
                height: "min(90vw,340px)",
                borderRadius: "9999px",
                pointerEvents: "none",
                boxShadow:
                  "0 0 80px 20px #a5b4fc88, 0 0 160px 60px #818cf899, 0 0 40px 10px #6366f199",
                zIndex: 0,
              }}
              animate={{
                scale: phase === "inhale" || phase === "hold" ? 1.5 : 1.1,
                opacity: phase === "inhale" || phase === "hold" ? 0.6 : 0.3,
              }}
              transition={{ duration: animationDuration, ease: "linear" }}
            />
            <motion.div
              className="flex items-center justify-center rounded-full bg-white/40 text-2xl font-medium text-indigo-900 relative z-10"
              style={{
                width: "min(65vw,240px)",
                height: "min(65vw,240px)",
              }}
              animate={{
                scale: phase === "inhale" || phase === "hold" ? 1.4 : 0.8,
              }}
              transition={{ duration: animationDuration, ease: "linear" }}
            >
              {phase === "inhale"
                ? "Inspire"
                : phase === "hold"
                ? "Segure"
                : "Expire"}
            </motion.div>
          </div>
          <div className="text-lg sm:text-xl text-indigo-100 mb-6 text-center">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </div>
          {/* Botão de seta para encerrar sessão, centralizado e abaixo da bola */}
          <div className="flex justify-center mt-8 mb-4">
            <button
              onClick={() => setSel(null)}
              aria-label="Encerrar sessão"
              className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/80 border border-indigo-900/20 text-indigo-900 hover:bg-indigo-200 transition shadow-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 sm:w-7 sm:h-7"
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