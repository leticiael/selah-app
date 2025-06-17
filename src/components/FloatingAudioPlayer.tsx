"use client";

import { useState, useRef, useEffect, useCallback, useMemo, useContext } from "react";
import { 
  RiPlayFill, 
  RiPauseFill, 
  RiSkipForwardFill, 
  RiVolumeUpFill,
  RiCloseFill,
  RiMusicFill,
  RiSoundModuleFill
} from "react-icons/ri";
import { ZenModeContext } from "@/components/ZenModeProvider";

const soundCategories = [
  {
    name: "Natureza",
    icon: RiMusicFill,
    tracks: [
      { label: "Pássaros", file: "/sounds/birds.mp3", icon: RiMusicFill },
      { label: "Água + Vida", file: "/sounds/birdswater.mp3", icon: RiMusicFill },
    ]
  },
  {
    name: "Chuva",
    icon: RiMusicFill,
    tracks: [
      { label: "Tempestade", file: "/sounds/chuva.mp3", icon: RiMusicFill },
      { label: "Gotículas", file: "/sounds/dripping-water-in-cave-114694.mp3", icon: RiMusicFill },
      { label: "Abrigo", file: "/sounds/guardachuva.mp3", icon: RiMusicFill },
    ]
  },
  {
    name: "Foco",
    icon: RiSoundModuleFill,
    tracks: [
      { label: "Pulso", file: "/sounds/coracao.mp3", icon: RiMusicFill },
      { label: "Mente", file: "/sounds/foco.mp3", icon: RiSoundModuleFill },
      { label: "Névoa", file: "/sounds/ruidomarrom.mp3", icon: RiSoundModuleFill },
    ]
  },
  {
    name: "Ambiente",
    icon: RiMusicFill,
    tracks: [
      { label: "Chamas", file: "/sounds/fogo.mp3", icon: RiMusicFill },
      { label: "Melodia", file: "/sounds/piano.mp3", icon: RiMusicFill },
      { label: "Cosmos", file: "/sounds/space.mp3", icon: RiMusicFill },
      { label: "Código", file: "/sounds/teclado.mp3", icon: RiMusicFill },
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
  const audioRef = useRef<HTMLAudioElement | null>(null);
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
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = allTracks[index].file;
      if (playing) {
        audioRef.current.play().catch(() => {});
      }
    }
    // eslint-disable-next-line
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

  if (isZenMode) return null;

  return (
    <>
      {(open || expanded) && (
        <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-3xl" />
      )}

      {expanded && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[10000] bg-black/30 backdrop-blur-3xl border border-white/10 shadow-2xl flex flex-col sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[95%] sm:max-w-md sm:h-[85%] sm:rounded-3xl md:max-w-lg lg:max-w-xl"
        >
          <div className="flex justify-between items-center p-6 sm:p-7 border-b border-white/10 flex-shrink-0 bg-black/40 backdrop-blur-3xl min-h-[80px]">
            <h2 className="text-xl sm:text-2xl font-light text-white tracking-wider">Sons</h2>
            <button
              className="p-4 hover:bg-white/20 rounded-2xl text-white/60 hover:text-white transition-all touch-manipulation"
              onClick={() => setExpanded(false)}
            >
              <RiCloseFill size={26} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto overflow-x-hidden backdrop-blur-3xl" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="p-5 sm:p-6 space-y-6 sm:space-y-8">
              {soundCategories.map((category, categoryIndex) => {
                const CategoryIcon = category.icon;
                return (
                  <div key={categoryIndex} className="space-y-5">
                    <div className="flex items-center gap-4 text-white/80 bg-black/60 backdrop-blur-3xl px-5 py-4 rounded-2xl sticky top-0 z-20 min-h-[60px]">
                      <CategoryIcon size={22} />
                      <h3 className="text-lg font-medium tracking-wide uppercase">{category.name}</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                      {category.tracks.map((track, trackIndex) => {
                        const globalTrackIndex = soundCategories
                          .slice(0, categoryIndex)
                          .reduce((acc, cat) => acc + cat.tracks.length, 0) + trackIndex;
                        const IconComponent = track.icon;
                        const isActive = index === globalTrackIndex;
                        return (
                          <button
                            key={trackIndex}
                            onClick={() => selectTrack(globalTrackIndex)}
                            className={`p-6 sm:p-8 rounded-3xl text-lg font-semibold flex items-center gap-5 transition-all hover:scale-[1.02] active:scale-[0.98] border text-left min-h-[90px] sm:min-h-[100px] touch-manipulation ${
                              isActive
                                ? "bg-white/30 text-white border-white/40 shadow-2xl backdrop-blur-3xl"
                                : "bg-white/15 text-white/90 hover:bg-white/25 border-white/15 hover:text-white active:bg-white/35 backdrop-blur-3xl"
                            }`}
                          >
                            <IconComponent size={28} className="flex-shrink-0" />
                            <span className="text-lg sm:text-xl truncate flex-1 tracking-wide font-semibold">{track.label}</span>
                            {isActive && playing && (
                              <div className="w-4 h-4 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="h-24" />
          </div>
        </div>
      )}

      {!expanded && (
        <div
          ref={playerRef}
          className={`fixed z-[10001] bg-black/50 backdrop-blur-3xl border border-white/30 shadow-2xl transition-all duration-300 ease-out ${
            open 
              ? "w-72 sm:w-80 p-5 rounded-3xl" 
              : "w-16 h-16 p-0 rounded-3xl hover:scale-110 active:scale-95 hover:bg-black/60 cursor-grab active:cursor-grabbing"
          }`}
          style={{ top: position.y, left: position.x }}
          onMouseDown={open ? undefined : handleMouseDown}
        >
          {open ? (
            <div className="space-y-5">
              <button
                onClick={() => setExpanded(true)}
                className="w-full text-white text-base font-medium flex items-center gap-4 hover:text-emerald-300 transition-colors p-5 hover:bg-white/15 rounded-2xl touch-manipulation min-h-[70px] backdrop-blur-3xl bg-white/10"
              >
                <RiMusicFill size={22} className="flex-shrink-0" />
                <span className="truncate flex-1 text-left text-lg font-semibold">{currentTrack.label}</span>
              </button>
              <button
  onClick={() => { setOpen(false); setExpanded(false); }}
                className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors p-4 hover:bg-white/20 rounded-2xl touch-manipulation"
              >
                <RiCloseFill size={22} />
              </button>
              <div className="flex items-center gap-5">
                <button
                  onClick={playPause}
                  className="w-20 h-20 rounded-3xl bg-white/25 text-white hover:bg-white/35 active:bg-white/45 transition-all backdrop-blur-3xl flex items-center justify-center border border-white/20 touch-manipulation"
                >
                  {playing ? <RiPauseFill size={26} /> : <RiPlayFill size={26} />}
                </button>
                <button
                  onClick={next}
                  className="w-20 h-20 rounded-3xl bg-white/15 text-white/80 hover:bg-white/25 hover:text-white active:bg-white/35 transition-all backdrop-blur-3xl flex items-center justify-center border border-white/15 touch-manipulation"
                >
                  <RiSkipForwardFill size={26} />
                </button>
                <div className="flex items-center gap-4 flex-1">
                  <RiVolumeUpFill className="text-white/70" size={22} />
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={e => setVolume(parseFloat(e.target.value))}
                    className="flex-1 h-6 bg-white/25 rounded-full appearance-none slider backdrop-blur-3xl touch-manipulation"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #10b981 ${volume * 100}%, rgba(255,255,255,0.25) ${volume * 100}%, rgba(255,255,255,0.25) 100%)`
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => setOpen(true)}
              className="w-full h-full flex items-center justify-center text-white relative touch-manipulation"
            >
              <RiMusicFill size={24} />
              {playing && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full">
                  <div className="w-4 h-4 bg-emerald-400 rounded-full animate-ping absolute" />
                </div>
              )}
            </button>
          )}
        </div>
      )}
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 32px;
          height: 32px;
          background: #10b981;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 20px rgba(16, 185, 129, 1);
          border: 5px solid rgba(255,255,255,0.7);
        }
        .slider::-moz-range-thumb {
          width: 32px;
          height: 32px;
          background: #10b981;
          border-radius: 50%;
          cursor: pointer;
          border: 5px solid rgba(255,255,255,0.7);
          box-shadow: 0 0 20px rgba(16, 185, 129, 1);
        }
      `}</style>
    </>
  );
}