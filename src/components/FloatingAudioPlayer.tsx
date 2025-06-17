"use client";

import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaForward, FaVolumeUp, FaMusic } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const tracks = [
  { label: "Pássaros", file: "/sounds/birds.mp3" },
  { label: "Pássaros + Água", file: "/sounds/birdswater.mp3" },
  { label: "Chuva", file: "/sounds/chuva.mp3" },
  { label: "Coração", file: "/sounds/coracao.mp3" },
  { label: "Pingos d'água", file: "/sounds/dripping-water-in-cave-114694.mp3" },
  { label: "Foco", file: "/sounds/foco.mp3" },
  { label: "Fogo", file: "/sounds/fogo.mp3" },
  { label: "Guarda-chuva", file: "/sounds/guardachuva.mp3" },
  { label: "Piano", file: "/sounds/piano.mp3" },
  { label: "Ruído Marrom", file: "/sounds/ruidomarrom.mp3" },
  { label: "Espaço", file: "/sounds/space.mp3" },
  { label: "Teclado", file: "/sounds/teclado.mp3" },
];

export default function FloatingAudioPlayer() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMounted, setIsMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleLoadStart = () => setIsPlaying(false);
    const handleCanPlay = () => {
      // Só atualiza se o audio realmente estiver tocando
      if (!audio.paused) {
        setIsPlaying(true);
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('loadstart', handleLoadStart);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('loadstart', handleLoadStart);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [trackIndex]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isExpanded && !target.closest('[data-audio-player]')) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(console.error);
    } else {
      audio.pause();
    }
  };

  const nextTrack = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const wasPlaying = !audio.paused;
    const nextIndex = (trackIndex + 1) % tracks.length;
    
    // Pausa o áudio atual
    audio.pause();
    setIsPlaying(false);
    setTrackIndex(nextIndex);
    
    // Aguarda o novo track carregar e toca se estava tocando antes
    setTimeout(() => {
      if (wasPlaying && audioRef.current) {
        audioRef.current.play().catch(console.error);
      }
    }, 200);
  };

  const selectTrack = (index: number) => {
    const audio = audioRef.current;
    if (!audio) return;

    // Pausa o áudio atual
    audio.pause();
    setIsPlaying(false);
    setTrackIndex(index);
    setIsExpanded(false);
    setIsOpen(true);
    
    // Aguarda o novo track carregar e toca
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(console.error);
      }
    }, 200);
  };

  const openExpandedView = () => {
    setIsExpanded(true);
  };

  const closeExpandedView = () => {
    setIsExpanded(false);
  };

  const minimizePlayer = () => {
    setIsOpen(false);
  };

  if (!isMounted) {
    return null;
  }
  
  return (
    <>
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-md z-40"
          onClick={closeExpandedView}
        />
      )}

      {isExpanded && (
        <div 
          data-audio-player
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-lg rounded-3xl p-8 w-11/12 max-w-3xl z-50 shadow-2xl border border-white/20"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Escolha um som ambiente</h2>
            <button 
              onClick={closeExpandedView}
              className="p-2 rounded-full hover:bg-white/20 transition text-white"
            >
              <IoMdClose size={24} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {tracks.map((track, idx) => (
              <button
                key={idx}
                onClick={() => selectTrack(idx)}
                className={`p-4 rounded-xl transition-all flex items-center gap-2 hover:scale-105 border ${
                  trackIndex === idx
                    ? "bg-white/30 text-white shadow-lg border-white/40"
                    : "bg-black/60 hover:bg-black/40 text-white/90 border-white/20 hover:border-white/40"
                }`}
              >
                {trackIndex === idx && isPlaying ? (
                  <FaPause size={16} />
                ) : (
                  <FaPlay size={16} />
                )}
                <span className="font-medium">{track.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        src={tracks[trackIndex].file}
        onEnded={nextTrack}
        loop
        preload="metadata"
      />

      {!isExpanded && (
        <div
          data-audio-player
          className={`fixed bottom-8 right-8 z-50 transition-all duration-300 cursor-move ${
            isOpen 
              ? "bg-black/70 backdrop-blur-md shadow-lg rounded-2xl p-4 w-64 border border-white/30" 
              : "bg-black/60 backdrop-blur-sm shadow-lg rounded-full p-3 hover:bg-black/40 hover:scale-110 transition-all border border-white/20"
          }`}
        >
          {isOpen ? (
            <>
              <div className="flex items-center justify-between">
                <button
                  onClick={openExpandedView}
                  className="flex items-center gap-2 font-semibold text-white hover:text-white/80"
                >
                  <FaMusic />
                  {tracks[trackIndex].label}
                </button>
                <button 
                  onClick={minimizePlayer}
                  className="text-white/70 hover:text-white"
                >
                  <IoMdClose size={20} />
                </button>
              </div>

              <div className="mt-4 flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <button 
                    onClick={togglePlay}
                    className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition border border-white/30"
                  >
                    {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
                  </button>
                  <button 
                    onClick={nextTrack}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition text-white border border-white/30"
                  >
                    <FaForward size={16} />
                  </button>
                  <div className="flex items-center gap-2">
                    <FaVolumeUp className="text-white/80" />
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.01}
                      value={volume}
                      onChange={(e) => setVolume(parseFloat(e.target.value))}
                      className="accent-white"
                    />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <button 
              onClick={() => setIsOpen(true)} 
              className="flex items-center justify-center relative"
              aria-label="Abrir player de música"
            >
              <FaMusic className="text-white" size={22} />
              {isPlaying && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              )}
            </button>
          )}
        </div>
      )}
    </>
  );
}