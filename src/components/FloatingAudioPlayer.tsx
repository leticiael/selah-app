"use client";
import React, { useState, useRef, useEffect, useCallback, useContext } from "react";
import { RiMusicFill, RiSoundModuleFill } from "react-icons/ri";
import AudioPlayerControls from "./AudioPlayerControls";
import TrackListModal from "./TrackListModal";
import FloatingPlayerButton from "./FloatingPlayerButton";
import { LuBird, LuCloudRain, LuDroplets, LuFeather, LuFlame, LuHeartPulse, LuKeyboard, LuLeaf, LuMoon, LuPiano, LuWaves, LuWind } from "react-icons/lu";
import { HeartIcon } from "@heroicons/react/24/solid";
import { ZenModeContext } from "./ZenModeProvider";

const soundCategories = [
  {
    name: "Natureza",
    icon: LuLeaf,
    tracks: [
      { label: "Pássaros", file: "/sounds/birds.mp3", icon: LuBird },
      { label: "Água Corrente", file: "/sounds/birdswater.mp3", icon: LuWaves },
    ]
  },
  {
    name: "Chuva",
    icon: LuCloudRain,
    tracks: [
      { label: "Chuva Forte", file: "/sounds/chuva.mp3", icon: LuCloudRain },
      { label: "Pingos Suaves", file: "/sounds/dripping-water-in-cave-114694.mp3", icon: LuDroplets },
      { label: "Abrigo", file: "/sounds/guardachuva.mp3", icon: LuFeather },
    ]
  },
  {
    name: "Ambiente",
    icon: LuMoon,
    tracks: [
      { label: "Fogueira", file: "/sounds/fogo.mp3", icon: LuFlame },
      { label: "Piano", file: "/sounds/piano.mp3", icon: LuPiano },
      { label: "Noite", file: "/sounds/space.mp3", icon: LuMoon },
      { label: "Teclado", file: "/sounds/teclado.mp3", icon: LuKeyboard },
    ]
  },
  {
    name: "Ar & Vento",
    icon: LuWind,
    tracks: [
      { label: "Batimento", file: "/sounds/coracao.mp3", icon: LuHeartPulse },
      { label: "Ruído Suave", file: "/sounds/foco.mp3", icon: LuFeather },
      { label: "Névoa", file: "/sounds/ruidomarrom.mp3", icon: LuCloudRain },
    ]
  }
];
const allTracks = soundCategories.flatMap(category => category.tracks);

export default function FloatingAudioPlayer() {
  const { isZenMode } = useContext(ZenModeContext);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [index, setIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [position, setPosition] = useState({ x: 20, y: 20 });
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
      const newX = Math.max(8, Math.min(window.innerWidth - (open ? 320 : 64), startPos.x + dx));
      const newY = Math.max(8, Math.min(window.innerHeight - (open ? 140 : 64), startPos.y + dy));
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
  return (
    <>
      {(open || expanded) && (
        <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-3xl" />
      )}
      {expanded && (
        <TrackListModal
          modalRef={modalRef as React.RefObject<HTMLDivElement>}
          setExpanded={setExpanded}
          selectTrack={selectTrack}
          soundCategories={soundCategories}
          index={index}
          playing={playing}
        />
      )}
      {!expanded && (
        <div
          ref={playerRef}
          className={`fixed z-[10001] bg-black/50 backdrop-blur-3xl border border-white/30 shadow-2xl transition-all duration-300 ease-out ${
            open 
              ? "w-72 sm:w-80 p-5 rounded-3xl" 
              : "w-16 h-16 p-0 rounded-3xl hover:scale-110 active:scale-95 hover:bg-black/60 cursor-grab active:cursor-grabbing"
          }`}
          style={{ top: position.y, left: position.x, display: isZenMode ? "none" : undefined }}
          onMouseDown={open ? undefined : handleMouseDown}
        >
          {open ? (
            <div className="space-y-5">
              <button onClick={() => setExpanded(true)} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all text-lg font-semibold tracking-wide">
                <span>{currentTrack.label}</span>
                <span className="ml-auto text-xs uppercase tracking-widest">Trocar</span>
              </button>
              <button onClick={() => { setOpen(false); setExpanded(false); }} className="w-full flex items-center justify-center px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all text-lg font-semibold tracking-wide">
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