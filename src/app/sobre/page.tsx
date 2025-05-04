"use client";
export default function Sobre() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden flex flex-col items-center justify-center px-0 py-0">
      <div
        className="fixed inset-0 -z-10 animate-gradient-move"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, #23232b 0%, #23232b 60%, #18181c 100%), radial-gradient(ellipse 60% 40% at 30% 70%, #23232b 0%, #23232b 80%, transparent 100%)",
          filter: "blur(40px)",
          transition: "background 1s",
        }}
      />
      <div className="max-w-3xl mx-auto px-2 sm:px-6 py-10 sm:py-16">

        {/* Sobre mim */}
        <section className="mb-10 bg-[#23232b]/95 backdrop-blur-2xl rounded-2xl shadow-xl px-4 py-8 border border-[#23232b]/40 flex flex-col items-center">
        <img
  src="/leticia.png"
  alt="Leticia Eltermann"
  className="w-64 mb-6 shadow-xl transition-transform duration-300 ease-in-out hover:scale-150 cursor-pointer"
  style={{ height: "auto", objectFit: "contain" }}
/>
          <h2 className="text-2xl font-bold text-indigo-200 mb-2">Sobre mim</h2>
          <p className="text-lg leading-relaxed text-gray-100 mb-2">
            Olá! Eu sou <span className="font-semibold text-indigo-300">Leticia Eltermann</span>, desenvolvedora apaixonada por tecnologia, literatura, meditação e videogames. Gosto de criar experiências digitais que acolhem e ajudam pessoas de verdade.
          </p>
          <p className="text-lg leading-relaxed text-gray-100 mb-4">
            Compartilho reflexões e projetos no <a href="https://github.com/leticiael" target="_blank" rel="noopener noreferrer" className="underline text-indigo-200">GitHub</a> e no <a href="https://medium.com/@leeltermann" target="_blank" rel="noopener noreferrer" className="underline text-indigo-200">Medium</a>.
          </p>
        </section>

        <section className="text-center mb-10 bg-[#23232b]/95 backdrop-blur-2xl rounded-2xl shadow-xl px-4 py-8 border border-[#23232b]/40">
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">Selah: Um Respiro para Você</h1>
          <p className="text-lg leading-relaxed mb-4 text-gray-100">
            O Selah nasceu da vontade de criar um espaço simples, acolhedor e acessível para quem precisa de um momento de pausa. Aqui, você encontra ferramentas para respirar, se acalmar e lembrar que não está só.
          </p>
          <p className="text-lg leading-relaxed text-gray-200">
            O nome <strong className="text-indigo-300">Selah</strong> vem de uma palavra antiga, usada em textos poéticos para indicar uma pausa — um convite para respirar, refletir e seguir em frente com mais leveza. É isso que desejo para você aqui: um instante de pausa e cuidado.
          </p>
        </section>

        <section className="mb-10 bg-[#23232b]/95 backdrop-blur-2xl rounded-2xl shadow-xl px-4 py-8 border border-[#23232b]/40">
          <h2 className="text-2xl font-bold text-indigo-200 mb-4">Um Projeto com Propósito</h2>
          <p className="text-lg leading-relaxed text-gray-100">
            O Selah é meu <strong className="text-indigo-300">projeto integrador do curso de Engenharia de Software (5º período) da faculdade UniOpet</strong>, mas também é um projeto de vida. Transformei minha experiência pessoal com crises em um lugar digital de acolhimento, feito para ajudar quem precisa de um respiro.
          </p>
        </section>

        <section className="mb-10 bg-[#23232b]/95 backdrop-blur-2xl rounded-2xl shadow-xl px-4 py-8 border border-[#23232b]/40">
          <h2 className="text-2xl font-bold text-indigo-200 mb-4">O Que Você Encontra Aqui</h2>
          <p className="text-lg leading-relaxed text-gray-100">
            Apoio imediato, simples e anônimo:
          </p>
          <ul className="list-disc list-inside mb-2 space-y-2 text-gray-100">
            <li className="text-lg">Animações de respiração guiada em tons escuros e suaves</li>
            <li className="text-lg">Mensagens de apoio para momentos difíceis</li>
            <li className="text-lg">Cores de fundo pensadas para ajudar em diferentes emoções</li>
          </ul>
        </section>

        <section className="mb-10 p-6 bg-[#23232b]/95 backdrop-blur-2xl rounded-2xl shadow-xl border border-[#23232b]/40">
          <h2 className="text-2xl font-bold text-indigo-100 mb-4">A Ciência por Trás do Selah: Cores, Animais e Respiração</h2>
          <p className="text-lg leading-relaxed mb-4 text-gray-100">
            As escolhas de design do Selah, especialmente as cores, os animais e os exercícios de respiração, foram feitas com base em estudos de neurociência e psicologia das cores para criar uma experiência realmente acolhedora.
          </p>
          <h3 className="text-xl font-semibold text-indigo-200 mb-3">Por que animais?</h3>
          <p className="text-lg leading-relaxed mb-4 text-gray-100">
            Cada animal representa uma emoção e um convite à reconexão com a natureza e com o instinto de autocuidado. Eles simbolizam força, calma, coragem e sensibilidade — qualidades que todos temos e podemos acessar em momentos difíceis.
          </p>
          <h3 className="text-xl font-semibold text-indigo-200 mb-3">A Psicologia das Cores no Selah:</h3>
          <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-gray-100">
            <li>
              <strong className="text-green-300">Verde Claro para Ansiedade:</strong> Tons de verde promovem relaxamento fisiológico e sensação de calma. (<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4823907/" target="_blank" rel="noopener noreferrer" className="underline text-indigo-200">NCBI</a>)
            </li>
            <li>
              <strong className="text-blue-300">Azul Claro para Pânico:</strong> Luzes azuladas têm efeito tranquilizante e ajudam a acalmar a mente. (<a href="https://pubmed.ncbi.nlm.nih.gov/28701170/" target="_blank" rel="noopener noreferrer" className="underline text-indigo-200">PubMed</a>)
            </li>
            <li>
              <strong className="text-pink-300">Rosa Pálido para Raiva:</strong> Este tom pode ajudar a reduzir a tensão emocional. (<a href="https://en.wikipedia.org/wiki/Baker-Miller_pink" target="_blank" rel="noopener noreferrer" className="underline text-indigo-200">Wikipedia</a>)
            </li>
            <li>
              <strong className="text-indigo-300">Roxo e Lilás para Acolhimento:</strong> Tons de roxo transmitem tranquilidade, introspecção e conforto, criando um ambiente seguro para sua pausa.
            </li>
          </ul>
          <h3 className="text-xl font-semibold text-indigo-200 mb-3">A Importância da Respiração Guiada:</h3>
          <p className="text-lg leading-relaxed text-gray-100">
            As animações de respiração seguem padrões recomendados por especialistas para ajudar a regular o sistema nervoso. Focar na respiração de forma consciente e ritmada é uma técnica comprovada para reduzir o estresse, diminuir a ansiedade e trazer a mente para o momento presente. (<a href="https://www.medicalnewstoday.com/articles/324417" target="_blank" rel="noopener noreferrer" className="underline text-indigo-200">Medical News Today</a>)
          </p>
        </section>

        <section className="mb-10 bg-[#23232b]/95 backdrop-blur-2xl rounded-2xl shadow-xl px-4 py-8 border border-[#23232b]/40">
          <h2 className="text-2xl font-bold text-indigo-200 mb-4">
            Como o Selah Foi Construído
          </h2>
          <p className="text-lg leading-relaxed text-gray-100 mb-2">
            O Selah foi desenvolvido com <span className="font-semibold text-indigo-300">Next.js</span> (React), <span className="font-semibold text-indigo-300">Tailwind CSS</span> para estilização, animações SVG e Framer Motion para efeitos suaves, e hospedado em ambiente serverless para máxima performance e acessibilidade. O código é aberto e pode ser conferido no meu <a href="https://github.com/leticiael" target="_blank" rel="noopener noreferrer" className="underline text-indigo-200">GitHub</a>.
          </p>
        </section>

        <div className="text-center mt-10 bg-[#23232b]/95 backdrop-blur-2xl rounded-2xl shadow-xl px-4 py-8 border border-[#23232b]/40">
          <p className="text-md italic text-gray-200">
            Espero que o Selah te traga um respiro, um momento de paz, e te ajude a encontrar seu ritmo novamente.
          </p>
          <a
            href="/"
            className="inline-block mt-8 px-6 py-3 text-white bg-indigo-700 rounded-xl border border-indigo-800/20 hover:bg-indigo-800 transition font-semibold"
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