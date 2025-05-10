"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Protocol, useBreathingProtocol } from "@/hooks/useBreathingProtocol";
import { Toaster, toast } from "react-hot-toast";

function LeafIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={props.className}>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 15.25A8.38 8.38 0 0 1 12.62 21 8.38 8.38 0 0 1 3 12.38C3 7.5 7.5 3 12.38 3c2.12 0 4.13.83 5.62 2.31M21 15.25V3m0 12.25H8.75"
      />
    </svg>
  );
}

const PROTOCOLS: Protocol[] = [
  { label: "5 minutos", duration: 5 * 60, inhale: 4, hold: 7, exhale: 8 },
  { label: "15 minutos", duration: 15 * 60, inhale: 4, hold: 7, exhale: 8 },
  { label: "20 minutos", duration: 20 * 60, inhale: 4, hold: 7, exhale: 8 },
];

export default function PanicoPage() {
  const [sel, setSel] = useState<Protocol | null>(null);
  const { timeLeft, phase } = useBreathingProtocol(sel);
  const [completed, setCompleted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [entry, setEntry] = useState("");

  const animationDuration = sel ? sel[phase] : 1;

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
        color: "#2563eb",
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
    <main className="min-h-screen bg-gradient-to-br from-[#1e293b] via-[#2563eb] to-[#60a5fa] flex flex-col items-center justify-center p-6 relative">
      <Toaster />
      {!sel && (
        <div className="absolute left-0 top-[6rem] hidden lg:block z-40">
          <img
            src="/pandasf.png"
            alt="Ilustração de panda"
            className="max-h-[24rem] object-contain opacity-90 transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl"
          />
        </div>
      )}
      {!sel ? (
        <>
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <LeafIcon className="w-7 h-7 text-blue-200" />
              <h1 className="text-2xl font-bold text-blue-100">Escolha um tempo de respiração.</h1>
              <LeafIcon className="w-7 h-7 text-blue-200" />
            </div>
            <p className="mb-4 text-base text-blue-100 font-medium">
              O pânico é uma resposta do corpo, mas ele passa. Você está seguro agora. Respire com calma e escolha um tempo para
              se acalmar.
            </p>
            <div className="flex flex-col md:flex-row md:justify-center md:items-center gap-4 mb-4">
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
            <div className="w-full flex justify-center items-center p-4 bg-[#2563eb]/80 backdrop-blur-md">
              <a
                href="/"
                className="px-6 py-3 text-blue-100 rounded-xl border border-blue-200/20 hover:bg-[#60a5fa]/60 transition"
              >
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
                <h1 className="text-3xl font-semibold text-blue-100 mt-8 md:mt-12 mb-2 text-center">{sel.label} de Respiração</h1>
                <div className="mb-15"></div>
                <p className="mb-8 text-blue-200 text-center">
                  {phase === "inhale" ? "Inspire com calma" : phase === "hold" ? "Segure o ar" : "Expire devagar"}
                </p>
              </div>

              <div className="relative flex items-center justify-center mb-6">
                <motion.div
                  className="absolute"
                  style={{
                    width: "340px",
                    height: "340px",
                    borderRadius: "9999px",
                    pointerEvents: "none",
                    boxShadow: "0 0 80px 20px #60a5fa88, 0 0 160px 60px #2563eb77, 0 0 40px 10px #38bdf899",
                    zIndex: 0,
                  }}
                  animate={{
                    scale: phase === "inhale" || phase === "hold" ? 1.5 : 1.1,
                    opacity: phase === "inhale" || phase === "hold" ? 0.6 : 0.3,
                  }}
                  transition={{ duration: animationDuration, ease: "linear" }}
                />
                <motion.div
                  className="w-60 h-60 bg-white/20 rounded-full flex items-center justify-center text-2xl font-medium text-blue-100 relative z-10 shadow-lg"
                  animate={{
                    scale: phase === "inhale" || phase === "hold" ? 1.4 : 0.8,
                  }}
                  transition={{ duration: animationDuration, ease: "linear" }}
                >
                  {phase === "inhale" ? "Inspire" : phase === "hold" ? "Segure" : "Expire"}
                </motion.div>
              </div>
              <div className="text-xl text-blue-100 mb-6 text-center">
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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="z-10 w-full max-w-xl px-4 transition-all duration-500 ease-in-out opacity-100 transform translate-y-0">
                <h2 className="text-2xl font-semibold text-blue-100 mb-4">Como você se sente agora?</h2>
                <textarea
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  className="w-full h-40 rounded-xl bg-white/10 text-blue-100 p-4 outline-none border border-blue-400/30"
                  placeholder="Escreva livremente, sem julgamento..."
                />
                <div className="flex justify-center w-full">
                  <button
                    onClick={handleSave}
                    className="mt-4 px-6 py-3 bg-white/10 text-blue-100 rounded-xl border border-blue-400/30 hover:bg-white/20 transition"
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