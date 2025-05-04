"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Ícone de folha (natureza, Heroicons)
function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
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
        d="M21 15.25A8.38 8.38 0 0 1 12.62 21 8.38 8.38 0 0 1 3 12.38C3 7.5 7.5 3 12.38 3c2.12 0 4.13.83 5.62 2.31M21 15.25V3m0 12.25H8.75"
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
  { label: "5 minutos", duration: 5 * 60, inhale: 4, hold: 7, exhale: 8 },
  { label: "15 minutos", duration: 15 * 60, inhale: 4, hold: 7, exhale: 8 },
  { label: "20 minutos", duration: 20 * 60, inhale: 4, hold: 7, exhale: 8 },
];

export default function PanicoPage() {
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
    const interval = setInterval(() => {
      setTimeLeft((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [sel, timeLeft]);

  useEffect(() => {
    if (!sel || timeLeft <= 0) return;
    if (phaseTimeLeft <= 0) {
      if (phase === "inhale" && sel.hold) {
        setPhase("hold");
        setPhaseTimeLeft(sel.hold);
      } else if (phase === "hold") {
        setPhase("exhale");
        setPhaseTimeLeft(sel.exhale);
      } else if (phase === "exhale") {
        setPhase("inhale");
        setPhaseTimeLeft(sel.inhale);
      } else if (phase === "inhale" && !sel.hold) {
        setPhase("exhale");
        setPhaseTimeLeft(sel.exhale);
      }
      return;
    }
    const interval = setInterval(() => {
      setPhaseTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [phaseTimeLeft, phase, sel, timeLeft]);

  const animationDuration = sel ? sel[phase] : 1;

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400 flex flex-col items-center justify-center p-6 relative">
      {!sel ? (
        <>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <LeafIcon className="w-7 h-7 text-blue-500" />
              <h1 className="text-2xl font-bold text-blue-900">
                Escolha um tempo de respiração.
              </h1>
              <LeafIcon className="w-7 h-7 text-blue-500" />
            </div>
            <p className="mb-4 text-base text-blue-900 font-medium">
              O pânico é uma resposta do corpo, mas ele passa. Você está seguro agora. Respire com calma e escolha um tempo para se acalmar.
            </p>
            <div className="space-x-4">
              {PROTOCOLS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setSel(p)}
                  className="px-4 py-2 bg-white/70 text-blue-900 rounded-xl hover:bg-white transition font-semibold"
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p className="mt-6 text-xs text-blue-900/70 max-w-md mx-auto">
              A respiração 4-7-8 (inspire por 4s, segure 7s, expire 8s) ajuda seu corpo a sair do modo de alerta.{" "}
              <a
                href="https://www.medicalnewstoday.com/articles/324417"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Saiba mais
              </a>
            </p>
          </div>
          <div className="fixed bottom-0 left-0 w-full">
            <div className="w-full flex justify-center items-center p-4 bg-blue-300/80 backdrop-blur-md">
              <a
                href="/"
                className="px-6 py-3 text-blue-900 rounded-xl border border-blue-900/20 hover:bg-blue-200 transition"
              >
                Voltar para início
              </a>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl font-semibold mb-4 text-blue-900">
            {sel.label} de Respiração
          </h1>
          <p className="mb-6 text-blue-900">
            {phase === "inhale"
              ? "Inspire com calma"
              : phase === "hold"
              ? "Segure o ar"
              : "Expire devagar"}
          </p>
          <motion.div
            className="w-60 h-60 bg-white/40 rounded-full flex items-center justify-center text-2xl font-medium mb-6 text-blue-900"
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
          <div className="text-xl text-blue-900 mb-6">
            {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
          </div>
          <div className="fixed bottom-0 left-0 w-full">
            <div className="w-full flex flex-col md:flex-row gap-4 justify-center items-center p-4 bg-blue-300/80 backdrop-blur-md">
              <button
                onClick={() => setSel(null)}
                className="px-6 py-3 text-blue-900 rounded-xl border border-blue-900/20 hover:bg-blue-200 transition"
              >
                Encerrar sessão
              </button>
              <a
                href="/"
                className="px-6 py-3 text-blue-900 rounded-xl border border-blue-900/20 hover:bg-blue-200 transition"
              >
                Voltar para início
              </a>
            </div>
          </div>
        </>
      )}
    </main>
  );
}