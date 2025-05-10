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
  { label: "5 minutos", duration: 5 * 60, inhale: 4, exhale: 8 },
  { label: "15 minutos", duration: 15 * 60, inhale: 4, exhale: 8 },
  { label: "20 minutos", duration: 20 * 60, inhale: 4, exhale: 8 },
];

export default function RaivaPage() {
  const [sel, setSel] = useState<Protocol | null>(null);
  const { timeLeft, phase } = useBreathingProtocol(sel);
  const [completed, setCompleted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [entry, setEntry] = useState("");

  const animationDuration = sel?.[phase] ?? 1;

  useEffect(() => {
    if (timeLeft > 0 && !hasStarted) {
      setHasStarted(true);
    }
    if (timeLeft === 0 && sel && hasStarted) {
      setCompleted(true);
    }
  }, [timeLeft, sel, hasStarted]);

  const handleSave = () => {
    const history = JSON.parse(localStorage.getItem("journal") || "[]");
    const newEntry = {
      date: new Date().toISOString(),
      emotion: sel?.label ?? "Respiração",
      content: entry,
    };
    localStorage.setItem("journal", JSON.stringify([newEntry, ...history]));
    setEntry("");
    toast.success("Reflexão salva com sucesso 🌿", {
      duration: 2000,
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
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#FF91AF] flex flex-col items-center justify-center p-6 relative">
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
                    setEntry("");
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
              <div className="z-10 w-full max-w-xl px-4 transition-all duration-500 ease-in-out opacity-100 transform translate-y-0">
                <h2 className="text-2xl font-semibold text-black mb-4">Como você se sente agora?</h2>
                <textarea
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  className="w-full h-40 rounded-xl bg-white/80 text-black p-4 outline-none border border-black/30"
                  placeholder="Escreva livremente, sem julgamento..."
                />
                <div className="flex justify-center w-full">
                  <button
                    onClick={handleSave}
                    className="mt-4 px-6 py-3 bg-white/80 text-[#FF91AF] rounded-xl border border-black/30 hover:bg-white transition"
                  >
                    Salvar reflexão
                  </button>
                </div>
              </div>
              <div className="flex justify-center mt-8 mb-4">
                <button
                  onClick={() => {
                    setSel(null);
                    setCompleted(false);
                    setHasStarted(false);
                    setEntry("");
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