"use client";
import { useEffect, useState } from "react";
import { useBreathingProtocol, Protocol } from "@/hooks/useBreathingProtocol";
import BreathingBall from "@/components/BreathingBall";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function WindIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={props.className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h13a3 3 0 1 0 0-6H6m13 6a3 3 0 1 1 0 6H4" />
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
  const router = useRouter();
  const [sel, setSel] = useState<Protocol | null>(null);
  const { timeLeft, phase } = useBreathingProtocol(sel);

  const animationDuration = sel?.[phase] ?? 1;

  const [completed, setCompleted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

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
        color: "#064e3b",
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
    <main className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-green-700 flex flex-col items-center justify-center p-6 relative font-sans" style={{ fontFamily: "Inter, sans-serif" }}>
      <Toaster />
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
              <h1 className="text-2xl font-bold text-green-100">Escolha um tempo de respiração.</h1>
              <WindIcon className="w-7 h-7 text-green-300" />
            </div>
            <p className="mb-4 text-base text-green-100 font-medium">
              Está tudo bem, você está seguro. Respire fundo e escolha um tempo de respiração.
            </p>
            <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4 mb-4">
              {PROTOCOLS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    setSel(p);
                    setCompleted(false);
                    setHasStarted(false);
                    setFeedback(null);
                  }}
                  className="px-4 py-2 bg-white/70 text-green-900 rounded-xl hover:bg-white transition font-semibold w-full md:w-auto"
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p className="mt-6 text-xs text-green-100/60 max-w-md mx-auto">
              Esta respiração (inspire por 4 segundos, expire por 6 segundos) ajuda seu corpo a relaxar e diminuir os sintomas da
              ansiedade.{" "}
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
              <a href="/" className="px-6 py-3 text-white rounded-xl border border-white/20 hover:bg-green-800 transition">
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
                <h1 className="text-3xl font-semibold text-green-100 mt-8 md:mt-12 mb-2 text-center">
                  {sel.label} de Respiração
                </h1>
                <p className="mb-8 text-green-100 text-center">
                  {phase === "inhale" ? "Inspire lentamente" : phase === "hold" ? "Segure o ar" : "Expire suavemente"}
                </p>
              </div>

              <BreathingBall
                phase={phase}
                animationDuration={animationDuration}
                textColor="#064e3b"
                glowColor="#6ee7b7"
                shadowColor="#34d399"
                backgroundColor="rgba(255, 255, 255, 0.4)"
              />

              <div className="text-xl text-green-100 mb-6 text-center">
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
          ) : (
            <>
              {!feedback && (
                <div className="flex flex-col items-center gap-4 mt-8">
                  <h2 className="text-2xl font-semibold text-white mb-4">Como você se sente agora?</h2>
                  <div className="flex gap-8">
                    <button
                      onClick={() => handleFeedback("up")}
                      className="w-20 h-20 flex items-center justify-center rounded-full bg-white/80 hover:bg-green-200 transition shadow-lg text-green-900 text-4xl"
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
                <p className="text-green-200 text-xl mt-8 text-center">
                  Que bom que ajudou! Volte sempre que precisar 💚
                </p>
              )}
              {feedback === "down" && (
                <p className="text-red-200 text-xl mt-8 text-center">
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
        </>
      )}
    </main>
  );
}