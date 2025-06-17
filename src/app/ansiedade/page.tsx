"use client";
import { useEffect, useState, useContext } from "react";
import { useBreathingProtocol, Protocol } from "@/hooks/useBreathingProtocol";
import BreathingBall from "@/components/BreathingBall";
import { Toaster, toast } from "react-hot-toast";
import { ZenModeContext } from "@/components/ZenModeProvider";
import FeedbackButtons from "@/components/FeedbackButtons";

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

const PROTOCOLS: Protocol[] = [
  { label: "1 minuto", duration: 1 * 60, inhale: 4, exhale: 6 },
  { label: "5 minutos", duration: 5 * 60, inhale: 4, exhale: 6 },
  { label: "15 minutos", duration: 15 * 60, inhale: 4, exhale: 6 },
  { label: "20 minutos", duration: 20 * 60, inhale: 4, exhale: 6 },
];

export default function AnsiedadePage() {
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

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 flex flex-col items-center justify-center p-6 relative font-sans"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <Toaster />

      {hasStarted && (
        <button
          onClick={toggleZenMode}
          className="absolute top-4 right-4 px-4 py-2 bg-white/70 text-green-900 rounded-xl hover:bg-white transition font-semibold"
        >
          {isZenMode ? "Desativar Modo Zen" : "Ativar Modo Zen"}
        </button>
      )}

      {!sel && !isZenMode && (
        <div className="absolute left-0 top-[6rem] hidden lg:block z-40">
          <img
            src="/images/girafasf.png"
            alt="Ilustração de girafa"
            className="max-h-[24rem] object-contain opacity-90 transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl"
          />
        </div>
      )}

      {!sel ? (
        <div className={`text-center ${isZenMode ? "hidden" : ""}`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <WindIcon className="w-7 h-7 text-green-300" />
            <h1 className="text-2xl font-bold text-green-100">
              Escolha um tempo de respiração.
            </h1>
            <WindIcon className="w-7 h-7 text-green-300" />
          </div>
          <p className="mb-4 text-base text-green-100 font-medium">
            Está tudo bem, você está seguro. Respire fundo e escolha um tempo de
            respiração.
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
                className="px-4 py-2 bg-white/70 text-green-900 rounded-xl hover:bg-white transition font-semibold w-full md:w-auto"
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
                <h1 className="text-3xl font-semibold text-green-100 mt-8 md:mt-12 mb-2 text-center">
                  {sel.label} de Respiração
                </h1>
                <p className="mb-8 text-green-100 text-center">
                  {phase === "inhale"
                    ? "Inspire lentamente"
                    : phase === "hold"
                    ? "Segure o ar"
                    : "Expire suavemente"}
                </p>
              </div>

              <div className="breathing-container mb-8">
                <BreathingBall
                  phase={phase}
                  animationDuration={animationDuration}
                  textColor="#064e3b"
                  glowColor="#6ee7b7"
                  shadowColor="#34d399"
                  backgroundColor="rgba(255, 255, 255, 0.4)"
                />
              </div>

              {!isZenMode && (
                <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50 text-xl text-green-100 text-center">
                  {Math.floor(timeLeft / 60)}:
                  {String(timeLeft % 60).padStart(2, "0")}
                </div>
              )}
            </div>
          ) : (
            <div className={`text-center ${isZenMode ? "hidden" : ""}`}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-green-100 mb-4">
                  ✨ Parabéns!
                </h2>
                <p className="text-green-100 text-lg mb-6">
                  Você completou sua sessão de respiração para ansiedade.
                </p>
              </div>

              <div className="mb-8">
                <FeedbackButtons 
                  context="anxiety-relief"
                  title="Este exercício te ajudou com a ansiedade?"
                />
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setSel(null);
                    setCompleted(false);
                    setHasStarted(false);
                  }}
                  aria-label="Voltar para escolha de tempo"
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 border border-green-900/20 text-green-900 hover:bg-green-200 transition shadow-lg"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
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
                  Fazer outro exercício
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {!isZenMode && (
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
      )}
    </main>
  );
}