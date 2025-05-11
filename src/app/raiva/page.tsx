"use client";
import { useState, useEffect } from "react";
import { useBreathingProtocol, Protocol } from "@/hooks/useBreathingProtocol";
import BreathingBall from "@/components/BreathingBall";
import { Toaster, toast } from "react-hot-toast";

function CloudIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={props.className}>
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
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);

  const animationDuration = sel?.[phase] ?? 1;

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
        color: "#FF91AF",
        fontWeight: "500",
      },
    });
    setTimeout(() => {
      setSel(null);
      setCompleted(false);
      setHasStarted(false);
      setFeedback(null);
    }, type === "down" ? 5000 : 2000);
  }

  return (
    <main className="min-h-screen bg-[#FF91AF] flex flex-col items-center justify-center p-6 relative font-sans" style={{ fontFamily: "Inter, sans-serif" }}>
      <Toaster />
      {!sel && (
        <div className="absolute left-0 top-[6rem] hidden lg:block z-40">
          <img
            src="/lobosf.png"
            alt="Ilustração de lobo"
            className="max-h-[24rem] object-contain opacity-90 transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl"
          />
        </div>
      )}

      {!sel ? (
        <>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CloudIcon className="w-7 h-7 text-black" />
              <h1 className="text-2xl font-bold text-black">Controle sua Raiva</h1>
              <CloudIcon className="w-7 h-7 text-black" />
            </div>
            <p className="mb-4 text-base text-black font-medium">
              Está tudo bem sentir raiva. Vamos respirar juntos para aliviar a tensão e acalmar seu corpo e mente.
            </p>
            <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4 mb-4">
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
              O fundo rosa desta página (Baker-Miller Pink) foi estudado por psicólogos e pode ajudar a acalmar emoções intensas,
              como a raiva.{" "}
              <a
                href="https://www.researchgate.net/publication/236843504_The_Physiological_Effect_of_Color_on_the_Suppression_of_Human_Aggression_Research_on_Baker-Miller_Pink"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Veja o estudo original
              </a>
              .<br />A respiração lenta (inspire por 4 segundos, expire por 8 segundos) também é comprovada para reduzir emoções
              negativas e acalmar o corpo.{" "}
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

          <div className="fixed bottom-0 left-0 w-full">
            <div className="w-full flex justify-center items-center p-4 bg-white/40 backdrop-blur-md">
              <a href="/" className="px-6 py-3 text-black rounded-xl border border-black/30 hover:bg-black/10 transition">
                Voltar para início
              </a>
            </div>
          </div>
        </>
      ) : (
        <>
          {!completed ? (
            <>
              <div className="w-full flex flex-col items-center">
                <h1 className="text-3xl font-semibold text-black mt-8 md:mt-12 mb-2 text-center">{sel.label} de Respiração</h1>
                <p className="mb-8 text-black text-center">
                  {phase === "inhale" ? "Inspire profundamente" : "Expire lentamente"}
                </p>
              </div>

              <BreathingBall
                phase={phase}
                animationDuration={animationDuration}
                textColor="#FF91AF"
                glowColor="#ff5fa2"
                shadowColor="#ffb3d9"
                backgroundColor="rgba(255,255,255,0.6)"
              />

              <div className="text-xl text-black mb-6 text-center">
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              </div>
              <div className="flex justify-center mt-2 mb-4">
                <button
                  onClick={() => {
                    setSel(null);
                    setCompleted(false);
                    setHasStarted(false);
                    setFeedback(null);
                  }}
                  aria-label="Voltar para escolha de tempo"
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
          ) : (
            <>
              {!feedback && (
                <div className="flex flex-col items-center gap-4 mt-8">
                  <h2 className="text-2xl font-semibold text-black mb-4">Como você se sente agora?</h2>
                  <div className="flex gap-8">
                    <button
                      onClick={() => handleFeedback("up")}
                      className="w-20 h-20 flex items-center justify-center rounded-full bg-white/80 hover:bg-pink-200 transition shadow-lg text-[#FF91AF] text-4xl"
                      aria-label="Gostei"
                    >
                      👍
                    </button>
                    <button
                      onClick={() => handleFeedback("down")}
                      className="w-20 h-20 flex items-center justify-center rounded-full bg-white/80 hover:bg-red-200 transition shadow-lg text-red-700 text-4xl"
                      aria-label="Não gostei"
                    >
                      👎
                    </button>
                  </div>
                </div>
              )}
              {feedback === "up" && (
                <p className="text-pink-700 text-xl mt-8 text-center">
                  Que bom que ajudou! Volte sempre que precisar 💗
                </p>
              )}
              {feedback === "down" && (
                <p className="text-red-500 text-xl mt-8 text-center">
                  Sinto muito que não tenha te ajudado como você esperava. Se estiver difícil, procure apoio — você merece cuidado e não está sozinho. Ligue 188 (CVV) ou fale com alguém de confiança. 💛
                </p>
              )}
              <div className="flex justify-center mt-8 mb-4">
                <button
                  onClick={() => {
                    setSel(null);
                    setCompleted(false);
                    setHasStarted(false);
                    setFeedback(null);
                  }}
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
        </>
      )}
    </main>
  );
}