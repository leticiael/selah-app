"use client";
import { useState } from "react";

export default function Sobre() {
  const [zoom, setZoom] = useState(false);

  function handleBack() {
    if (typeof window !== "undefined") window.history.back();
  }

  return (
    <main
      className="relative min-h-screen w-full flex flex-col items-center justify-center font-sans"
      style={{ backgroundColor: "#9B7D61" }}
    >
      <button
        onClick={handleBack}
        className="fixed top-6 left-6 z-50 w-12 h-12 rounded-full bg-white/80 shadow-lg flex items-center justify-center border border-[#a9446a]/30 hover:bg-[#ffe5ec] transition"
        aria-label="Voltar"
        style={{ color: "#3e1f0d" }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path d="M17.5 21L11 14L17.5 7" stroke="#3e1f0d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
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
        <section className="rounded-3xl shadow-xl px-6 py-8 border border-[#a9446a]/20 bg-white/10 backdrop-blur-md flex flex-col items-center hover:bg-white/20 transition">
         <div className="overflow-hidden rounded-3xl mb-6" style={{ width: 160 }}>
  <img
    src="/coffeme.png"
    alt="Leticia Eltermann"
    className={`w-40 h-auto max-w-full transition-transform duration-500 ${zoom ? "scale-110" : "scale-100"}`}
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
          <h2 className="text-lg font-bold text-black mb-1 tracking-tight">Leticia Eltermann</h2>
          <p className="text-sm text-[#ffe5ec] mb-2 text-center leading-relaxed">
            Desenvolvedora apaixonada por tecnologia, literatura, meditação e videogames.<br />
            Crio experiências digitais que acolhem e ajudam pessoas de verdade.
          </p>
          <div className="flex gap-4 mb-2">
            <a href="https://github.com/leticiael" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#a9446a] underline underline-offset-4 transition">GitHub</a>
            <a href="https://medium.com/@leeltermann" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#a9446a] underline underline-offset-4 transition">Medium</a>
            <a href="https://www.linkedin.com/in/leticiaeltermann/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-[#a9446a] underline underline-offset-4 transition">LinkedIn</a>
          </div>
          <p className="text-xs text-[#ffe5ec] text-center">
            O Selah é meu <span className="font-semibold text-[#f9d6c1]">projeto integrador do curso de Engenharia de Software (5º período) da UniOpet</span> e também um projeto de vida.
          </p>
        </section>

<section className="rounded-3xl shadow-xl px-6 py-6 border border-[#a9446a]/20 bg-white/10 backdrop-blur-md text-center hover:bg-white/20 transition">
  <h1 className="text-xl font-bold text-black mb-2 tracking-tight">Selah: Um Respiro para Você</h1>
  <p className="text-base mb-2 leading-relaxed text-neutral-800">
    Selah é uma palavra antiga, encontrada em textos poéticos, que marca o momento de uma pausa — um convite para respirar, refletir e seguir em frente com mais leveza. Para mim, esse significado ganhou ainda mais força depois de viver muitas crises de saúde mental e momentos em que tudo parecia pesado demais.
  </p>
  <p className="text-base text-neutral-700">
    Por isso, criei o Selah: para ser um espaço de acolhimento real, feito para quem precisa de um respiro nos dias difíceis. Aqui você encontra ferramentas, mensagens e cores pensadas para te ajudar a atravessar a tempestade. Você não está só. Pausar é necessário, e pedir ajuda é um ato de coragem.
  </p>
</section>
        <section className="rounded-3xl shadow-xl px-6 py-6 border border-[#a9446a]/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition">
          <h2 className="text-base font-bold text-black mb-2">O que você encontra aqui</h2>
          <ul className="list-disc list-inside space-y-1 text-[#f9d6c1] text-sm pl-2">
            <li>Animações de respiração guiada em tons suaves</li>
            <li>Mensagens de apoio para momentos difíceis</li>
            <li>Cores de fundo pensadas para ajudar em diferentes emoções</li>
            <li>Referências científicas e links úteis para autocuidado</li>
          </ul>
        </section>

        <section className="rounded-3xl shadow-xl px-6 py-6 border border-[#a9446a]/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition">
          <h2 className="text-base font-bold text-black mb-2">Cores, Animais e Respiração</h2>
          <ul className="list-disc list-inside space-y-1 mb-2 pl-4 text-[#f9d6c1] text-sm text-left">
            <li><strong className="text-green-300">Verde claro para ansiedade:</strong> relaxamento fisiológico e sensação de calma.</li>
            <li><strong className="text-blue-300">Azul claro para pânico:</strong> efeito tranquilizante e ajuda a acalmar a mente.</li>
            <li><strong className="text-pink-200">Rosa pálido para raiva:</strong> pode ajudar a reduzir a tensão emocional.</li>
            <li><strong className="text-purple-200">Roxo e lilás para acolhimento:</strong> transmitem tranquilidade, introspecção e conforto.</li>
          </ul>
          <p className="text-xs text-[#ffe5ec]">
            Cada animal representa uma emoção e um convite à reconexão com a natureza e o autocuidado.
          </p>
          <div className="mt-3 flex flex-wrap gap-4 justify-center">
            <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6075835/" target="_blank" rel="noopener noreferrer" className="text-black underline underline-offset-4 hover:text-[#a9446a] text-xs">Estudo: Psicologia das Cores</a>
            <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5455070/" target="_blank" rel="noopener noreferrer" className="text-black underline underline-offset-4 hover:text-[#a9446a] text-xs">Respiração e Sistema Nervoso</a>
            <a href="https://www.ted.com/talks/andy_puddicombe_all_it_takes_is_10_mindful_minutes" target="_blank" rel="noopener noreferrer" className="text-black underline underline-offset-4 hover:text-[#a9446a] text-xs">TED: 10 Mindful Minutes</a>
          </div>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>
              <a href="https://www.frontiersin.org/articles/10.3389/fpsyg.2015.00368/full" target="_blank" rel="noopener noreferrer" className="underline text-black">
                Revisão sobre a influência das cores no funcionamento psicológico (Frontiers in Psychology)
              </a>
            </li>
            <li>
              <a href="https://www.frontiersin.org/articles/10.3389/fnins.2021.679627/full" target="_blank" rel="noopener noreferrer" className="underline text-black">
                Estudo sobre a hierarquia neural na categorização de cores (Frontiers in Neuroscience)
              </a>
            </li>
            <li>
              <a href="https://www.verywellmind.com/the-color-psychology-of-blue-2795815" target="_blank" rel="noopener noreferrer" className="underline text-black">
                Psicologia da cor azul e seus efeitos calmantes (Verywell Mind)
              </a>
            </li>
            <li>
              <a href="https://www.psychologytoday.com/us/blog/your-personal-renaissance/201810/surprising-research-on-the-color-blue" target="_blank" rel="noopener noreferrer" className="underline text-black">
                Pesquisas sobre o impacto do azul no comportamento (Psychology Today)
              </a>
            </li>
            <li>
              <a href="https://www.grandrisingbehavioralhealth.com/blog/the-impact-of-color-on-mood-and-mental-health" target="_blank" rel="noopener noreferrer" className="underline text-black">
                Impacto das cores no humor e na saúde mental (Grand Rising Behavioral Health)
              </a>
            </li>
            <li>
              <a href="https://templescounsel.com/the-impact-of-color-psychology-on-mental-health-a-spectrum-of-emotions/" target="_blank" rel="noopener noreferrer" className="underline text-black">
                Psicologia das cores e sua influência na saúde mental (Temple's Counsel)
              </a>
            </li>
            <li>
              <a href="https://www.neurosciencenews.com/color-perception-vision-26121/" target="_blank" rel="noopener noreferrer" className="underline text-black">
                Circuitos cerebrais relacionados à percepção de cores (Neuroscience News)
              </a>
            </li>
            <li>
              <a href="https://www.jneurosci.org/content/30/45/14955" target="_blank" rel="noopener noreferrer" className="underline text-black">
                Avanços na ciência das cores: da retina ao comportamento (Journal of Neuroscience)
              </a>
            </li>
          </ul>
        </section>

        <section className="rounded-3xl shadow-xl px-6 py-6 border border-[#a9446a]/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition">
          <h2 className="text-base font-bold text-black mb-2">Tipos de Respiração no Selah</h2>
          <ul className="list-disc list-inside space-y-1 text-[#f9d6c1] text-sm pl-2 mb-2">
            <li><span className="font-semibold text-green-200">4-6 (Ansiedade):</span> Inspire por 4s, expire por 6s.</li>
            <li><span className="font-semibold text-blue-200">4-7-8 (Pânico):</span> Inspire 4s, segure 7s, expire 8s.</li>
            <li><span className="font-semibold text-pink-200">4-8 (Raiva):</span> Inspire 4s, expire 8s.</li>
            <li><span className="font-semibold text-purple-200">4-6 (Medo):</span> Inspire 4s, expire 6s.</li>
          </ul>
          <p className="text-xs text-[#ffe5ec] text-center">
            Protocolos escolhidos com base em evidências científicas para atuar nos sintomas físicos de cada emoção.
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2">
            <li>
              <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5455070/" target="_blank" rel="noopener noreferrer" className="underline text-black">
                Respiração lenta e sistema nervoso autônomo (PMC)
              </a>
            </li>
            <li>
              <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6137615/" target="_blank" rel="noopener noreferrer" className="underline text-black">
                Efeitos da respiração controlada na ansiedade (PMC)
              </a>
            </li>
            <li>
              <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5709795/" target="_blank" rel="noopener noreferrer" className="underline text-black">
                Respiração e regulação emocional (PMC)
              </a>
            </li>
            <li>
              <a href="https://www.frontiersin.org/articles/10.3389/fpsyg.2017.00874/full" target="_blank" rel="noopener noreferrer" className="underline text-black">
                Revisão sobre técnicas de respiração e saúde mental (Frontiers in Psychology)
              </a>
            </li>
            <li>
              <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5455070/" target="_blank" rel="noopener noreferrer" className="underline text-black">
                Revisão: Respiração lenta e relaxamento (PMC)
              </a>
            </li>
          </ul>
        </section>

        <section className="rounded-3xl shadow-xl px-6 py-6 border border-[#f9d6c1]/20 bg-white/10 backdrop-blur-md hover:bg-white/20 transition">
          <h2 className="text-base font-bold text-black mb-2">Como o Selah foi construído</h2>
          <p className="text-sm text-[#f9d6c1]">
            Desenvolvido com <span className="font-semibold text-[#ffe5ec]">Next.js</span>, <span className="font-semibold text-[#ffe5ec]">Tailwind CSS</span>, animações SVG e Framer Motion. Código aberto no <a href="https://github.com/leticiael" target="_blank" rel="noopener noreferrer" className="underline text-black">GitHub</a>.
          </p>
          <div className="mt-3 flex flex-wrap gap-4 justify-center">
            <a href="https://nextjs.org/" target="_blank" rel="noopener noreferrer" className="text-black underline underline-offset-4 hover:text-[#a9446a] text-xs">Next.js</a>
            <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer" className="text-black underline underline-offset-4 hover:text-[#a9446a] text-xs">Tailwind CSS</a>
            <a href="https://www.framer.com/motion/" target="_blank" rel="noopener noreferrer" className="text-black underline underline-offset-4 hover:text-[#a9446a] text-xs">Framer Motion</a>
          </div>
        </section>

        <div className="text-center bg-white/10 backdrop-blur-md rounded-3xl shadow-xl px-6 py-6 border border-[#f9d6c1]/20 hover:bg-white/20 transition">
          <p className="text-sm italic text-[#ffe5ec]">
            Espero que o Selah te traga um respiro, um momento de paz, e te ajude a encontrar seu ritmo novamente.
          </p>
        </div>
      </div>
      <style>{`
        .scale-100 { transform: scale(1); }
        .scale-110 { transform: scale(1.10); }
      `}</style>
    </main>
  );
}