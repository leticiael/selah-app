"use client";
import { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { Protocol, useBreathingProtocol } from "@/hooks/useBreathingProtocol";
import BreathingBall from "@/components/BreathingBall";
import { Toaster, toast } from "react-hot-toast";
import { ZenModeContext } from "@/components/ZenModeProvider";

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

const PROTOCOLS: Protocol[] = [
  { label: "1 minuto", duration: 1 * 60, inhale: 4, hold: 7, exhale: 8 },
  { label: "5 minutos", duration: 5 * 60, inhale: 4, hold: 7, exhale: 8 },
  { label: "15 minutos", duration: 15 * 60, inhale: 4, hold: 7, exhale: 8 },
  { label: "20 minutos", duration: 20 * 60, inhale: 4, hold: 7, exhale: 8 },
];

export default function PanicoPage() {
  const [sel, setSel] = useState<Protocol | null>(null);
  const { timeLeft, phase } = useBreathingProtocol(sel);
  const [completed, setCompleted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const animationDuration: number = sel && sel[phase] ? sel[phase] : 1;

  const { isZenMode, toggleZenMode } = useContext(ZenModeContext);

  useEffect(() => {
    if (timeLeft > 0 && !hasStarted) {
      setHasStarted(true);
    }
    if (timeLeft === 0 && sel && hasStarted) {
      setCompleted(true);
    }
  }, [timeLeft, sel, hasStarted]);

  function handleFeedback(type: "up" | "down") {
    setFeedback(type);
    const history = JSON.parse(localStorage.getItem("feedback") || "[]");
    const newEntry = {
      date: new Date().toISOString(),
      emotion: sel?.label ?? "Respiração",
      feedback: type,
    };
    localStorage.setItem("feedback", JSON.stringify([newEntry, ...history]));
    toast.success("Feedback registrado!", {
      duration: 1500,
      position: "top-center",
      style: {
        background: "rgba(255, 255, 255, 0.9)",
        color: "#2563eb",
        fontWeight: "500",
      },
    });
    setTimeout(
      () => {
        setSel(null);
        setCompleted(false);
        setHasStarted(false);
        setFeedback(null);
      },
      type === "down" ? 5000 : 2000
    );
  }

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-[#1e293b] via-[#2563eb] to-[#60a5fa] flex flex-col items-center justify-center p-6 relative font-sans"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <Toaster />

      {hasStarted && (
        <button
          onClick={toggleZenMode}
          className="absolute top-4 right-4 px-4 py-2 bg-white/70 text-blue-900 rounded-xl hover:bg-white transition font-semibold"
        >
          {isZenMode ? "Desativar Modo Zen" : "Ativar Modo Zen"}
        </button>
      )}

      {!sel && !isZenMode && (
        <div className="absolute left-0 top-[6rem] hidden lg:block z-40">
          <img
            src="/pandasf.png"
            alt="Ilustração de panda"
            className="max-h-[24rem] object-contain opacity-90 transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl"
          />
        </div>
      )}

      {!sel ? (
        <div className={`text-center ${isZenMode ? "hidden" : ""}`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <LeafIcon className="w-7 h-7 text-blue-200" />
            <h1 className="text-2xl font-bold text-blue-100">
              Escolha um tempo de respiração.
            </h1>
            <LeafIcon className="w-7 h-7 text-blue-200" />
          </div>
          <p className="mb-4 text-base text-blue-100 font-medium">
            O pânico é uma resposta do corpo, mas ele passa. Você está seguro
            agora. Respire com calma e escolha um tempo para se acalmar.
          </p>
          <div
            className={`flex flex-col md:flex-row md:justify-center md:items-center gap-4 mb-4 ${
              isZenMode ? "hidden" : ""
            }`}
          >
            {PROTOCOLS.map((p) => (
              <button
                key={p.label}
                onClick={() => setSel(p)}
                className="px-4 py-2 bg-white/10 text-blue-100 rounded-xl hover:bg-white/20 transition font-semibold w-full md:w-auto border border-blue-400/30"
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className="mt-6 text-xs text-blue-200/80 max-w-md mx-auto">
            A respiração 4-7-8 (inspire por 4s, segure 7s, expire 8s) ajuda seu
            corpo a sair do modo de alerta.{" "}
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
      ) : (
        <>
          {!completed ? (
            <div className="relative w-full flex flex-col items-center z-40">
              <div className={`text-center ${isZenMode ? "hidden" : ""} z-40`}>
                <h1 className="text-2xl sm:text-3xl font-semibold text-blue-100 mt-6 sm:mt-12 mb-2 text-center leading-tight">
                  {sel.label} de Respiração
                </h1>
                <p className="mb-6 sm:mb-8 text-blue-200 text-center text-base sm:text-lg">
                  {phase === "inhale"
                    ? "Inspire com calma"
                    : phase === "hold"
                    ? "Segure o ar"
                    : "Expire devagar"}
                </p>
              </div>

              <div className="breathing-container mb-8">
                <BreathingBall
                  phase={phase}
                  animationDuration={animationDuration}
                  textColor="#312e81"
                  glowColor="#a5b4fc"
                  shadowColor="#6366f1"
                  backgroundColor="rgba(255, 255, 255, 0.4)"
                />
              </div>

              {!isZenMode && (
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50 text-xl text-blue-100 text-center">
                  {Math.floor(timeLeft / 60)}:
                  {String(timeLeft % 60).padStart(2, "0")}
                </div>
              )}
            </div>
          ) : (
            <div
              className={`flex justify-center mt-8 mb-4 ${
                isZenMode ? "hidden" : ""
              }`}
            >
              <button
                onClick={() => {
                  setSel(null);
                  setCompleted(false);
                  setHasStarted(false);
                  setFeedback(null);
                }}
                aria-label="Voltar para escolha de tempo"
                className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 border border-blue-200/20 text-blue-100 hover:bg-white/20 transition shadow-lg"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            </div>
          )}
        </>
      )}

      {!isZenMode && (
        <div className="fixed bottom-0 left-0 w-full">
          <div className="w-full flex justify-center items-center p-4 bg-[#2563eb]/80 backdrop-blur-md">
            <a
              href="/"
              className="px-6 py-3 text-blue-100 rounded-xl border border-blue-200/20 hover:bg-[#60a5fa]/60 transition"
            >
              Voltar para início
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
