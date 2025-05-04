export default function Sobre() {
    return (
      <main className="min-h-screen bg-gradient-to-b from-[#d0f0ff] via-white to-[#dff9fb] text-gray-800 px-6 py-16 md:px-24 transition-all duration-700 ease-in-out">
        <div className="max-w-3xl mx-auto">
          {/* Introdução com Carinho e Significado */}
          <section className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-800 mb-4">Selah: Um Respiro Criado com Carinho</h1>
            <p className="text-lg leading-relaxed mb-6">
              Este espaço nasceu de uma jornada pessoal e foi construído com muito carinho por alguém que já esteve aí, no meio da turbulência das crises. Sei como é difícil encontrar calma quando tudo parece caótico. Por isso, criei o <strong>Selah</strong>.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              <strong>Selah</strong> é mais que um nome; é um convite. Nos textos antigos, significa uma pausa para refletir, respirar fundo e se reconectar. É exatamente isso que espero oferecer aqui: um momento seguro para você simplesmente... pausar.
            </p>
          </section>
  
          {/* O Projeto Mais Importante */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Um Projeto com Propósito</h2>
            <p className="text-lg leading-relaxed mb-6">
              O Selah é, formalmente, meu projeto integrador no curso de Engenharia de Software. Mas, para mim, ele é muito mais do que um requisito acadêmico. É, sem dúvida, <strong>o projeto mais importante deste semestre</strong> e talvez da minha caminhada até agora. Dediquei muito esforço para transformar uma experiência difícil em algo que pudesse genuinamente acolher e ajudar outras pessoas.
            </p>
          </section>
  
          {/* Minha História e Motivação */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              De Onde Veio o Selah?
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              A semente do Selah surgiu enquanto eu mesma aprendia a navegar e a <strong>tratar minhas próprias crises</strong> de saúde mental. Descobri na prática o poder imenso da respiração consciente – como ela podia ser uma âncora, um alívio quase instantâneo no meio do caos. Senti que precisava compartilhar essa ferramenta simples, mas tão poderosa.
            </p>
            <p className="text-lg leading-relaxed">
              Como estudante de <strong>Engenharia de Software</strong>, vi a chance de usar o que estou aprendendo para criar este refúgio digital: um cantinho seguro, sempre disponível, onde qualquer um pudesse encontrar um momento de paz. Sem cadastros, sem custos, sem julgamentos, apenas um espaço para respirar.
            </p>
          </section>
  
          {/* O Que o Selah Oferece */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">O Que Você Encontra Aqui</h2>
            <p className="text-lg leading-relaxed mb-6">
              Meu objetivo é oferecer apoio imediato, simples e anônimo. Aqui você tem:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li className="text-lg">Animações de respiração guiada (com um toque especial de roxo, uma cor que me acalma!)</li>
              <li className="text-lg">Mensagens de apoio pensadas para momentos difíceis</li>
              <li className='text-lg'>Cores de fundo cuidadosamente escolhidas para auxiliar em diferentes estados emocionais.</li> {/* Adicionado item */}
            </ul>
          </section>
  
          {/* NOVA SEÇÃO: A Ciência por Trás do Selah */}
          <section className="mb-12 p-6 bg-blue-50 rounded-lg shadow-sm">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">A Ciência por Trás do Selah: Cores e Respiração</h2>
            <p className="text-lg leading-relaxed mb-6">
              As escolhas de design do Selah, especialmente as cores e os exercícios de respiração, não foram feitas ao acaso. Dediquei tempo a estudar como esses elementos podem influenciar nosso bem-estar, buscando embasamento em pesquisas de neurociência e psicologia das cores para criar uma experiência realmente terapêutica.
            </p>
            <h3 className="text-xl font-semibold text-blue-700 mb-3">A Psicologia das Cores no Selah:</h3>
            <p className="text-lg leading-relaxed mb-4">
              As cores têm um impacto direto no nosso humor e estado fisiológico. No Selah, utilizamos cores específicas associadas a diferentes necessidades emocionais, com base em evidências como:
            </p>
            <ul className="list-disc list-inside space-y-3 mb-6 pl-4">
              <li>
                <strong>Verde Claro (#98FB98) para Ansiedade:</strong> Estudos indicam que tons de verde promovem relaxamento fisiológico, ajudando a reduzir marcadores de estresse e a frequência cardíaca, criando uma sensação de calma. (Fontes: <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4823907/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NCBI 1</a>, <a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC6137615/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">NCBI 2</a>)
              </li>
              <li>
                <strong>Azul Claro (#ADD8E6) para Crises de Pânico:</strong> Ambientes e luzes azuladas demonstraram ter efeito tranquilizante, associado à redução da ativação do sistema nervoso e à promoção da calmaria mental, essencial durante o pânico. (Fonte: <a href="https://pubmed.ncbi.nlm.nih.gov/28701170/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">PubMed</a>)
              </li>
              <li>
                <strong>Azul Esverdeado (#20B2AA) para Medo:</strong> Tonalidades frias que combinam azul e verde podem exercer uma ação sedativa, ajudando a diminuir a hiperexcitação associada ao medo. (Fonte: <a href="https://www.verywellmind.com/color-psychology-2795824" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Verywell Mind</a>)
              </li>
              <li>
                <strong>Rosa Pálido (#FF91AF - "Baker-Miller pink") para Raiva:</strong> Pesquisas clássicas sugerem que este tom específico de rosa pode diminuir comportamentos agressivos e a tensão emocional, auxiliando na redução da hostilidade. (Fonte: <a href="https://en.wikipedia.org/wiki/Baker-Miller_pink" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Wikipedia</a>)
              </li>
            </ul>
            <h3 className="text-xl font-semibold text-blue-700 mb-3">A Importância da Respiração Guiada:</h3>
            <p className="text-lg leading-relaxed">
               As animações de respiração seguem padrões específicos (como a respiração quadrada ou 4-7-8, por exemplo - *adapte se usar outra*) que são recomendados por especialistas para ajudar a regular o sistema nervoso autônomo. Focar na respiração de forma consciente e ritmada é uma técnica comprovada para reduzir a resposta ao estresse, diminuir a ansiedade e trazer a mente para o momento presente. (Fontes incluem práticas de mindfulness e bem-estar geral, e pesquisas como <a href="https://www.medicalnewstoday.com/articles/324417" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Medical News Today</a>).
            </p>
          </section>
          {/* FIM DA NOVA SEÇÃO */}
  
  
          {/* Aspectos Técnicos (com foco no propósito) */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">
              Como o Selah Foi Construído
            </h2>
            <p className="text-lg leading-relaxed mb-6">
              Para dar vida ao Selah, escolhi tecnologias que me ajudaram a criar uma experiência leve, rápida e focada no essencial:
            </p>
            <ul className="list-disc list-inside mb-6 space-y-2">
              <li className="text-lg"><strong>Next.js:</strong> Para garantir que o site seja rápido e funcione bem em qualquer dispositivo.</li>
              <li className="text-lg"><strong>Tailwind CSS:</strong> Para criar um visual limpo, suave e acessível, que convide à calma.</li>
            </ul>
            <p className="text-lg leading-relaxed">
              A prioridade sempre foi construir um ambiente leve, seguro e totalmente focado em oferecer um momento de paz, sem distrações, e onde cada detalhe, da cor à animação, tivesse um propósito terapêutico.
            </p>
          </section>
  
          {/* Mensagem Final Pessoal */}
          <div className="text-center mt-12">
            <p className="text-md italic text-gray-600">
              Do fundo do meu coração, espero que o Selah te traga um respiro, um momento de paz, e te ajude a encontrar seu ritmo novamente, assim como a respiração e o estudo desses detalhes têm me ajudado.
            </p>
            <a
              href="/"
              className="inline-block mt-8 px-6 py-3 text-white bg-blue-700 rounded-xl border border-blue-800/20 hover:bg-blue-800 transition font-semibold"
            >
              Voltar para início
            </a>
          </div>
        </div>
      </main>
    );
  }