import React from "react";
import { RiPlayFill, RiPauseFill, RiSkipForwardFill, RiSkipBackFill, RiVolumeUpFill } from "react-icons/ri";
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
    <div className="flex flex-col items-center gap-5 w-full max-w-md mx-auto p-4 rounded-3xl bg-black/5 backdrop-blur-[18px] shadow-lg border border-white/5">
      <div className="flex gap-4 justify-center items-center">
        <button
          onClick={prev}
          className="h-11 w-11 rounded-full flex items-center justify-center bg-gradient-to-br from-fuchsia-600/20 via-cyan-400/10 to-indigo-800/20 text-white/70 hover:scale-110 transition-all border border-white/5 shadow"
          aria-label="Voltar"
        >
          <RiSkipBackFill size={22} />
        </button>
        <button
          onClick={playPause}
          className="h-12 w-12 rounded-full flex items-center justify-center bg-gradient-to-br from-fuchsia-600/30 via-cyan-400/20 to-indigo-800/30 text-white shadow-lg border-2 border-white/10 hover:scale-110 transition-all"
          aria-label={playing ? "Pausar" : "Tocar"}
        >
          {playing ? <RiPauseFill size={28} /> : <RiPlayFill size={28} />}
        </button>
        <button
          onClick={next}
          className="h-11 w-11 rounded-full flex items-center justify-center bg-gradient-to-br from-fuchsia-600/20 via-cyan-400/10 to-indigo-800/20 text-white/70 hover:scale-110 transition-all border border-white/5 shadow"
          aria-label="Próxima faixa"
        >
          <RiSkipForwardFill size={22} />
        </button>
      </div>
      <div className="flex items-center gap-2 w-full max-w-xs">
        <RiVolumeUpFill className="text-white/70" size={22} />
        <div className="flex-1">
          <VolumeSlider volume={volume} setVolume={setVolume} />
        </div>
      </div>
<div className="mt-3 w-full max-w-xs text-center text-white/90 bg-gradient-to-r from-indigo-900/40 to-fuchsia-900/40 backdrop-blur-md rounded-xl px-4 py-3 shadow-lg border border-white/10 hover:scale-105 transition-all">
  <div className="flex items-center justify-center gap-2 mb-1">
    <span className="inline-block animate-pulse">☕️</span>
    <span className="font-semibold text-xs bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-fuchsia-400">
      Nota da desenvolvedora
    </span>
  </div>
  <p className="text-xs leading-relaxed mt-1">
    Os áudios ainda são experimentais e podem apresentar pequenos bugs. Estou ajustando tudo com carinho para melhorar sua experiência.<br />
    <span className="block mt-2 font-medium">Sua presença aqui é muito especial!</span>
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