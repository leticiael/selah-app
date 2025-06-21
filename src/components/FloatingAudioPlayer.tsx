"use client";
import React, { useState, useRef, useEffect, useCallback, useContext } from "react";
import AudioPlayerControls from "./AudioPlayerControls";
import FloatingPlayerButton from "./FloatingPlayerButton";
import { LuBird, LuCloudRain, LuDroplets, LuFeather, LuFlame, LuHeartPulse, LuKeyboard, LuLeaf, LuMoon, LuPiano, LuWaves, LuWind } from "react-icons/lu";
import { ZenModeContext } from "./ZenModeProvider";

const allTracks = [
  { label: "Pássaros", file: "/sounds/birds.mp3", icon: LuBird, category: "Natureza" },
  { label: "Água Corrente", file: "/sounds/birdswater.mp3", icon: LuWaves, category: "Natureza" },
  { label: "Chuva Forte", file: "/sounds/chuva.mp3", icon: LuCloudRain, category: "Chuva" },
  { label: "Pingos Suaves", file: "/sounds/dripping-water-in-cave-114694.mp3", icon: LuDroplets, category: "Chuva" },
  { label: "Abrigo", file: "/sounds/guardachuva.mp3", icon: LuFeather, category: "Chuva" },
  { label: "Fogueira", file: "/sounds/fogo.mp3", icon: LuFlame, category: "Ambiente" },
  { label: "Piano", file: "/sounds/piano.mp3", icon: LuPiano, category: "Ambiente" },
  { label: "Noite", file: "/sounds/space.mp3", icon: LuMoon, category: "Ambiente" },
  { label: "Teclado", file: "/sounds/teclado.mp3", icon: LuKeyboard, category: "Ambiente" },
  { label: "Batimento", file: "/sounds/coracao.mp3", icon: LuHeartPulse, category: "Relaxamento" },
  { label: "Ruído Suave", file: "/sounds/foco.mp3", icon: LuFeather, category: "Relaxamento" },
  { label: "Névoa", file: "/sounds/ruidomarrom.mp3", icon: LuCloudRain, category: "Relaxamento" },
];

const categoryLabels: Record<string, string> = {
  Natureza: "Sons da Natureza",
  Chuva: "Chuva & Água",
  Ambiente: "Ambiente & Instrumental",
  Relaxamento: "Relaxamento",
};

export default function FloatingAudioPlayer() {
  const { isZenMode } = useContext(ZenModeContext);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [position, setPosition] = useState({ x: 16, y: 16 });
  const audioRef = useRef<any>(null);
  const dragging = useRef(false);
  const playerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(allTracks[index].file);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }
    const audio = audioRef.current;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = allTracks[index].file;
      if (playing) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [index]);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  useEffect(() => {
    if (open || expanded) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [open, expanded]);
  useEffect(() => {
    if (!open && !expanded) return;
    function handleClick(e: MouseEvent) {
      if (
        (modalRef.current && !modalRef.current.contains(e.target as Node)) &&
        (playerRef.current && !playerRef.current.contains(e.target as Node))
      ) {
        setOpen(false);
        setExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, expanded]);
  const currentTrack = allTracks[index];
  const playPause = useCallback(() => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, []);
  const next = useCallback(() => {
    setIndex(i => (i + 1) % allTracks.length);
  }, []);
  const prev = useCallback(() => {
    setIndex(i => (i - 1 + allTracks.length) % allTracks.length);
  }, []);
  const selectTrack = useCallback((trackIndex: number) => {
    setIndex(trackIndex);
    setExpanded(false);
    setOpen(true);
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }, 100);
  }, []);
  const handleMouseDown = (e: React.MouseEvent) => {
    if (expanded) return;
    dragging.current = true;
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = position;
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragging.current) return;
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      const newX = Math.max(8, Math.min(window.innerWidth - (open ? 340 : 64), startPos.x + dx));
      const newY = Math.max(8, Math.min(window.innerHeight - (open ? 180 : 64), startPos.y + dy));
      setPosition({ x: newX, y: newY });
    };
    const handleMouseUp = () => {
      dragging.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Agrupamento fluido para o modal
  const grouped = allTracks.reduce((acc, track) => {
    if (!acc[track.category]) acc[track.category] = [];
    acc[track.category].push(track);
    return acc;
  }, {} as Record<string, typeof allTracks>);

  return (
    <>
      {(open || expanded) && (
        <div className="fixed inset-0 z-[9999] bg-black/30 backdrop-blur-2xl transition-all" />
      )}
      {expanded && (
        <div
          ref={modalRef}
          className="fixed inset-0 flex items-center justify-center z-[10002] px-2"
        >
          <div className="w-full max-w-md sm:max-w-lg mx-auto rounded-3xl bg-black/30 backdrop-blur-2xl shadow-2xl p-4 sm:p-6">
            <div className="mb-4 flex justify-between items-center">
              <span className="text-base sm:text-lg font-semibold text-white/80">Escolha um som ambiente</span>
              <button
                onClick={() => setExpanded(false)}
                className="text-white/60 hover:text-fuchsia-300 text-2xl px-2 py-1 rounded transition"
                aria-label="Fechar"
              >
                ×
              </button>
            </div>
            <div className="space-y-5">
              {Object.entries(grouped).map(([category, tracks]) => (
                <div key={category}>
                  <div className="text-xs text-white/50 mb-2 pl-2">{categoryLabels[category] || category}</div>
                  <div className="flex flex-wrap gap-2">
                    {tracks.map((track, idx) => (
                      <button
                        key={track.label}
                        onClick={() => selectTrack(allTracks.findIndex(t => t.label === track.label))}
                        className={`rounded-xl px-3 py-2 flex items-center gap-2 bg-white/10 hover:bg-fuchsia-900/30 text-white/90 transition-all text-sm sm:text-base ${
                          index === allTracks.findIndex(t => t.label === track.label) ? "ring-2 ring-fuchsia-400" : ""
                        }`}
                        style={{ minWidth: 110 }}
                      >
                        <track.icon className="w-5 h-5" />
                        <span>{track.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {!expanded && (
        <div
          ref={playerRef}
          className={`fixed z-[10001] transition-all duration-300 ease-out ${
            open 
              ? "w-[95vw] max-w-md p-4 rounded-3xl bg-black/30 backdrop-blur-2xl shadow-2xl left-1/2 -translate-x-1/2 bottom-6"
              : "w-16 h-16 p-0 rounded-3xl bg-black/30 backdrop-blur-2xl hover:scale-110 active:scale-95 cursor-grab active:cursor-grabbing left-4 bottom-4"
          }`}
          style={{
            top: open ? undefined : position.y,
            left: open ? undefined : position.x,
            right: open ? undefined : undefined,
            display: isZenMode ? "none" : undefined,
          }}
          onMouseDown={open ? undefined : handleMouseDown}
        >
          {open ? (
            <div className="space-y-4">
              <button
                onClick={() => setExpanded(true)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 hover:bg-fuchsia-900/20 text-white/80 hover:text-white transition-all text-base font-semibold tracking-wide"
              >
                <span className="flex items-center gap-2">
                  {currentTrack.icon && <currentTrack.icon className="w-5 h-5" />}
                  {currentTrack.label}
                </span>
                <span className="ml-auto text-xs uppercase tracking-widest">Trocar</span>
              </button>
              <button
                onClick={() => { setOpen(false); setExpanded(false); }}
                className="w-full flex items-center justify-center px-4 py-3 rounded-2xl bg-white/10 hover:bg-fuchsia-900/20 text-white/80 hover:text-white transition-all text-base font-semibold tracking-wide"
              >
                Fechar
              </button>
              <AudioPlayerControls
                playPause={playPause}
                next={next}
                prev={prev}
                playing={playing}
                volume={volume}
                setVolume={setVolume}
              />
            </div>
          ) : (
            <FloatingPlayerButton setOpen={setOpen} playing={playing} />
          )}
        </div>
      )}
    </>
  );
}