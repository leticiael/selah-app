"use client";
import { useState } from "react";

export default function Sobre() {
  const [zoom, setZoom] = useState(false);

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[#170004] px-0 py-0">
      {/* Fundo decorativo fixo, sem movimento */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, #a9446a33 0%, transparent 80%), radial-gradient(ellipse 60% 40% at 70% 80%, #ffe5ec22 0%, transparent 80%)",
          filter: "blur(32px)",
        }}
      />
      <div className="max-w-2xl mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-10 relative z-10">

        {/* Sobre mim */}
        <section className="transition-all duration-500 bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl px-6 py-12 border border-[#a9446a]/30 flex flex-col items-center hover:bg-white/20 hover:shadow-2xl">
          <div className="overflow-hidden rounded-3xl mb-8" style={{ width: '240px', height: 'auto' }}>
            <img
              src="/coffeme.png"
              alt="Leticia Eltermann"
              className={`w-60 h-auto max-w-full transition-transform duration-700 ease-[cubic-bezier(.4,1.6,.4,1)] ${zoom ? "scale-115" : "scale-100"}`}
              style={{
                objectFit: "contain",
                transition: "transform 0.7s cubic-bezier(.4,1.6,.4,1)",
                willChange: "transform"
              }}
              onMouseEnter={() => setZoom(true)}
              onMouseLeave={() => setZoom(false)}
            />
          </div>
          <h2 className="text-2xl font-bold text-[#ffe5ec] mb-2 tracking-tight">Leticia Eltermann</h2>
          <p className="text-base text-[#ffe5ec] mb-3 text-center leading-relaxed">
            Desenvolvedora apaixonada por tecnologia, literatura, meditação e videogames.<br />
            Crio experiências digitais que acolhem e ajudam pessoas de verdade.
          </p>
          <div className="flex gap-6 mb-4">
            <a href="https://github.com/leticiael" target="_blank" rel="noopener noreferrer" className="text-[#f9d6c1] hover:text-[#a9446a] font-medium underline underline-offset-4 transition">GitHub</a>
            <a href="https://medium.com/@leeltermann" target="_blank" rel="noopener noreferrer" className="text-[#f9d6c1] hover:text-[#a9446a] font-medium underline underline-offset-4 transition">Medium</a>
          </div>
          <p className="text-base text-[#ffe5ec] text-center">
            O Selah é meu <span className="font-semibold text-[#f9d6c1]">projeto integrador do curso de Engenharia de Software (5º período) da UniOpet</span> e também um projeto de vida. Transformei minha experiência pessoal com crises em um lugar digital de acolhimento, feito para ajudar quem precisa de um respiro.
          </p>
        </section>

        {/* Selah */}
        <section className="transition-all duration-500 text-center bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl px-6 py-10 border border-[#a9446a]/30 hover:bg-white/20 hover:shadow-2xl">
          <h1 className="text-3xl font-bold text-[#ffe5ec] mb-3 tracking-tight">Selah: Um Respiro para Você</h1>
          <p className="text-base text-[#f9d6c1] mb-2 leading-relaxed">
            Um espaço minimalista, acolhedor e acessível para quem precisa de um momento de pausa. Ferramentas para respirar, se acalmar e lembrar que não está só.
          </p>
          <p className="text-base text-[#ffe5ec]">
            <strong>Selah</strong> é uma palavra antiga usada em textos poéticos para indicar uma pausa — um convite para respirar, refletir e seguir em frente com mais leveza.
          </p>
        </section>

        {/* O que você encontra */}
        <section className="transition-all duration-500 bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl px-6 py-10 border border-[#a9446a]/30 hover:bg-white/20 hover:shadow-2xl">
          <h2 className="text-lg font-bold text-[#ffe5ec] mb-3">O que você encontra aqui</h2>
          <ul className="list-disc list-inside space-y-2 text-[#f9d6c1] text-base pl-2">
            <li>Animações de respiração guiada em tons suaves</li>
            <li>Mensagens de apoio para momentos difíceis</li>
            <li>Cores de fundo pensadas para ajudar em diferentes emoções</li>
          </ul>
        </section>

        {/* Ciência e Psicologia das Cores */}
        <section className="transition-all duration-500 bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl px-6 py-10 border border-[#a9446a]/30 hover:bg-white/20 hover:shadow-2xl">
          <h2 className="text-lg font-bold text-[#ffe5ec] mb-3">Cores, Animais e Respiração</h2>
          <p className="text-base text-[#f9d6c1] mb-3">
            As escolhas de design do Selah são baseadas em estudos de neurociência e psicologia das cores para criar uma experiência acolhedora.
          </p>
          <h3 className="text-base font-semibold text-[#ffe5ec] mb-1">Por que animais?</h3>
          <p className="text-base text-[#f9d6c1] mb-3">
            Cada animal representa uma emoção e um convite à reconexão com a natureza e o autocuidado.
          </p>
          <h3 className="text-base font-semibold text-[#ffe5ec] mb-1">Psicologia das cores no Selah:</h3>
          <ul className="list-disc list-inside space-y-2 mb-3 pl-4 text-[#f9d6c1] text-base">
            <li><strong className="text-green-300">Verde claro para ansiedade:</strong> relaxamento fisiológico e sensação de calma.</li>
            <li>
              <strong className="text-blue-300">Azul claro para pânico:</strong> efeito tranquilizante e ajuda a acalmar a mente.
              <span className="block text-xs mt-1">
                <a href="https://www.verywellmind.com/the-color-psychology-of-blue-2795815" target="_blank" rel="noopener noreferrer" className="underline text-blue-200">Verywell Mind</a> &nbsp;|&nbsp;
                <a href="https://www.scielo.br/j/pn/a/dx6rZNrDWKmZDQ5dp4dd37G/" target="_blank" rel="noopener noreferrer" className="underline text-blue-200">SciELO</a>
              </span>
            </li>
            <li>
              <strong className="text-pink-200">Rosa pálido para raiva:</strong> pode ajudar a reduzir a tensão emocional.
              <span className="block text-xs mt-1">
                <a href="https://en.wikipedia.org/wiki/Baker-Miller_pink" target="_blank" rel="noopener noreferrer" className="underline text-pink-100">Wikipedia</a>
              </span>
            </li>
            <li><strong className="text-purple-200">Roxo e lilás para acolhimento:</strong> transmitem tranquilidade, introspecção e conforto.</li>
          </ul>
          <h3 className="text-base font-semibold text-[#ffe5ec] mb-1">A importância da respiração guiada:</h3>
          <p className="text-base text-[#f9d6c1]">
            Exercícios de respiração consciente ajudam a regular o sistema nervoso e reduzir o estresse. (<a href="https://www.medicalnewstoday.com/articles/324417" target="_blank" rel="noopener noreferrer" className="underline text-[#ffe5ec]">Medical News Today</a>)
          </p>
        </section>

        {/* Neurociência e artigos */}
        <section className="transition-all duration-500 bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl px-6 py-10 border border-[#a9446a]/30 hover:bg-white/20 hover:shadow-2xl">
          <h2 className="text-lg font-bold text-[#ffe5ec] mb-3">Neurociência, Psicologia das Cores & UX</h2>
          <p className="text-base text-[#f9d6c1] mb-3">
            A neurociência aplicada ao design e à tecnologia ajuda a criar experiências digitais mais intuitivas, agradáveis e acolhedoras.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-2 text-base text-[#f9d6c1] pl-2">
            <li>
              <a href="https://www.frontiersin.org/articles/10.3389/fnins.2021.679627/full" target="_blank" rel="noopener noreferrer" className="underline text-[#ffe5ec]">
                Hierarquia neural na categorização de cores (Frontiers in Neuroscience)
              </a>
            </li>
            <li>
              <a href="https://www.verywellmind.com/the-color-psychology-of-blue-2795815" target="_blank" rel="noopener noreferrer" className="underline text-blue-200">
                Psicologia da cor azul e seus efeitos calmantes (Verywell Mind)
              </a>
            </li>
            <li>
              <a href="https://www.psychologytoday.com/us/blog/your-personal-renaissance/201810/surprising-research-on-the-color-blue" target="_blank" rel="noopener noreferrer" className="underline text-blue-200">
                Pesquisas sobre o impacto do azul no comportamento (Psychology Today)
              </a>
            </li>
            <li>
              <a href="https://www.grandrisingbehavioralhealth.com/blog/the-impact-of-color-on-mood-and-mental-health" target="_blank" rel="noopener noreferrer" className="underline text-[#ffe5ec]">
                Impacto das cores no humor e na saúde mental (Grand Rising Behavioral Health)
              </a>
            </li>
            <li>
              <a href="https://templescounsel.com/the-impact-of-color-psychology-on-mental-health-a-spectrum-of-emotions/" target="_blank" rel="noopener noreferrer" className="underline text-[#ffe5ec]">
                Psicologia das cores e sua influência na saúde mental (Temple's Counsel)
              </a>
            </li>
            <li>
              <a href="https://www.neurosciencenews.com/color-perception-vision-26121/" target="_blank" rel="noopener noreferrer" className="underline text-[#ffe5ec]">
                Circuitos cerebrais relacionados à percepção de cores (Neuroscience News)
              </a>
            </li>
            <li>
              <a href="https://www.jneurosci.org/content/30/45/14955" target="_blank" rel="noopener noreferrer" className="underline text-[#ffe5ec]">
                Avanços na ciência das cores: da retina ao comportamento (Journal of Neuroscience)
              </a>
            </li>
          </ul>
        </section>

        {/* Tipos de respiração e ciência dos protocolos */}
        <section className="transition-all duration-500 bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl px-6 py-10 border border-[#a9446a]/30 hover:bg-white/20 hover:shadow-2xl">
          <h2 className="text-lg font-bold text-[#ffe5ec] mb-3">Tipos de Respiração no Selah</h2>
          <ul className="list-disc list-inside space-y-2 text-[#f9d6c1] text-base pl-2 mb-4">
            <li>
              <span className="font-semibold text-green-200">4-6 (Ansiedade):</span> Inspire por 4 segundos, expire por 6 segundos.<br />
              <span className="text-xs text-[#ffe5ec]">Baseado em estudos que mostram que expirações mais longas ativam o sistema parassimpático, promovendo relaxamento e redução da ansiedade.</span>
              <a href="https://www.health.harvard.edu/mind-and-mood/relaxation-techniques-breath-control-helps-quell-errant-stress-response" target="_blank" rel="noopener noreferrer" className="block underline text-green-100 mt-1">Harvard Health</a>
            </li>
            <li>
              <span className="font-semibold text-blue-200">4-7-8 (Pânico):</span> Inspire por 4s, segure 7s, expire por 8s.<br />
              <span className="text-xs text-[#ffe5ec]">A técnica 4-7-8 foi desenvolvida pelo Dr. Andrew Weil e comprovada para acalmar o sistema nervoso rapidamente, sendo indicada para crises de pânico e insônia.</span>
              <a href="https://www.medicalnewstoday.com/articles/324417" target="_blank" rel="noopener noreferrer" className="block underline text-blue-100 mt-1">Medical News Today</a>
            </li>
            <li>
              <span className="font-semibold text-pink-200">4-8 (Raiva):</span> Inspire por 4 segundos, expire por 8 segundos.<br />
              <span className="text-xs text-[#ffe5ec]">Expirações longas ajudam a reduzir a ativação fisiológica da raiva, diminuindo a frequência cardíaca e promovendo calma.</span>
              <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6137615/" target="_blank" rel="noopener noreferrer" className="block underline text-pink-100 mt-1">NCBI - Estudo sobre respiração lenta</a>
            </li>
            <li>
              <span className="font-semibold text-purple-200">4-6 (Medo):</span> Inspire por 4 segundos, expire por 6 segundos.<br />
              <span className="text-xs text-[#ffe5ec]">Respiração controlada reduz o estado de alerta do corpo, ajudando a sair do modo de luta ou fuga.</span>
              <a href="https://www.psychologytoday.com/us/blog/urban-survival/202204/slow-breathing-exercise-can-reduce-stress-and-anxiety" target="_blank" rel="noopener noreferrer" className="block underline text-purple-100 mt-1">Psychology Today</a>
            </li>
          </ul>
          <p className="text-base text-[#ffe5ec] text-center">
            <span className="font-semibold text-[#f9d6c1]">Por que esses protocolos?</span><br />
            Cada protocolo foi escolhido com base em evidências científicas para atuar diretamente nos sintomas físicos de cada emoção, ajudando a regular o sistema nervoso e proporcionando alívio real em poucos minutos.
          </p>
        </section>

        {/* Como foi construído */}
        <section className="transition-all duration-500 bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl px-6 py-10 border border-[#f9d6c1]/30 hover:bg-white/20 hover:shadow-2xl">
          <h2 className="text-lg font-bold text-[#ffe5ec] mb-2">Como o Selah foi construído</h2>
          <p className="text-base text-[#f9d6c1]">
            Desenvolvido com <span className="font-semibold text-[#ffe5ec]">Next.js</span>, <span className="font-semibold text-[#ffe5ec]">Tailwind CSS</span>, animações SVG e Framer Motion. Código aberto no <a href="https://github.com/leticiael" target="_blank" rel="noopener noreferrer" className="underline text-[#f9d6c1]">GitHub</a>.
          </p>
        </section>

        {/* Mensagem final */}
        <div className="transition-all duration-500 text-center bg-white/10 backdrop-blur-xl rounded-3xl shadow-xl px-6 py-10 border border-[#f9d6c1]/30 hover:bg-white/20 hover:shadow-2xl">
          <p className="text-md italic text-[#ffe5ec]">
            Espero que o Selah te traga um respiro, um momento de paz, e te ajude a encontrar seu ritmo novamente.
          </p>
          <a
            href="/"
            className="inline-block mt-8 px-6 py-3 text-[#170004] bg-[#ffe5ec] rounded-xl border border-[#f9d6c1]/40 hover:bg-[#f9d6c1] transition font-semibold"
          >
            Voltar para início
          </a>
        </div>
      </div>
      {/* Estilos para o efeito de zoom suave */}
      <style>{`
        .scale-100 { transform: scale(1); }
        .scale-115 { transform: scale(1.15); }
      `}</style>
    </main>
  );
}