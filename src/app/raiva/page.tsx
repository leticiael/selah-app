"use client";
import { useState, useEffect, useContext } from "react";
import { useBreathingProtocol, Protocol } from "@/hooks/useBreathingProtocol";
import BreathingBall from "@/components/BreathingBall";
import { Toaster, toast } from "react-hot-toast";
import { ZenModeContext } from "@/components/ZenModeProvider";
import FeedbackButtons from "@/components/FeedbackButtons";

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

const PROTOCOLS: Protocol[] = [
  { label: "1 minuto", duration: 1 * 60, inhale: 4, exhale: 8 },
  { label: "5 minutos", duration: 5 * 60, inhale: 4, exhale: 8 },
  { label: "15 minutos", duration: 15 * 60, inhale: 4, exhale: 8 },
  { label: "20 minutos", duration: 20 * 60, inhale: 4, exhale: 8 },
];

export default function RaivaPage() {
  const [sel, setSel] = useState<Protocol | null>(null);
  const { timeLeft, phase } = useBreathingProtocol(sel);
  const [completed, setCompleted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const animationDuration = sel?.[phase] ?? 1;

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
      className="min-h-screen bg-[#FF91AF] flex flex-col items-center justify-center p-6 relative font-sans"
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
            src="/images/lobosf.png"
            alt="Ilustração de lobo"
            className="max-h-[24rem] object-contain opacity-90 transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl"
          />
        </div>
      )}

      {!sel ? (
        <div className={`text-center ${isZenMode ? "hidden" : ""}`}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <CloudIcon className="w-7 h-7 text-black" />
            <h1 className="text-2xl font-bold text-black">
              Controle sua Raiva
            </h1>
            <CloudIcon className="w-7 h-7 text-black" />
          </div>
          <p className="mb-4 text-base text-black font-medium">
            Está tudo bem sentir raiva. Vamos respirar juntos para aliviar a
            tensão e acalmar seu corpo e mente.
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
                className="px-4 py-2 bg-white/80 text-[#FF91AF] rounded-xl hover:bg-white transition font-semibold w-full md:w-auto"
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className="mt-6 text-xs text-black/70 max-w-md mx-auto">
            O fundo rosa desta página (Baker-Miller Pink) foi estudado por
            psicólogos e pode ajudar a acalmar emoções intensas, como a raiva.{" "}
            <a
              href="https://www.researchgate.net/publication/236843504_The_Physiological_Effect_of_Color_on_the_Suppression_of_Human_Aggression_Research_on_Baker-Miller_Pink"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Veja o estudo original
            </a>
            .<br />A respiração lenta (inspire por 4 segundos, expire por 8
            segundos) também é comprovada para reduzir emoções negativas e
            acalmar o corpo.{" "}
            <a
              href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6137615/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Saiba mais sobre a técnica
            </a>
            .
          </p>
        </div>
      ) : (
        <>
          {!completed ? (
            <>
              <div className="relative w-full flex flex-col items-center z-40">
                <div
                  className={`text-center ${isZenMode ? "hidden" : ""} z-40`}
                >
                  <h1 className="text-2xl sm:text-3xl font-semibold text-black mt-6 sm:mt-12 mb-2 text-center leading-tight">
                    {sel.label} de Respiração
                  </h1>
                  <p className="mb-6 sm:mb-8 text-black text-center text-base sm:text-lg">
                    {phase === "inhale"
                      ? "Inspire profundamente"
                      : "Expire lentamente"}
                  </p>
                </div>

                <div className="breathing-container mb-8">
                  <BreathingBall
                    phase={phase}
                    animationDuration={animationDuration}
                    textColor="#FF91AF"
                    glowColor="#ff5fa2"
                    shadowColor="#ffb3d9"
                    backgroundColor="rgba(255,255,255,0.6)"
                  />
                </div>

                {!isZenMode && (
                  <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50 text-xl text-black text-center">
                    {Math.floor(timeLeft / 60)}:
                    {String(timeLeft % 60).padStart(2, "0")}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className={`text-center ${isZenMode ? "hidden" : ""}`}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-black mb-4">
                  ✨ Parabéns!
                </h2>
                <p className="text-black text-lg mb-6">
                  Você completou sua sessão de respiração para controlar a raiva.
                </p>
              </div>

              <div className="mb-8">
                <FeedbackButtons 
                  context="anger-management"
                  title="Este exercício te ajudou a se acalmar?"
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
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 border border-black/30 text-black hover:bg-black/10 transition shadow-lg"
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
          <div className="w-full flex justify-center items-center p-4 bg-white/40 backdrop-blur-md">
            <a
              href="/"
              className="px-6 py-3 text-black rounded-xl border border-black/30 hover:bg-black/10 transition"
            >
              Voltar para início
            </a>
          </div>
        </div>
      )}
    </main>
  );
}