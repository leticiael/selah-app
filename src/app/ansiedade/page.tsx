"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function WindIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M3 12h13a3 3 0 1 0 0-6H6m13 6a3 3 0 1 1 0 6H4"
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
  { label: "5 minutos",  duration: 5 * 60,  inhale: 4, exhale: 6 },
  { label: "15 minutos", duration: 15 * 60, inhale: 4, exhale: 6 },
  { label: "20 minutos", duration: 20 * 60, inhale: 4, exhale: 6 },
];

export default function AnsiedadePage() {
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
    <main className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 flex flex-col items-center justify-center p-6 relative">
      {/* Imagem da girafa, só em telas grandes e só na tela de escolha de tempo */}
      {!sel && (
        <div className="absolute left-0 top-[6rem] hidden lg:block z-40">
          <img
            src="/girafasf.png"
            alt="Ilustração de girafa"
            className="max-h-[24rem] object-contain opacity-90 transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl"
          />
        </div>
      )}
      {!sel ? (
        <>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <WindIcon className="w-7 h-7 text-green-300" />
              <h1 className="text-2xl font-bold text-green-100">
                Escolha um tempo de respiração.
              </h1>
              <WindIcon className="w-7 h-7 text-green-300" />
            </div>
            <p className="mb-4 text-base text-green-100 font-medium">
              Está tudo bem, você está seguro. Respire fundo e escolha um tempo de respiração.
            </p>
            <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4 mb-4">
              {PROTOCOLS.map(p => (
                <button
                  key={p.label}
                  onClick={() => setSel(p)}
                  className="px-4 py-2 bg-white/70 text-green-900 rounded-xl hover:bg-white transition font-semibold w-full md:w-auto"
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p className="mt-6 text-xs text-green-100/60 max-w-md mx-auto">
              Esta respiração (inspire por 4 segundos, expire por 6 segundos) ajuda seu corpo a relaxar e diminuir os sintomas da ansiedade.{" "}
              <a
                href="https://www.health.harvard.edu/mind-and-mood/relaxation-techniques-breath-control-helps-quell-errant-stress-response"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Saiba mais
              </a>
            </p>
          </div>
          <div className="fixed bottom-0 left-0 w-full">
            <div className="w-full flex justify-center items-center p-4 bg-green-950/80 backdrop-blur-md">
              <a
                href="/"
                className="px-6 py-3 text-white rounded-xl border border-white/20 hover:bg-green-800 transition"
              >
                Voltar para início
              </a>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="w-full flex flex-col items-center">
            <h1 className="text-3xl font-semibold text-green-100 mt-8 md:mt-12 mb-2 text-center">
              {sel.label} de Respiração
            </h1>
            <div className="mb-15"></div>
            <p className="mb-8 text-green-100 text-center">
              {phase === "inhale"
                ? "Inspire lentamente"
                : phase === "hold"
                ? "Segure o ar"
                : "Expire suavemente"}
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
                  "0 0 80px 20px #6ee7b788, 0 0 160px 60px #34d39977, 0 0 40px 10px #22c55e99",
                zIndex: 0,
              }}
              animate={{
                scale: phase === "inhale" || phase === "hold" ? 1.5 : 1.1,
                opacity: phase === "inhale" || phase === "hold" ? 0.6 : 0.3,
              }}
              transition={{ duration: animationDuration, ease: "linear" }}
            />
            <motion.div
              className="w-60 h-60 bg-white/40 rounded-full flex items-center justify-center text-2xl font-medium text-green-900 relative z-10"
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
          <div className="text-xl text-green-100 mb-6 text-center">
            {Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,'0')}
          </div>
          {/* Botão de seta para encerrar sessão, centralizado e abaixo da bola */}
          <div className="flex justify-center mt-8 mb-4">
            <button
              onClick={() => setSel(null)}
              aria-label="Encerrar sessão"
              className="flex items-center justify-center w-14 h-14 rounded-full bg-white/80 border border-green-900/20 text-green-900 hover:bg-green-200 transition shadow-lg"
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