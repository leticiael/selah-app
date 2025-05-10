"use client";

export default function Poesias() {
  return (
    <main
      className="relative min-h-screen w-full flex flex-col items-center justify-center"
      style={{ backgroundColor: "#9B7D61" }}
    >
      {/* Fundo animado sutil com gradiente e blur */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="w-full h-full absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, #00000022 0%, transparent 80%), radial-gradient(ellipse 60% 40% at 70% 80%, #fff8f0 0%, transparent 80%)",
            filter: "blur(32px)",
            opacity: 0.7,
            transition: "background 2s"
          }}
        />
      </div>
      <div className="max-w-2xl mx-auto px-4 sm:px-8 py-12 sm:py-20 space-y-10 relative z-10">
        <h1 className="text-3xl font-bold text-black mb-8 tracking-tight text-center">
          Poesias para Respirar
        </h1>
        <div className="space-y-10 font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
          {/* Haruki Murakami */}
          <section className="relative rounded-3xl shadow-xl px-6 py-8 border border-black/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-white/20 to-black/5 backdrop-blur-xl pointer-events-none" />
            <h2 className="text-lg font-semibold text-black mb-2 relative z-10">Haruki Murakami</h2>
            <blockquote className="italic text-black leading-relaxed text-lg relative z-10">
              E quando a tempestade tiver passado, mal te lembrarás de ter conseguido atravessá-la, de ter conseguido sobreviver. Nem sequer terás a certeza de a tormenta ter realmente chegado ao fim. Mas uma coisa é certa. Quando saíres da tempestade já não serás a mesma pessoa. Só assim as tempestades fazem sentido.
            </blockquote>
          </section>
          {/* Jalāl ad-Dīn Rūmī */}
          <section className="relative rounded-3xl shadow-xl px-6 py-8 border border-black/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-white/20 to-black/5 backdrop-blur-xl pointer-events-none" />
            <h2 className="text-lg font-semibold text-black mb-2 relative z-10">Jalāl ad-Dīn Rūmī</h2>
            <blockquote className="italic text-black leading-relaxed text-lg relative z-10">
              Você nasceu com potencial.<br />
              Você nasceu com bondade e confiança.<br />
              Você nasceu com ideais e sonhos.<br />
              Você nasceu com grandeza.<br />
              Você nasceu com asas.<br />
              Você não está destinado a rastejar pela vida.<br />
              Você tem asas.<br />
              Aprenda a usá-las para voar.
            </blockquote>
          </section>
          {/* Jalāl ad-Dīn Rūmī - Mensageiros */}
          <section className="relative rounded-3xl shadow-xl px-6 py-8 border border-black/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-white/20 to-black/5 backdrop-blur-xl pointer-events-none" />
            <h2 className="text-lg font-semibold text-black mb-2 relative z-10">Jalāl ad-Dīn Rūmī</h2>
            <blockquote className="italic text-black leading-relaxed text-lg relative z-10">
              Estas dores que você sente são mensageiros.<br />
              Ouça-os.
            </blockquote>
          </section>
          {/* João Guimarães Rosa */}
          <section className="relative rounded-3xl shadow-xl px-6 py-8 border border-black/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-white/20 to-black/5 backdrop-blur-xl pointer-events-none" />
            <h2 className="text-lg font-semibold text-black mb-2 relative z-10">João Guimarães Rosa</h2>
            <blockquote className="italic text-black leading-relaxed text-lg relative z-10">
              A vida é assim: esquenta e esfria, aperta e daí afrouxa, sossega e depois desinquieta. O que ela quer da gente é coragem.
            </blockquote>
          </section>
          {/* Jalāl ad-Dīn Rūmī - Comunidade do espírito */}
          <section className="relative rounded-3xl shadow-xl px-6 py-8 border border-black/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-white/20 to-black/5 backdrop-blur-xl pointer-events-none" />
            <h2 className="text-lg font-semibold text-black mb-2 relative z-10">Jalāl ad-Dīn Rūmī</h2>
            <blockquote className="italic text-black leading-relaxed text-lg relative z-10">
              Há uma comunidade do espírito.<br /><br />
              Junte-se a ela e sinta o deleite<br />
              de caminhar por uma rua barulhenta<br />
              E ser o barulho.<br />
              Beba todas as suas paixões e seja uma desgraça.<br />
              Feche os dois olhos para ver com o outro olho.<br />
              Abra suas mãos se você quer ser pego.<br /><br />
              Sente-se neste círculo.<br />
              Deixe de agir como um lobo<br />
              e sinta o amor do pastor lhe preencher.<br /><br />
              À noite, seu amado vagueia.<br />
              Não aceite consolações.<br />
              Feche sua boca para a comida.<br />
              Sinta a boca do amado na sua.<br /><br />
              Você lamenta: “Ela me deixou”. “Ele me deixou”.<br /><br />
              Vinte mais virão.<br />
              Esvazie-se de preocupações.<br />
              Pense em quem criou o pensamento!<br />
              Por que você fica na prisão<br />
              quando a porta está tão escancarada?<br /><br />
              Saia do emaranhado de pensamentos temerosos.<br /><br />
              Viva no silêncio.<br />
              Flua continuamente em anéis de ser sempre em expanção.
            </blockquote>
          </section>
          {/* Nizar Qabbani */}
          <section className="relative rounded-3xl shadow-xl px-6 py-8 border border-black/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-white/20 to-black/5 backdrop-blur-xl pointer-events-none" />
            <h2 className="text-lg font-semibold text-black mb-2 relative z-10">Nizar Qabbani</h2>
            <blockquote className="italic text-black leading-relaxed text-lg relative z-10">
              Escrevo para ti, porque o amor é mais forte que a guerra. Porque a rosa é mais forte que o canhão. Porque o beijo é mais forte que a bala.
            </blockquote>
          </section>
          {/* Rabindranath Tagore */}
          <section className="relative rounded-3xl shadow-xl px-6 py-8 border border-black/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-white/20 to-black/5 backdrop-blur-xl pointer-events-none" />
            <h2 className="text-lg font-semibold text-black mb-2 relative z-10">Rabindranath Tagore</h2>
            <blockquote className="italic text-black leading-relaxed text-lg relative z-10">
              A fé é o pássaro que sente a luz e canta quando a aurora ainda está escura.
            </blockquote>
          </section>
          {/* Rainer Maria Rilke */}
          <section className="relative rounded-3xl shadow-xl px-6 py-8 border border-black/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-white/20 to-black/5 backdrop-blur-xl pointer-events-none" />
            <h2 className="text-lg font-semibold text-black mb-2 relative z-10">Rainer Maria Rilke</h2>
            <blockquote className="italic text-black leading-relaxed text-lg relative z-10">
              Você deve viver em meio à vida com confiança, mesmo quando a vida parecer difícil. Não se apegue a sua dor ou a momentos difíceis, pois eles são apenas etapas de um caminho. O sofrimento é uma forma de ensinar, uma forma de forjar o caráter. Lembre-se, quando algo dói, é porque você está se tornando mais forte. O ser humano só cresce e evolui quando se depara com suas próprias limitações e ultrapassa-as. A solidão e a tristeza podem ser campos férteis para uma profundidade interior que será o seu maior bem.
            </blockquote>
          </section>
          {/* Hafez */}
          <section className="relative rounded-3xl shadow-xl px-6 py-8 border border-black/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-white/20 to-black/5 backdrop-blur-xl pointer-events-none" />
            <h2 className="text-lg font-semibold text-black mb-2 relative z-10">Hafez</h2>
            <blockquote className="italic text-black leading-relaxed text-lg relative z-10">
              No momento em que você se liberta da tristeza e da angústia, você se abre para a felicidade. Não há necessidade de procurar por ela fora de si. O que você busca já está dentro de você. Seu coração é o centro do universo, e é em seu coração que reside o amor. O amor não é algo que você possa encontrar, mas algo que você deve permitir fluir através de você. Lembre-se, você não é apenas o recipiente da felicidade, mas também a fonte dela. Quando você ama com todo o seu ser, tudo ao seu redor começa a brilhar.
            </blockquote>
          </section>
          {/* Antonio Machado */}
          <section className="relative rounded-3xl shadow-xl px-6 py-8 border border-black/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-black/5 via-white/20 to-black/5 backdrop-blur-xl pointer-events-none" />
            <h2 className="text-lg font-semibold text-black mb-2 relative z-10">Antonio Machado</h2>
            <blockquote className="italic text-black leading-relaxed text-lg relative z-10">
              Caminhante, são tuas pegadas o caminho, e nada mais; caminhante, não há caminho, se faz caminho ao andar. Ao andar, se faz caminho, e ao voltar, a vista atrás fica marcada por uma linha de sombras. Mas, ainda assim, os passos se seguem. O caminho se faz a cada passo dado, e o que importa não é onde chegamos, mas como caminhamos. Se cairmos, levantamo-nos; se errarmos, corrigimos. A vida se constrói pela continuidade da jornada, e não pelo destino final.
            </blockquote>
          </section>
        </div>
        <div className="text-center mt-8">
          <a
            href="/"
            className="inline-block px-6 py-3 text-[#170004] bg-[#ffe5ec] rounded-xl border border-[#f9d6c1]/40 hover:bg-[#f9d6c1] transition font-semibold"
          >
            Voltar para início
          </a>
        </div>
      </div>
    </main>
  );
}