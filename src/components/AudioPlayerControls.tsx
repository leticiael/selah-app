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
    <div className="flex flex-col items-center gap-5 w-full">
      <div className="flex flex-row gap-4 w-full justify-center">
        <button
          onClick={prev}
          className="h-12 sm:h-14 px-7 rounded-2xl bg-black/30 border border-white/20 text-white/90 flex items-center justify-center transition-all duration-200 backdrop-blur-xl hover:bg-gradient-to-r hover:from-fuchsia-500/40 hover:via-cyan-400/30 hover:to-indigo-700/40 hover:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30 outline-none"
          aria-label="Voltar"
        >
          <RiSkipBackFill size={24} />
        </button>
        <button
          onClick={playPause}
          className={`h-12 sm:h-14 px-7 rounded-2xl bg-black/40 border border-white/20 text-white/90 flex items-center justify-center transition-all duration-200 backdrop-blur-xl
            hover:bg-gradient-to-r hover:from-fuchsia-500/60 hover:via-cyan-400/40 hover:to-indigo-700/60 hover:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30 outline-none`}
          aria-label={playing ? "Pausar" : "Tocar"}
        >
          {playing ? <RiPauseFill size={28} /> : <RiPlayFill size={28} />}
        </button>
        <button
          onClick={next}
          className="h-12 sm:h-14 px-7 rounded-2xl bg-black/30 border border-white/20 text-white/90 flex items-center justify-center transition-all duration-200 backdrop-blur-xl hover:bg-gradient-to-r hover:from-fuchsia-500/40 hover:via-cyan-400/30 hover:to-indigo-700/40 hover:border-cyan-300 focus:ring-2 focus:ring-cyan-400/30 outline-none"
          aria-label="Próxima faixa"
        >
          <RiSkipForwardFill size={24} />
        </button>
      </div>
      <div className="flex items-center gap-3 w-full max-w-xs justify-center">
        <RiVolumeUpFill className="text-white/80" size={28} />
        <div className="flex-1">
          <VolumeSlider volume={volume} setVolume={setVolume} />
        </div>
      </div>
      <style jsx>{`
        button:active {
          transform: scale(0.97);
        }
      `}</style>
    </div>
  );
}