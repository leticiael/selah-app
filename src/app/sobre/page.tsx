"use client";
import { useState } from "react";

export default function Sobre() {
  const [zoom, setZoom] = useState(false);

  return (
    <main
      className="relative min-h-screen w-full flex flex-col items-center justify-center"
      style={{ backgroundColor: "#9B7D61" }}
    >
      {/* Fundo decorativo leve */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #a9446a22 0%, transparent 80%)",
          filter: "blur(28px)",
        }}
      />
      <div className="max-w-2xl mx-auto px-4 sm:px-8 py-10 sm:py-16 space-y-8 relative z-10">
        {/* Sobre mim */}
        <section className="rounded-3xl shadow-xl px-6 py-8 border border-[#a9446a]/20 bg-white/10 backdrop-blur-md flex flex-col items-center hover:bg-white/20 transition">
          <div className="overflow-hidden rounded-3xl mb-6" style={{ width: 120 }}>
            <img
              src="/coffeme.png"
              alt="Leticia Eltermann"
              className={`w-28 h-auto max-w-full transition-transform duration-500 ${zoom ? "scale-110" : "scale-100"}`}
              style={{
                objectFit: "contain",
                transition: "transform 0.5s cubic-bezier(.4,1.6,.4,1)",
                willChange: "transform",
              }}
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
              loading="lazy"
            />
          </div>
          <h2 className="text-lg font-bold text-[#ffe5ec] mb-1 tracking-tight">Leticia Eltermann</h2>
          <p className="text-sm text-[#ffe5ec] mb-2 text-center leading-relaxed">
            Desenvolvedora apaixonada por tecnologia, literatura, meditação e videogames.<br />
            Crio experiências digitais que acolhem e ajudam pessoas de verdade.
          </p>
          <div className="flex gap-4 mb-2">
            <a href="https://github.com/leticiael" target="_blank" rel="noopener noreferrer" className="text-[#f9d6c1] hover:text-[#a9446a] underline underline-offset-4 transition">GitHub</a>
            <a href="https://medium.com/@leeltermann" target="_blank" rel="noopener noreferrer" className="text-[#f9d6c1] hover:text-[#a9446a] underline underline-offset-4 transition">Medium</a>
          </div>
          <p className="text-xs text-[#ffe5ec] text-center">
            O Selah é meu <span className="font-semibold text-[#f9d6c1]">projeto integrador do curso de Engenharia de Software (5º período) da UniOpet</span> e também um projeto de vida.
          </p>
        </section>

        {/* Selah */}
        <section className="rounded-3xl shadow-xl px-6 py-6 border border-[#a9446a]/20 bg-white/10 backdrop-blur-md text-center hover:bg-white/20 transition">
          <h1 className="text-xl font-bold text-[#ffe5ec] mb-2 tracking-tight">Selah: Um Respiro para Você</h1>
          <p className="text-sm text-[#f9d6c1] mb-2 leading-relaxed">
            Um espaço minimalista, acolhedor e acessível para quem precisa de um momento de pausa. Ferramentas para respirar, se acalmar e lembrar que não está só.
          </p>
          <p className="text-sm text-[#ffe5ec]">
            <strong>Selah</strong> é uma palavra antiga usada em textos poéticos para indicar uma pausa — um convite para respirar, refletir e seguir em frente com mais leveza.
          </p>
        </section>

        {/* O que você encontra */}
        <section className="rounded-3xl shadow-xl px-6 py-6 border border-[#a9446a]/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition">
          <h2 className="text-base font-bold text-[#ffe5ec] mb-2">O que você encontra aqui</h2>
          <ul className="list-disc list-inside space-y-1 text-[#f9d6c1] text-sm pl-2">
            <li>Animações de respiração guiada em tons suaves</li>
            <li>Mensagens de apoio para momentos difíceis</li>
            <li>Cores de fundo pensadas para ajudar em diferentes emoções</li>
          </ul>
        </section>

        {/* Ciência e Psicologia das Cores */}
        <section className="rounded-3xl shadow-xl px-6 py-6 border border-[#a9446a]/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition">
          <h2 className="text-base font-bold text-[#ffe5ec] mb-2">Cores, Animais e Respiração</h2>
          <ul className="list-disc list-inside space-y-1 mb-2 pl-4 text-[#f9d6c1] text-sm text-left">
            <li><strong className="text-green-300">Verde claro para ansiedade:</strong> relaxamento fisiológico e sensação de calma.</li>
            <li><strong className="text-blue-300">Azul claro para pânico:</strong> efeito tranquilizante e ajuda a acalmar a mente.</li>
            <li><strong className="text-pink-200">Rosa pálido para raiva:</strong> pode ajudar a reduzir a tensão emocional.</li>
            <li><strong className="text-purple-200">Roxo e lilás para acolhimento:</strong> transmitem tranquilidade, introspecção e conforto.</li>
          </ul>
          <p className="text-xs text-[#ffe5ec]">
            Cada animal representa uma emoção e um convite à reconexão com a natureza e o autocuidado.
          </p>
        </section>

        {/* Tipos de respiração */}
        <section className="rounded-3xl shadow-xl px-6 py-6 border border-[#a9446a]/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition">
          <h2 className="text-base font-bold text-[#ffe5ec] mb-2">Tipos de Respiração no Selah</h2>
          <ul className="list-disc list-inside space-y-1 text-[#f9d6c1] text-sm pl-2 mb-2">
            <li><span className="font-semibold text-green-200">4-6 (Ansiedade):</span> Inspire por 4s, expire por 6s.</li>
            <li><span className="font-semibold text-blue-200">4-7-8 (Pânico):</span> Inspire 4s, segure 7s, expire 8s.</li>
            <li><span className="font-semibold text-pink-200">4-8 (Raiva):</span> Inspire 4s, expire 8s.</li>
            <li><span className="font-semibold text-purple-200">4-6 (Medo):</span> Inspire 4s, expire 6s.</li>
          </ul>
          <p className="text-xs text-[#ffe5ec] text-center">
            Protocolos escolhidos com base em evidências científicas para atuar nos sintomas físicos de cada emoção.
          </p>
        </section>

        {/* Como foi construído */}
        <section className="rounded-3xl shadow-xl px-6 py-6 border border-[#f9d6c1]/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition">
          <h2 className="text-base font-bold text-[#ffe5ec] mb-2">Como o Selah foi construído</h2>
          <p className="text-sm text-[#f9d6c1]">
            Desenvolvido com <span className="font-semibold text-[#ffe5ec]">Next.js</span>, <span className="font-semibold text-[#ffe5ec]">Tailwind CSS</span>, animações SVG e Framer Motion. Código aberto no <a href="https://github.com/leticiael" target="_blank" rel="noopener noreferrer" className="underline text-[#f9d6c1]">GitHub</a>.
          </p>
        </section>

        {/* Mensagem final */}
        <div className="text-center bg-white/10 backdrop-blur-md rounded-3xl shadow-xl px-6 py-6 border border-[#f9d6c1]/20 hover:bg-white/20 transition">
          <p className="text-sm italic text-[#ffe5ec]">
            Espero que o Selah te traga um respiro, um momento de paz, e te ajude a encontrar seu ritmo novamente.
          </p>
          <a
            href="/"
            className="inline-block mt-6 px-6 py-3 text-[#170004] bg-[#ffe5ec] rounded-xl border border-[#f9d6c1]/30 hover:bg-[#f9d6c1] transition font-semibold"
          >
            Voltar para início
          </a>
        </div>
      </div>
      <style>{`
        .scale-100 { transform: scale(1); }
        .scale-110 { transform: scale(1.10); }
      `}</style>
    </main>
  );
}