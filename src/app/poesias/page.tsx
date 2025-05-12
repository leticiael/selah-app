"use client";

import { useRef, useState, RefObject, useEffect } from "react";
import ScrollEffect from "@/components/ScrollEffect";

type RefsType = {
  [key: string]: RefObject<HTMLDivElement>;
  murakami: RefObject<HTMLDivElement>;
  rumi1: RefObject<HTMLDivElement>;
  rumi2: RefObject<HTMLDivElement>;
  rosa: RefObject<HTMLDivElement>;
  rumi3: RefObject<HTMLDivElement>;
  qabbani: RefObject<HTMLDivElement>;
  tagore: RefObject<HTMLDivElement>;
  rilke: RefObject<HTMLDivElement>;
  hafez: RefObject<HTMLDivElement>;
  machado: RefObject<HTMLDivElement>;
};

const autores = [
  { key: "murakami", label: "Haruki Murakami" },
  { key: "rumi1", label: "Jalāl ad-Dīn Rūmī (Potencial)" },
  { key: "rumi2", label: "Jalāl ad-Dīn Rūmī (Mensageiros)" },
  { key: "rosa", label: "João Guimarães Rosa" },
  { key: "rumi3", label: "Jalāl ad-Dīn Rūmī (Comunidade)" },
  { key: "qabbani", label: "Nizar Qabbani" },
  { key: "tagore", label: "Rabindranath Tagore" },
  { key: "rilke", label: "Rainer Maria Rilke" },
  { key: "hafez", label: "Hafez" },
  { key: "machado", label: "Antonio Machado" },
];

export default function Poesias() {
  const refs = Object.fromEntries(
    autores.map(({ key }) => [key, useRef<HTMLDivElement>(null)])
  ) as RefsType;

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [menuOpen]);

  const scrollTo = (ref: RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    setMenuOpen(false);
  };

  return (
    <main
      className="relative min-h-screen w-full flex flex-col items-center justify-center"
      style={{ backgroundColor: "#8C6849" }}
    >
      {/* botão hamburguer */}
      {!menuOpen && (
        <button
          className="fixed top-6 left-6 z-50 w-10 h-10 rounded-full bg-gradient-to-br from-[#ffe5ec] via-[#eecda3] to-[#a89060] shadow-lg flex items-center justify-center animate-pulse border-2 border-[#eecda3] transition"
          aria-label="Abrir menu de autores"
          onClick={() => setMenuOpen(true)}
        >
          <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
            <rect x="5" y="8" width="16" height="2.5" rx="1.2" fill="#a89060"/>
            <rect x="5" y="13" width="16" height="2.5" rx="1.2" fill="#a89060"/>
          </svg>
        </button>
      )}
      {/* botão início FIXO em todas as telas */}
      {!menuOpen && (
        <a
          href="/"
          className="fixed bottom-4 right-4 z-50 px-5 py-3 bg-gradient-to-r from-[#ffe5ec] via-[#f9d6c1] to-[#ffe5ec] text-[#170004] rounded-full shadow-2xl border border-black hover:bg-[#f9d6c1] transition font-bold tracking-wide backdrop-blur-md bg-opacity-40 flex items-center gap-2"
          style={{ opacity: 0.85, letterSpacing: "0.05em", background: "rgba(255,255,255,0.1)" }}
          aria-label="Voltar para início"
        >
          <span>Início</span>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M14 6l-4 5 4 5" stroke="#a89060" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      )}
      <div className="max-w-2xl mx-auto px-4 sm:px-8 py-8 sm:py-12 space-y-10 relative z-10">
        <div className="relative flex items-center justify-center mb-10">
          <h1 className="text-3xl font-extrabold text-[#3e1f0d] tracking-tight text-center drop-shadow-lg flex-1">
            Leia-me
          </h1>
        </div>
        <div className="space-y-10 font-sans" style={{ fontFamily: 'Inter, sans-serif' }}>
          <ScrollEffect>
            <section
              ref={refs.murakami}
              className="relative rounded-3xl shadow-2xl px-6 py-8 border border-[#3e1f0d]/30 bg-white/60 backdrop-blur-md overflow-hidden transition hover:scale-[1.02] hover:shadow-[0_4px_32px_8px_#a89060]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#f9e6b3]/30 via-white/40 to-[#eecda3]/30 pointer-events-none" />
              <h2 className="text-lg font-semibold text-[#3e1f0d] mb-2 relative z-10">Haruki Murakami</h2>
              <blockquote className="italic text-[#3e1f0d] leading-relaxed text-lg relative z-10">
                E quando a tempestade tiver passado, mal te lembrarás de ter conseguido atravessá-la, de ter conseguido sobreviver. Nem sequer terás a certeza de a tormenta ter realmente chegado ao fim. Mas uma coisa é certa. Quando saíres da tempestade já não serás a mesma pessoa. Só assim as tempestades fazem sentido.
              </blockquote>
            </section>
          </ScrollEffect>
          <ScrollEffect>
            <section
              ref={refs.rumi1}
              className="relative rounded-3xl shadow-2xl px-6 py-8 border border-[#3e1f0d]/30 bg-white/60 backdrop-blur-md overflow-hidden transition hover:scale-[1.02] hover:shadow-[0_4px_32px_8px_#a89060]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#eecda3]/20 via-white/30 to-[#a89060]/20 pointer-events-none" />
              <h2 className="text-lg font-semibold text-[#3e1f0d] mb-2 relative z-10">Jalāl ad-Dīn Rūmī</h2>
              <blockquote className="italic text-[#3e1f0d] leading-relaxed text-lg relative z-10">
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
          </ScrollEffect>
          <ScrollEffect>
            <section
              ref={refs.rumi2}
              className="relative rounded-3xl shadow-2xl px-6 py-8 border border-[#3e1f0d]/30 bg-white/60 backdrop-blur-md overflow-hidden transition hover:scale-[1.02] hover:shadow-[0_4px_32px_8px_#a89060]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#eecda3]/20 via-white/30 to-[#a89060]/20 pointer-events-none" />
              <h2 className="text-lg font-semibold text-[#3e1f0d] mb-2 relative z-10">Jalāl ad-Dīn Rūmī</h2>
              <blockquote className="italic text-[#3e1f0d] leading-relaxed text-lg relative z-10">
                Estas dores que você sente são mensageiros.<br />
                Ouça-os.
              </blockquote>
            </section>
          </ScrollEffect>
          <ScrollEffect>
            <section
              ref={refs.rosa}
              className="relative rounded-3xl shadow-2xl px-6 py-8 border border-[#3e1f0d]/30 bg-white/60 backdrop-blur-md overflow-hidden transition hover:scale-[1.02] hover:shadow-[0_4px_32px_8px_#a89060]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#eecda3]/20 via-white/30 to-[#a89060]/20 pointer-events-none" />
              <h2 className="text-lg font-semibold text-[#3e1f0d] mb-2 relative z-10">João Guimarães Rosa</h2>
              <blockquote className="italic text-[#3e1f0d] leading-relaxed text-lg relative z-10">
                A vida é assim: esquenta e esfria, aperta e daí afrouxa, sossega e depois desinquieta. O que ela quer da gente é coragem.
              </blockquote>
            </section>
          </ScrollEffect>
          <ScrollEffect>
            <section
              ref={refs.rumi3}
              className="relative rounded-3xl shadow-2xl px-6 py-8 border border-[#3e1f0d]/30 bg-white/60 backdrop-blur-md overflow-hidden transition hover:scale-[1.02] hover:shadow-[0_4px_32px_8px_#a89060]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#eecda3]/20 via-white/30 to-[#a89060]/20 pointer-events-none" />
              <h2 className="text-lg font-semibold text-[#3e1f0d] mb-2 relative z-10">Jalāl ad-Dīn Rūmī</h2>
              <blockquote className="italic text-[#3e1f0d] leading-relaxed text-lg relative z-10">
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
          </ScrollEffect>
          <ScrollEffect>
            <section
              ref={refs.qabbani}
              className="relative rounded-3xl shadow-2xl px-6 py-8 border border-[#3e1f0d]/30 bg-white/60 backdrop-blur-md overflow-hidden transition hover:scale-[1.02] hover:shadow-[0_4px_32px_8px_#a89060]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#eecda3]/20 via-white/30 to-[#a89060]/20 pointer-events-none" />
              <h2 className="text-lg font-semibold text-[#3e1f0d] mb-2 relative z-10">Nizar Qabbani</h2>
              <blockquote className="italic text-[#3e1f0d] leading-relaxed text-lg relative z-10">
                Escrevo para ti, porque o amor é mais forte que a guerra. Porque a rosa é mais forte que o canhão. Porque o beijo é mais forte que a bala.
              </blockquote>
            </section>
          </ScrollEffect>
          <ScrollEffect>
            <section
              ref={refs.tagore}
              className="relative rounded-3xl shadow-2xl px-6 py-8 border border-[#3e1f0d]/30 bg-white/60 backdrop-blur-md overflow-hidden transition hover:scale-[1.02] hover:shadow-[0_4px_32px_8px_#a89060]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#eecda3]/20 via-white/30 to-[#a89060]/20 pointer-events-none" />
              <h2 className="text-lg font-semibold text-[#3e1f0d] mb-2 relative z-10">Rabindranath Tagore</h2>
              <blockquote className="italic text-[#3e1f0d] leading-relaxed text-lg relative z-10">
                A fé é o pássaro que sente a luz e canta quando a aurora ainda está escura.
              </blockquote>
            </section>
          </ScrollEffect>
          <ScrollEffect>
            <section
              ref={refs.rilke}
              className="relative rounded-3xl shadow-2xl px-6 py-8 border border-[#3e1f0d]/30 bg-white/60 backdrop-blur-md overflow-hidden transition hover:scale-[1.02] hover:shadow-[0_4px_32px_8px_#a89060]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#eecda3]/20 via-white/30 to-[#a89060]/20 pointer-events-none" />
              <h2 className="text-lg font-semibold text-[#3e1f0d] mb-2 relative z-10">Rainer Maria Rilke</h2>
              <blockquote className="italic text-[#3e1f0d] leading-relaxed text-lg relative z-10">
                Você deve viver em meio à vida com confiança, mesmo quando a vida parecer difícil. Não se apegue a sua dor ou a momentos difíceis, pois eles são apenas etapas de um caminho. O sofrimento é uma forma de ensinar, uma forma de forjar o caráter. Lembre-se, quando algo dói, é porque você está se tornando mais forte. O ser humano só cresce e evolui quando se depara com suas próprias limitações e ultrapassa-as. A solidão e a tristeza podem ser campos férteis para uma profundidade interior que será o seu maior bem.
              </blockquote>
            </section>
          </ScrollEffect>
          <ScrollEffect>
            <section
              ref={refs.hafez}
              className="relative rounded-3xl shadow-2xl px-6 py-8 border border-[#3e1f0d]/30 bg-white/60 backdrop-blur-md overflow-hidden transition hover:scale-[1.02] hover:shadow-[0_4px_32px_8px_#a89060]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#eecda3]/20 via-white/30 to-[#a89060]/20 pointer-events-none" />
              <h2 className="text-lg font-semibold text-[#3e1f0d] mb-2 relative z-10">Hafez</h2>
              <blockquote className="italic text-[#3e1f0d] leading-relaxed text-lg relative z-10">
                No momento em que você se liberta da tristeza e da angústia, você se abre para a felicidade. Não há necessidade de procurar por ela fora de si. O que você busca já está dentro de você. Seu coração é o centro do universo, e é em seu coração que reside o amor. O amor não é algo que você possa encontrar, mas algo que você deve permitir fluir através de você. Lembre-se, você não é apenas o recipiente da felicidade, mas também a fonte dela. Quando você ama com todo o seu ser, tudo ao seu redor começa a brilhar.
              </blockquote>
            </section>
          </ScrollEffect>
          <ScrollEffect>
            <section
              ref={refs.machado}
              className="relative rounded-3xl shadow-2xl px-6 py-8 border border-[#3e1f0d]/30 bg-white/60 backdrop-blur-md overflow-hidden transition hover:scale-[1.02] hover:shadow-[0_4px_32px_8px_#a89060]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#eecda3]/20 via-white/30 to-[#a89060]/20 pointer-events-none" />
              <h2 className="text-lg font-semibold text-[#3e1f0d] mb-2 relative z-10">Antonio Machado</h2>
              <blockquote className="italic text-[#3e1f0d] leading-relaxed text-lg relative z-10">
                Caminhante, são tuas pegadas o caminho, e nada mais; caminhante, não há caminho, se faz caminho ao andar. Ao andar, se faz caminho, e ao voltar, a vista atrás fica marcada por uma linha de sombras. Mas, ainda assim, os passos se seguem. O caminho se faz a cada passo dado, e o que importa não é onde chegamos, mas como caminhamos. Se cairmos, levantamo-nos; se errarmos, corrigimos. A vida se constrói pela continuidade da jornada, e não pelo destino final.
              </blockquote>
            </section>
          </ScrollEffect>
        </div>
      </div>
      {/* menu de autores */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-[#8c6849cc] backdrop-blur-sm z-50 flex flex-col items-center overflow-auto max-h-screen">
          <button
            className="absolute top-6 left-6 w-10 h-10 rounded-full bg-gradient-to-br from-[#ffe5ec] via-[#eecda3] to-[#a89060] shadow-lg flex items-center justify-center border-2 border-[#eecda3] transition"
            aria-label="Fechar menu"
            onClick={() => setMenuOpen(false)}
          >
            <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
              <line x1="6" y1="6" x2="16" y2="16" stroke="#a89060" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="16" y1="6" x2="6" y2="16" stroke="#a89060" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </button>
          <nav className="flex flex-col gap-4 mt-32 md:mt-0 md:pt-32 w-full items-center">
            {autores.map(({ key, label }) => (
              <button
                key={key}
                className="px-6 py-3 rounded-lg bg-[#eecda3] text-[#3e1f0d] font-semibold shadow hover:bg-[#a89060] hover:text-white transition text-lg w-11/12 max-w-xs"
                onClick={() => scrollTo(refs[key])}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </main>
  );
}