"use client";
import { useState } from "react";
import { CloudIcon, FireIcon, MapIcon, MoonIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Home() {
  const [blurActive, setBlurActive] = useState(false);

  return (
    <main
      className="min-h-screen text-selah-text flex flex-col items-center relative px-[1rem] overflow-hidden"
      style={{ backgroundColor: "#9B7D61" }}
    >
      {blurActive && (
        <div className="fixed inset-0 z-30 bg-black/10 backdrop-blur-[6px] transition-all duration-300 pointer-events-none"></div>
      )}

      <div className="mt-[2rem] text-selah-soft text-[1.5rem] animate-fade-in text-center z-40 relative">
        <svg
          className="mt-[2rem] w-full h-[6rem] z-40 relative"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="none"
            stroke="#3b2a22"
            strokeWidth="3"
            d="M0,160 Q120,60 240,160 T480,160 T720,160 T960,160 T1200,160 T1440,160"
          >
            <animate
              attributeName="d"
              dur="2.5s"
              repeatCount="indefinite"
              values="
                  M0,160 Q120,60 240,160 T480,160 T720,160 T960,160 T1200,160 T1440,160;
                  M0,160 Q120,260 240,160 T480,160 T720,160 T960,160 T1200,160 T1440,160;
                  M0,160 Q120,60 240,160 T480,160 T720,160 T960,160 T1200,160 T1440,160
                "
            />
          </path>
        </svg>
        <span className="font-bold text-[2rem] text-selah-soft">Bem vindo</span> ao <span className="text-black">SELAH.</span>
      </div>

      <div className="w-full flex flex-col lg:flex-row items-center justify-center relative mt-[4rem] mb-[4rem]">
        <div className="hidden lg:flex flex-col justify-center items-center mr-8">
          <img
            src="/images/cervo.png"
            alt="Ilustração de cervo"
            className="max-h-[28rem] object-contain opacity-90 transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl cursor-pointer"
            onMouseEnter={() => setBlurActive(true)}
            onMouseLeave={() => setBlurActive(false)}
          />
        </div>
        <section className="relative bg-selah-card/70 backdrop-blur-xl rounded-[2rem] p-[3rem] max-w-[48rem] text-center shadow-md z-40 overflow-hidden w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-selah-soft/10 via-white/20 to-selah-soft/10 animate-calm pointer-events-none"></div>
          <h1 className="text-[2.5rem] font-bold mb-[1.5rem] relative">
            <span className="text-black">Respire,</span> <span className="text-selah-soft">você está seguro.</span>
          </h1>
          <p className="text-[1.25rem] mb-[2.5rem] text-black relative leading-relaxed">
            Escolha a emoção que mais parece com a que você está sentindo.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1.5rem] justify-center mb-[2.5rem] relative">
            {[
              { label: "Pânico", path: "/respiracao/panico", icon: <CloudIcon className="h-[2rem] w-[2rem] text-black" /> },
              { label: "Ansiedade", path: "/respiracao/ansiedade", icon: <MapIcon className="h-[2rem] w-[2rem] text-black" /> },
              { label: "Raiva", path: "/respiracao/raiva", icon: <FireIcon className="h-[2rem] w-[2rem] text-black" /> },
              { label: "Medo", path: "/respiracao/medo", icon: <MoonIcon className="h-[2rem] w-[2rem] text-black" /> },
            ].map(({ label, path, icon }) => (
              <Link
                key={label}
                href={path}
                className="bg-selah-button/90 text-selah-text py-[1rem] px-[1.5rem] rounded-[1rem] border-[0.125rem] border-selah-soft shadow hover:bg-selah-button/70 hover:scale-105 transition flex items-center justify-center gap-[0.75rem]"
              >
                {icon}
                <span className="text-[1.125rem] font-medium">{label}</span>
              </Link>
            ))}
          </div>
          <div className="w-full flex justify-center my-4">
            <Link
              href="/respiracao/respire"
              className="bg-selah-button/90 text-selah-text py-[1rem] px-[1.5rem] rounded-[1rem] border-[0.125rem] border-selah-soft shadow hover:bg-selah-button/70 hover:scale-105 transition flex items-center justify-center gap-[0.75rem] w-full sm:w-auto text-[1.125rem] font-medium"
            >
              Apenas quero respirar
            </Link>
          </div>
          <p className="text-[1rem] italic relative text-selah-soft">
            (Não se preocupe muito com isso, todas foram pensadas para te ajudar.)
          </p>
        </section>
      </div>

      <svg
        className="mt-[2rem] w-full h-[6rem] z-40 relative"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="none"
          stroke="#3b2a22"
          strokeWidth="3"
          d="M0,160 Q120,60 240,160 T480,160 T720,160 T960,160 T1200,160 T1440,160"
        >
          <animate
            attributeName="d"
            dur="2.5s"
            repeatCount="indefinite"
            values="
                M0,160 Q120,60 240,160 T480,160 T720,160 T960,160 T1200,160 T1440,160;
                M0,160 Q120,260 240,160 T480,160 T720,160 T960,160 T1200,160 T1440,160;
                M0,160 Q120,60 240,160 T480,160 T720,160 T960,160 T1200,160 T1440,160
              "
          />
        </path>
      </svg>

      <footer className="w-full bg-selah-card/50 backdrop-blur-md rounded-t-[2rem] p-[2.5rem] text-center shadow-md z-40 mt-[2.5rem] relative flex flex-col items-center">
        <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-10">
          <div className="flex-shrink-0 flex items-center justify-center mb-6 lg:mb-0">
            <img
              src="/images/grua.png"
              alt="Ilustração de garça"
              className="h-[22rem] w-auto object-contain opacity-90 transition-all duration-300 hover:scale-110 hover:drop-shadow-2xl cursor-pointer"
              style={{ minWidth: "12rem" }}
              onMouseEnter={() => setBlurActive(true)}
              onMouseLeave={() => setBlurActive(false)}
            />
          </div>
          <div className="flex-1 w-full">
            <h2 className="text-[2rem] font-bold mb-[1.5rem] text-black">Explore mais</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-[1.5rem]">
              <Link
                href="/poesias"
                className="bg-selah-button/80 text-selah-text py-[1.25rem] px-[1.5rem] rounded-[0.75rem] border-[0.125rem] border-selah-soft shadow hover:bg-selah-button/60 hover:scale-105 transition text-lg font-medium"
              >
                Poesias que acalmam
              </Link>
              <Link
                href="/sobre"
                className="bg-selah-button/80 text-selah-text py-[1.25rem] px-[1.5rem] rounded-[0.75rem] border-[0.125rem] border-selah-soft shadow hover:bg-selah-button/60 hover:scale-105 transition text-lg font-medium"
              >
                História do Selah
              </Link>
              <a
                href="https://www.cvv.org.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-selah-button/80 text-selah-text py-[1.25rem] px-[1.5rem] rounded-[0.75rem] border-[0.125rem] border-selah-soft shadow hover:bg-selah-button/60 hover:scale-105 transition text-lg font-medium"
              >
                CVV Brasil - Ligue 188
              </a>
            </div>
          </div>
        </div>
        <svg
          className="mt-[2rem] w-full h-[6rem] z-40 relative"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="none"
            stroke="#3b2a22"
            strokeWidth="3"
            d="M0,160 Q120,60 240,160 T480,160 T720,160 T960,160 T1200,160 T1440,160"
          >
            <animate
              attributeName="d"
              dur="2.5s"
              repeatCount="indefinite"
              values="
                  M0,160 Q120,60 240,160 T480,160 T720,160 T960,160 T1200,160 T1440,160;
                  M0,160 Q120,260 240,160 T480,160 T720,160 T960,160 T1200,160 T1440,160;
                  M0,160 Q120,60 240,160 T480,160 T720,160 T960,160 T1200,160 T1440,160
                "
            />
          </path>
        </svg>
        <p className="text-[1.15rem] text-black text-selah-soft mt-[2.5rem] mb-[1.5rem]">
          Obrigada por nos escolher, desenvolvido por Leticia Eltermann <span className="heart">❤️</span>
        </p>
      </footer>
    </main>
  );
}