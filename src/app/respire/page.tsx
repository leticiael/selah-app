"use client";
import { useState, useEffect } from "react";
import { useBreathingProtocol, Protocol } from "@/hooks/useBreathingProtocol";
import BreathingBall from "@/components/BreathingBall";
import { Toaster } from "react-hot-toast";

const PROTOCOLS: Protocol[] = [
  { label: "1 minuto", duration: 1 * 60, inhale: 4, exhale: 6 },
  { label: "5 minutos", duration: 5 * 60, inhale: 4, exhale: 6 },
  { label: "15 minutos", duration: 15 * 60, inhale: 4, exhale: 6 },
  { label: "20 minutos", duration: 20 * 60, inhale: 4, exhale: 6 },
];

export default function RespirePage() {
  const [sel, setSel] = useState<Protocol | null>(null);
  const { timeLeft, phase } = useBreathingProtocol(sel);
  const [completed, setCompleted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const animationDuration = sel?.[phase] ?? 1;

  useEffect(() => {
    if (timeLeft > 0 && !hasStarted) setHasStarted(true);
    if (timeLeft === 0 && sel && hasStarted) setCompleted(true);
  }, [timeLeft, sel, hasStarted]);

  function resetAll() {
    setSel(null);
    setCompleted(false);
    setHasStarted(false);
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center p-6 relative font-sans overflow-x-hidden"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#2C3E50] via-[#344E41] to-[#2C3E50]" />
      <div className="absolute inset-0 -z-10 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, #ffffff22, transparent 80%)" }} />
      {!sel && (
        <div className={`absolute left-0 top-[6rem] hidden lg:block z-40 transition-opacity duration-500 ${sel ? "opacity-0" : "opacity-100"}`}>
          <img
            src="/garca.png"
            alt="Ilustração de garça"
            className="max-h-[24rem] object-contain opacity-90 transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl"
          />
        </div>
      )}
      <Toaster />
      {!sel ? (
        <>
          <div className="text-center">
            <h1 className="text-2xl font-bold text-[#ffffff]">Apenas Respire</h1>
            <p className="mb-4 text-base text-[#ffffff] font-medium">
              Use este espaço para respirar com calma, sem julgamentos ou perguntas. Escolha um tempo e siga seu ritmo.
            </p>
            
            <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4 mb-4">
              {PROTOCOLS.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setSel(p)}
                  className="px-4 py-2 bg-white/80 text-[#2C3E50] rounded-xl hover:bg-white transition font-semibold w-full md:w-auto shadow hover:scale-105"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          <p className="italic text-sm text-[#ffffff]/70 mb-6">
              A respiração lenta (inspire por 4 segundos, expire por 6 segundos) ajuda a acalmar o corpo e a mente.
            </p>
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
                <h1 className="text-3xl font-semibold text-[#ffffff] mt-8 md:mt-12 mb-2 text-center">
                  {sel.label} de Respiração
                </h1>
                <p className="mb-8 text-[#ffffff] text-center text-lg">
                  {phase === "inhale" ? "Inspire lentamente" : phase === "hold" ? "Segure o ar" : "Expire suavemente"}
                </p>
              </div>
              <BreathingBall
                phase={phase}
                animationDuration={animationDuration}
                textColor="#ffffff"
                glowColor="#344E41"
                shadowColor="#2C3E50"
                backgroundColor="rgba(255,255,255,0.1)"
              />
              <div className="text-xl text-[#ffffff] mb-6 text-center">
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
              </div>
              <div className="flex justify-center mt-2 mb-4">
                <button
                  onClick={resetAll}
                  aria-label="Voltar para escolha de tempo"
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-white/80 border border-[#ffffff]/30 text-[#2C3E50] hover:bg-[#ffffff]/10 transition shadow-lg"
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
              <div className="flex flex-col items-center gap-4 mt-8">
                <p className="text-[#ffffff] text-xl mt-8 text-center">
                  Respiração concluída. Volte sempre que quiser um momento de pausa.
                </p>
              </div>
              <div className="flex justify-center mt-8 mb-4">
                <button
                  onClick={resetAll}
                  aria-label="Encerrar sessão"
                  className="flex items-center justify-center w-14 h-14 rounded-full bg-white/80 border border-[#ffffff]/30 text-[#2C3E50] hover:bg-[#ffffff]/10 transition shadow-lg"
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