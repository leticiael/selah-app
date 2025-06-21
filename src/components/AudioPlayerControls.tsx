import React from "react";
import VolumeSlider from "./VolumeSlider";

interface AudioPlayerControlsProps {
  playPause: () => void;
  next: () => void;
  prev?: () => void;
  playing: boolean;
  volume: number;
  setVolume: (value: number) => void;
}

export default function AudioPlayerControls({
  playPause,
  next,
  prev,
  playing,
  volume,
  setVolume,
}: AudioPlayerControlsProps) {
  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto p-0">
      <div className="flex gap-10 justify-center items-center">
        <button
          onClick={prev}
          className="h-12 w-12 rounded-full flex items-center justify-center text-cyan-100/80 hover:text-fuchsia-200/90 transition-all"
          aria-label="Voltar"
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="19 20 9 12 19 4" />
          </svg>
        </button>
        <button
          onClick={playPause}
          className="h-16 w-16 rounded-full flex items-center justify-center text-cyan-100/90 hover:text-fuchsia-200/90 transition-all"
          aria-label={playing ? "Pausar" : "Tocar"}
        >
          {playing ? (
            <svg width="44" height="44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <rect x="12" y="10" width="6" height="24" rx="2" />
              <rect x="26" y="10" width="6" height="24" rx="2" />
            </svg>
          ) : (
            <svg width="44" height="44" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polygon points="16,10 34,22 16,34" fill="currentColor" />
            </svg>
          )}
        </button>
        <button
          onClick={next}
          className="h-12 w-12 rounded-full flex items-center justify-center text-cyan-100/80 hover:text-fuchsia-200/90 transition-all"
          aria-label="Próxima faixa"
        >
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 4 19 12 9 20" />
          </svg>
        </button>
      </div>
      <div className="flex items-center gap-4 w-full max-w-xs">
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-100/70">
          <polygon points="3,9 9,9 13,5 13,19 9,15 3,15" fill="currentColor" />
          <path d="M16 8a5 5 0 0 1 0 8" />
        </svg>
        <div className="flex-1">
          <VolumeSlider volume={volume} setVolume={setVolume} />
        </div>
      </div>
      <div className="mt-6 w-full max-w-xs text-center text-cyan-100/90">
        <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-lg animate-pulse hover:animate-spin transition-all duration-300">🔧</span>

          <span className="font-semibold text-xs">Nota da dev</span>
        </div>
        <p className="text-xs mt-0.5 leading-relaxed">
          Este player de áudio está em fase beta. Estamos trabalhando para corrigir 
          problemas de carregamento que possam ocorrer durante a reprodução.
        </p>
      </div>
      <style jsx>{`
        button:active {
          transform: scale(0.97);
        }
      `}</style>
    </div>
  );
}