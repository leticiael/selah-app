"use client";
export default function Sobre() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden flex flex-col items-center justify-center px-0 py-0">
      <div
        className="fixed inset-0 -z-10 animate-gradient-move"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, #7b294e 0%, #a9446a 60%, #f9d6c1 100%), radial-gradient(ellipse 60% 40% at 30% 70%, #ffe5ec 0%, #ffe5ec 80%, transparent 100%)",
          filter: "blur(40px)",
          transition: "background 1s",
        }}
      />
      <div className="max-w-3xl mx-auto px-2 sm:px-6 py-10 sm:py-16 space-y-10">

        {/* Sobre mim */}
        <section className="bg-white/80 backdrop-blur-2xl rounded-2xl shadow-xl px-4 py-8 border border-[#a9446a]/40 flex flex-col items-center">
          <div className="overflow-hidden mb-4 w-full flex justify-center">
            <img
              src="/leticia.png"
              alt="Leticia Eltermann"
              className="max-w-xs w-full h-auto transition-transform duration-500 ease-in-out hover:scale-150"
              style={{ display: "block" }}
            />
          </div>
          <h2 className="text-xl font-bold text-[#7b294e] mb-1">Leticia Eltermann</h2>
          <p className="text-base text-[#4b2236] mb-2 text-center">
            Desenvolvedora apaixonada por tecnologia, literatura, meditação e videogames. Crio experiências digitais que acolhem e ajudam pessoas de verdade.
          </p>
          <div className="flex gap-4 mb-2">
            <a href="https://github.com/leticiael" target="_blank" rel="noopener noreferrer" className="underline text-[#7b294e]">GitHub</a>
            <a href="https://medium.com/@leeltermann" target="_blank" rel="noopener noreferrer" className="underline text-[#7b294e]">Medium</a>
          </div>
          <p className="text-base text-[#4b2236] text-center">
            O Selah é meu <span className="font-semibold text-[#a9446a]">projeto integrador do curso de Engenharia de Software (5º período) da faculdade UniOpet</span>, mas também é um projeto de vida. Transformei minha experiência pessoal com crises em um lugar digital de acolhimento, feito para ajudar quem precisa de um respiro.
          </p>
        </section>

        {/* Selah */}
        <section className="text-center bg-white/80 backdrop-blur-2xl rounded-2xl shadow-xl px-4 py-8 border border-[#a9446a]/40">
          <h1 className="text-3xl font-bold text-[#7b294e] mb-2 drop-shadow-lg">Selah: Um Respiro para Você</h1>
          <p className="text-base text-[#4b2236] mb-2">
            Um espaço simples, acolhedor e acessível para quem precisa de um momento de pausa. Ferramentas para respirar, se acalmar e lembrar que não está só.
          </p>
          <p className="text-base text-[#a9446a]">
            <strong className="text-[#7b294e]">Selah</strong> é uma palavra antiga usada em textos poéticos para indicar uma pausa — um convite para respirar, refletir e seguir em frente com mais leveza.
          </p>
        </section>

        {/* O que você encontra */}
        <section className="bg-white/80 backdrop-blur-2xl rounded-2xl shadow-xl px-4 py-8 border border-[#a9446a]/40">
          <h2 className="text-xl font-bold text-[#7b294e] mb-2">O que você encontra aqui</h2>
          <ul className="list-disc list-inside space-y-1 text-[#4b2236] text-base">
            <li>Animações de respiração guiada em tons suaves e quentes</li>
            <li>Mensagens de apoio para momentos difíceis</li>
            <li>Cores de fundo pensadas para ajudar em diferentes emoções</li>
          </ul>
        </section>

        {/* Ciência e Psicologia das Cores */}
        <section className="bg-white/80 backdrop-blur-2xl rounded-2xl shadow-xl px-4 py-8 border border-[#a9446a]/40">
          <h2 className="text-xl font-bold text-[#7b294e] mb-3">Cores, Animais e Respiração</h2>
          <p className="text-base text-[#4b2236] mb-3">
            As escolhas de design do Selah são baseadas em estudos de neurociência e psicologia das cores para criar uma experiência acolhedora.
          </p>
          <h3 className="text-base font-semibold text-[#7b294e] mb-1">Por que animais?</h3>
          <p className="text-base text-[#4b2236] mb-3">
            Cada animal representa uma emoção e um convite à reconexão com a natureza e o autocuidado.
          </p>
          <h3 className="text-base font-semibold text-[#7b294e] mb-1">Psicologia das cores no Selah:</h3>
          <ul className="list-disc list-inside space-y-1 mb-3 pl-4 text-[#4b2236] text-base">
            <li><strong className="text-green-700">Verde Claro para Ansiedade:</strong> relaxamento fisiológico e sensação de calma.</li>
            <li>
              <strong className="text-blue-700">Azul Claro para Pânico:</strong> efeito tranquilizante e ajuda a acalmar a mente.
              <span className="block text-xs mt-1">
                <a href="https://www.verywellmind.com/the-color-psychology-of-blue-2795815" target="_blank" rel="noopener noreferrer" className="underline text-blue-700">Verywell Mind</a> &nbsp;|&nbsp;
                <a href="https://www.scielo.br/j/pn/a/dx6rZNrDWKmZDQ5dp4dd37G/" target="_blank" rel="noopener noreferrer" className="underline text-blue-700">SciELO</a>
              </span>
            </li>
            <li>
              <strong className="text-pink-600">Rosa Pálido para Raiva:</strong> pode ajudar a reduzir a tensão emocional.
              <span className="block text-xs mt-1">
                <a href="https://en.wikipedia.org/wiki/Baker-Miller_pink" target="_blank" rel="noopener noreferrer" className="underline text-pink-600">Wikipedia</a>
              </span>
            </li>
            <li><strong className="text-purple-700">Roxo e Lilás para Acolhimento:</strong> transmitem tranquilidade, introspecção e conforto.</li>
          </ul>
          <h3 className="text-base font-semibold text-[#7b294e] mb-1">A importância da respiração guiada:</h3>
          <p className="text-base text-[#4b2236]">
            Exercícios de respiração consciente ajudam a regular o sistema nervoso e reduzir o estresse. (<a href="https://www.medicalnewstoday.com/articles/324417" target="_blank" rel="noopener noreferrer" className="underline text-[#a9446a]">Medical News Today</a>)
          </p>
        </section>

        {/* Neurociência e artigos */}
        <section className="bg-white/80 backdrop-blur-2xl rounded-2xl shadow-xl px-4 py-8 border border-[#a9446a]/40">
          <h2 className="text-xl font-bold text-[#7b294e] mb-3">Neurociência, Psicologia das Cores & UX</h2>
          <p className="text-base text-[#4b2236] mb-3">
            A neurociência aplicada ao design e à tecnologia ajuda a criar experiências digitais mais intuitivas, agradáveis e acolhedoras.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-base text-[#4b2236]">
            <li>
              <a href="https://www.frontiersin.org/articles/10.3389/fnins.2021.679627/full" target="_blank" rel="noopener noreferrer" className="underline text-[#a9446a]">
                Hierarquia neural na categorização de cores (Frontiers in Neuroscience)
              </a>
            </li>
            <li>
              <a href="https://www.verywellmind.com/the-color-psychology-of-blue-2795815" target="_blank" rel="noopener noreferrer" className="underline text-blue-700">
                Psicologia da cor azul e seus efeitos calmantes (Verywell Mind)
              </a>
            </li>
            <li>
              <a href="https://www.psychologytoday.com/us/blog/your-personal-renaissance/201810/surprising-research-on-the-color-blue" target="_blank" rel="noopener noreferrer" className="underline text-blue-700">
                Pesquisas sobre o impacto do azul no comportamento (Psychology Today)
              </a>
            </li>
            <li>
              <a href="https://www.grandrisingbehavioralhealth.com/blog/the-impact-of-color-on-mood-and-mental-health" target="_blank" rel="noopener noreferrer" className="underline text-[#a9446a]">
                Impacto das cores no humor e na saúde mental (Grand Rising Behavioral Health)
              </a>
            </li>
            <li>
              <a href="https://templescounsel.com/the-impact-of-color-psychology-on-mental-health-a-spectrum-of-emotions/" target="_blank" rel="noopener noreferrer" className="underline text-[#a9446a]">
                Psicologia das cores e sua influência na saúde mental (Temple's Counsel)
              </a>
            </li>
            <li>
              <a href="https://www.neurosciencenews.com/color-perception-vision-26121/" target="_blank" rel="noopener noreferrer" className="underline text-[#a9446a]">
                Circuitos cerebrais relacionados à percepção de cores (Neuroscience News)
              </a>
            </li>
            <li>
              <a href="https://www.jneurosci.org/content/30/45/14955" target="_blank" rel="noopener noreferrer" className="underline text-[#a9446a]">
                Avanços na ciência das cores: da retina ao comportamento (Journal of Neuroscience)
              </a>
            </li>
          </ul>
        </section>

        {/* Como foi construído */}
        <section className="bg-white/80 backdrop-blur-2xl rounded-2xl shadow-xl px-4 py-8 border border-[#f9d6c1]/40">
          <h2 className="text-xl font-bold text-[#7b294e] mb-2">Como o Selah foi construído</h2>
          <p className="text-base text-[#4b2236]">
            Desenvolvido com <span className="font-semibold text-[#a9446a]">Next.js</span>, <span className="font-semibold text-[#a9446a]">Tailwind CSS</span>, animações SVG e Framer Motion. Código aberto no <a href="https://github.com/leticiael" target="_blank" rel="noopener noreferrer" className="underline text-[#7b294e]">GitHub</a>.
          </p>
        </section>

        {/* Mensagem final */}
        <div className="text-center bg-white/80 backdrop-blur-2xl rounded-2xl shadow-xl px-4 py-8 border border-[#f9d6c1]/40">
          <p className="text-md italic text-[#4b2236]">
            Espero que o Selah te traga um respiro, um momento de paz, e te ajude a encontrar seu ritmo novamente.
          </p>
          <a
            href="/"
            className="inline-block mt-8 px-6 py-3 text-white bg-[#7b294e] rounded-xl border border-[#a9446a]/20 hover:bg-[#a9446a] transition font-semibold"
          >
            Voltar para início
          </a>
        </div>
      </div>
      <style>{`
        @keyframes gradient-move {
          0%, 100% {
            background-position: 60% 40%, 30% 70%;
          }
          50% {
            background-position: 70% 60%, 20% 80%;
          }
        }
        .animate-gradient-move {
          background-size: 200% 200%, 180% 180%;
          animation: gradient-move 16s ease-in-out infinite alternate;
        }
      `}</style>
    </main>
  );
}