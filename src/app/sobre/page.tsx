"use client";
export default function Sobre() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden flex flex-col items-center justify-center px-0 py-0">
      {/* Fundo animado com gradiente roxo/lilás escuro e blur */}
      <div
        className="fixed inset-0 -z-10 animate-gradient-move"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, #a78bfa88 0%, #7c3aedcc 60%, #312e81 100%), radial-gradient(ellipse 60% 40% at 30% 70%, #c4b5fd55 0%, #a21caf44 80%, transparent 100%)",
          filter: "blur(32px)",
          transition: "background 1s",
        }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        {/* Introdução com Carinho e Significado */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold text-black mb-4 drop-shadow-lg">Selah: Um Respiro para Você</h1>
          <p className="text-lg leading-relaxed mb-6 text-black">
            O Selah nasceu da vontade de criar um espaço simples, acolhedor e acessível para quem precisa de um momento de pausa. Aqui, você encontra ferramentas para respirar, se acalmar e lembrar que não está só.
          </p>
          <p className="text-lg leading-relaxed mb-6 text-black">
            O nome <strong>Selah</strong> vem de uma palavra antiga, usada em textos poéticos para indicar uma pausa — um convite para respirar, refletir e seguir em frente com mais leveza. É isso que desejo para você aqui: um instante de pausa e cuidado.
          </p>
        </section>

        {/* O Projeto Mais Importante */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-violet-900 mb-4">Um Projeto com Propósito</h2>
          <p className="text-lg leading-relaxed mb-6 text-black">
            O Selah é meu <strong>projeto integrador do curso de Engenharia de Software (5º período) da faculdade UniOpet</strong>, mas também é um projeto de vida. Transformei minha experiência pessoal com crises em um lugar digital de acolhimento, feito para ajudar quem precisa de um respiro.
          </p>
        </section>


        {/* Minha História e Motivação */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-violet-900 mb-4">
            De Onde Veio o Selah?
          </h2>
          <p className="text-lg leading-relaxed mb-6 text-black">
            Aprendi, na prática, o poder da respiração consciente para acalmar a mente. Usei meus conhecimentos em tecnologia para criar este espaço seguro, sem julgamentos, onde qualquer pessoa pode encontrar um momento de paz.
          </p>
        </section>

        {/* O Que o Selah Oferece */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-violet-900 mb-4">O Que Você Encontra Aqui</h2>
          <p className="text-lg leading-relaxed mb-6 text-black">
            Apoio imediato, simples e anônimo:
          </p>
          <ul className="list-disc list-inside mb-6 space-y-2 text-black">
            <li className="text-lg">Animações de respiração guiada em tons de roxo e lilás</li>
            <li className="text-lg">Mensagens de apoio para momentos difíceis</li>
            <li className="text-lg">Cores de fundo pensadas para ajudar em diferentes emoções</li>
          </ul>
        </section>

        {/* Ciência por Trás do Selah */}
        <section className="mb-12 p-6 bg-violet-900/60 rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-2xl font-bold text-violet-100 mb-4">A Ciência por Trás do Selah: Cores e Respiração</h2>
          <p className="text-lg leading-relaxed mb-6 text-violet-200">
            As escolhas de design do Selah, especialmente as cores e os exercícios de respiração, foram feitas com base em estudos de neurociência e psicologia das cores para criar uma experiência realmente acolhedora.
          </p>
          <h3 className="text-xl font-semibold text-violet-200 mb-3">A Psicologia das Cores no Selah:</h3>
          <p className="text-lg leading-relaxed mb-4 text-violet-200">
            Cada cor foi escolhida para apoiar um estado emocional diferente:
          </p>
          <ul className="list-disc list-inside space-y-3 mb-6 pl-4 text-violet-100">
            <li>
              <strong>Verde Claro para Ansiedade:</strong> Tons de verde promovem relaxamento fisiológico e sensação de calma. (<a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4823907/" target="_blank" rel="noopener noreferrer" className="underline">NCBI</a>)
            </li>
            <li>
              <strong>Azul Claro para Pânico:</strong> Luzes azuladas têm efeito tranquilizante e ajudam a acalmar a mente. (<a href="https://pubmed.ncbi.nlm.nih.gov/28701170/" target="_blank" rel="noopener noreferrer" className="underline">PubMed</a>)
            </li>
            <li>
              <strong>Azul Esverdeado para Medo:</strong> Tonalidades frias ajudam a diminuir a hiperexcitação. (<a href="https://www.verywellmind.com/color-psychology-2795824" target="_blank" rel="noopener noreferrer" className="underline">Verywell Mind</a>)
            </li>
            <li>
              <strong>Rosa Pálido para Raiva:</strong> Este tom pode ajudar a reduzir a tensão emocional. (<a href="https://en.wikipedia.org/wiki/Baker-Miller_pink" target="_blank" rel="noopener noreferrer" className="underline">Wikipedia</a>)
            </li>
            <li>
              <strong>Roxo e Lilás para Acolhimento:</strong> Tons de roxo transmitem tranquilidade, introspecção e conforto, criando um ambiente seguro para sua pausa.
            </li>
          </ul>
          <h3 className="text-xl font-semibold text-violet-200 mb-3">A Importância da Respiração Guiada:</h3>
          <p className="text-lg leading-relaxed text-violet-200">
            As animações de respiração seguem padrões recomendados por especialistas para ajudar a regular o sistema nervoso. Focar na respiração de forma consciente e ritmada é uma técnica comprovada para reduzir o estresse, diminuir a ansiedade e trazer a mente para o momento presente. (<a href="https://www.medicalnewstoday.com/articles/324417" target="_blank" rel="noopener noreferrer" className="underline">Medical News Today</a>)
          </p>
        </section>

        {/* Aspectos Técnicos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-violet-900 mb-4">
            Como o Selah Foi Construído
          </h2>
          <p className="text-lg leading-relaxed mb-6 text-black">
            Usei Next.js e Tailwind CSS para criar um site rápido, responsivo e acessível, com foco total no essencial: seu bem-estar.
          </p>
        </section>

        {/* Mensagem Final Pessoal */}
        <div className="text-center mt-12">
          <p className="text-md italic text-black">
            Espero que o Selah te traga um respiro, um momento de paz, e te ajude a encontrar seu ritmo novamente.
          </p>
          <a
            href="/"
            className="inline-block mt-8 px-6 py-3 text-white bg-violet-700 rounded-xl border border-violet-800/20 hover:bg-violet-800 transition font-semibold"
          >
            Voltar para início
          </a>
        </div>
      </div>
      {/* Animação de gradiente suave */}
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
          animation: gradient-move 12s ease-in-out infinite alternate;
        }
      `}</style>
    </main>
  );
}