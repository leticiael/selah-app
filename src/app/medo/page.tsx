"use client";
import { useEffect, useState, useContext } from "react";
import { useBreathingProtocol, Protocol } from "@/hooks/useBreathingProtocol";
import BreathingBall from "@/components/BreathingBall";
import { Toaster, toast } from "react-hot-toast";
import { ZenModeContext } from "@/components/ZenModeProvider";

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

const PROTOCOLS: Protocol[] = [
  { label: "1 minuto", duration: 1 * 60, inhale: 4, exhale: 6 },
  { label: "5 minutos", duration: 5 * 60, inhale: 4, exhale: 6 },
  { label: "15 minutos", duration: 15 * 60, inhale: 4, exhale: 6 },
  { label: "20 minutos", duration: 20 * 60, inhale: 4, exhale: 6 },
];

export default function MedoPage() {
  const [sel, setSel] = useState<Protocol | null>(null);
  const { timeLeft, phase } = useBreathingProtocol(sel);

  const animationDuration = sel?.[phase] ?? 1;

  const [completed, setCompleted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const { isZenMode, toggleZenMode } = useContext(ZenModeContext);

  useEffect(() => {
    if (timeLeft > 0 && !hasStarted) {
      setHasStarted(true);
    }
    if (timeLeft === 0 && sel && hasStarted) {
      setCompleted(true);
    }
  }, [timeLeft, sel, hasStarted]);

  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

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
        color: "#312e81",
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
      className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-800 flex flex-col items-center justify-center p-4 sm:p-6 relative font-sans"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <Toaster />

      {hasStarted && (
        <button
          onClick={toggleZenMode}
          className="absolute top-4 right-4 px-4 py-2 bg-white/70 text-indigo-900 rounded-xl hover:bg-white transition font-semibold"
        >
          {isZenMode ? "Desativar Modo Zen" : "Ativar Modo Zen"}
        </button>
      )}

      {!sel && !isZenMode && (
        <div className="absolute left-0 top-[6rem] hidden lg:block z-40">
          <img
            src="/cavalosf.png"
            alt="Ilustração de cavalo"
            className="max-h-[24rem] object-contain opacity-90 transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl"
          />
        </div>
      )}

      {!sel ? (
        <div className={`text-center ${isZenMode ? "hidden" : ""}`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <EyeIcon className="w-7 h-7 text-indigo-300" />
            <h1 className="text-2xl font-bold text-indigo-100">
              Escolha um tempo de respiração.
            </h1>
            <EyeIcon className="w-7 h-7 text-indigo-300" />
          </div>
          <p className="mb-4 text-base text-indigo-100 font-medium">
            O medo é uma resposta natural. Você está seguro agora. Respire com
            calma e escolha um tempo.
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
                className="px-4 py-2 bg-white/70 text-indigo-900 rounded-xl hover:bg-white transition font-semibold w-full md:w-auto"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <>
          {!completed ? (
            <div className="relative w-full flex flex-col items-center z-40">
              <div className={`text-center ${isZenMode ? "hidden" : ""} z-40`}>
                <h1 className="text-2xl sm:text-3xl font-semibold text-indigo-100 mt-6 sm:mt-12 mb-2 text-center leading-tight">
                  {sel.label} de Respiração
                </h1>
                <p className="mb-6 sm:mb-8 text-indigo-100 text-center text-base sm:text-lg">
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
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50 text-xl text-indigo-100 text-center">
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
                className="flex items-center justify-center w-14 h-14 rounded-full bg-white/80 border border-indigo-900/20 text-indigo-900 hover:bg-indigo-200 transition shadow-lg"
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
          <div className="w-full flex justify-center items-center p-4 bg-indigo-950/80 backdrop-blur-md">
            <a
              href="/"
              className="px-6 py-3 text-white rounded-xl border border-white/20 hover:bg-indigo-800 transition"
            >
              Voltar para início
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
