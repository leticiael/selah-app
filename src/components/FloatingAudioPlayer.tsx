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

let globalAudio: HTMLAudioElement | null = null;
let globalState = {
  open: false,
  expanded: false,
  playing: false,
  index: 0,
  volume: 0.5,
  position: { x: 20, y: 20 }
};

const listeners = new Set<() => void>();

function updateGlobalState(newState: Partial<typeof globalState>) {
  globalState = { ...globalState, ...newState };
  listeners.forEach(listener => listener());
}

export default function FloatingAudioPlayer() {
  const [, forceUpdate] = useState({});
  const { isZenMode } = useContext(ZenModeContext);
  const playerRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  useEffect(() => {
    const listener = () => forceUpdate({});
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  useEffect(() => {
    if (globalState.expanded || globalState.open) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [globalState.expanded, globalState.open]);

  useEffect(() => {
    if (!globalAudio) {
      globalAudio = new Audio();
      globalAudio.src = allTracks[globalState.index].file;
      globalAudio.volume = globalState.volume;
      globalAudio.loop = true;
      globalAudio.preload = "metadata";
      globalAudio.addEventListener('play', () => {
        updateGlobalState({ playing: true });
      });
      globalAudio.addEventListener('pause', () => {
        updateGlobalState({ playing: false });
      });
      globalAudio.addEventListener('ended', () => {
        const nextIndex = (globalState.index + 1) % allTracks.length;
        globalAudio!.src = allTracks[nextIndex].file;
        updateGlobalState({ index: nextIndex });
        if (globalState.playing) {
          globalAudio!.play().catch(() => {});
        }
      });
    }
  }, []);

  useEffect(() => {
    if (globalAudio) {
      globalAudio.volume = globalState.volume;
    }
  }, [globalState.volume]);

  useEffect(() => {
    if (globalAudio) {
      globalAudio.src = allTracks[globalState.index].file;
    }
  }, [globalState.index]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        (modalRef.current && !modalRef.current.contains(event.target as Node)) ||
        (playerRef.current && !playerRef.current.contains(event.target as Node))
      ) {
        if (globalState.expanded || globalState.open) {
          updateGlobalState({ expanded: false, open: false });
        }
      }
    };
    if (globalState.expanded || globalState.open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [globalState.expanded, globalState.open]);

  const currentTrack = useMemo(() => allTracks[globalState.index], [globalState.index]);

  const playPause = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!globalAudio) return;
    if (globalAudio.paused) {
      globalAudio.play().catch(() => {});
    } else {
      globalAudio.pause();
    }
  }, []);

  const next = useCallback((e?: React.MouseEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!globalAudio) return;
    const nextIndex = (globalState.index + 1) % allTracks.length;
    const wasPlaying = !globalAudio.paused;
    globalAudio.pause();
    updateGlobalState({ index: nextIndex });
    setTimeout(() => {
      if (wasPlaying && globalAudio) {
        globalAudio.play().catch(() => {});
      }
    }, 100);
  }, []);

  const selectTrack = useCallback((trackIndex: number) => {
    if (!globalAudio) return;
    globalAudio.pause();
    updateGlobalState({ 
      index: trackIndex, 
      expanded: false, 
      open: true 
    });
    setTimeout(() => {
      if (globalAudio) {
        globalAudio.play().catch(() => {});
      }
    }, 100);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (globalState.expanded) return;
    dragging.current = true;
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = globalState.position;
    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragging.current) return;
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      const newX = Math.max(8, Math.min(window.innerWidth - (globalState.open ? 256 : 64), startPos.x + dx));
      const newY = Math.max(8, Math.min(window.innerHeight - (globalState.open ? 120 : 64), startPos.y + dy));
      updateGlobalState({ position: { x: newX, y: newY } });
    };
    const handleMouseUp = () => {
      dragging.current = false;
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    updateGlobalState({ volume: parseFloat(e.target.value) });
  }, []);

  const openModal = useCallback(() => {
    updateGlobalState({ expanded: true });
  }, []);

  if (isZenMode) {
    return null;
  }

  return (
    <>
      {(globalState.expanded || globalState.open) && (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-3xl" />
      )}

      {globalState.expanded && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-3xl border border-white/10 shadow-2xl flex flex-col sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[95%] sm:max-w-md sm:h-[85%] sm:rounded-3xl md:max-w-lg lg:max-w-xl"
        >
          <div 
            className="flex justify-between items-center p-6 sm:p-7 border-b border-white/10 flex-shrink-0 bg-black/40 backdrop-blur-3xl min-h-[80px]"
          >
            <h2 className="text-xl sm:text-2xl font-light text-white tracking-wider">Sons</h2>
            <button
              className="p-4 hover:bg-white/20 rounded-2xl text-white/60 hover:text-white transition-all touch-manipulation"
              onClick={() => updateGlobalState({ expanded: false, open: false })}
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
                    <div 
                      className="flex items-center gap-4 text-white/80 bg-black/60 backdrop-blur-3xl px-5 py-4 rounded-2xl sticky top-0 z-20 min-h-[60px]"
                    >
                      <CategoryIcon size={22} />
                      <h3 className="text-lg font-medium tracking-wide uppercase">{category.name}</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-5">
                      {category.tracks.map((track, trackIndex) => {
                        const globalTrackIndex = soundCategories
                          .slice(0, categoryIndex)
                          .reduce((acc, cat) => acc + cat.tracks.length, 0) + trackIndex;
                        const IconComponent = track.icon;
                        const isActive = globalState.index === globalTrackIndex;
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
                            {isActive && globalState.playing && (
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

      {!globalState.expanded && (
        <div
          ref={playerRef}
          className={`fixed z-[10001] bg-black/50 backdrop-blur-3xl border border-white/30 shadow-2xl transition-all duration-300 ease-out ${
            globalState.open 
              ? "w-72 sm:w-80 p-5 rounded-3xl" 
              : "w-16 h-16 p-0 rounded-3xl hover:scale-110 active:scale-95 hover:bg-black/60 cursor-grab active:cursor-grabbing"
          }`}
          style={{ top: globalState.position.y, left: globalState.position.x }}
          onMouseDown={globalState.open ? undefined : handleMouseDown}
        >
          {globalState.open ? (
            <div className="space-y-5">
              <button
                onClick={openModal}
                className="w-full text-white text-base font-medium flex items-center gap-4 hover:text-emerald-300 transition-colors p-5 hover:bg-white/15 rounded-2xl touch-manipulation min-h-[70px] backdrop-blur-3xl bg-white/10"
              >
                <RiMusicFill size={22} className="flex-shrink-0" />
                <span className="truncate flex-1 text-left text-lg font-semibold">{currentTrack.label}</span>
              </button>
              <button
                onClick={() => updateGlobalState({ open: false, expanded: false })}
                className="absolute top-3 right-3 text-white/60 hover:text-white transition-colors p-4 hover:bg-white/20 rounded-2xl touch-manipulation"
              >
                <RiCloseFill size={22} />
              </button>
              <div className="flex items-center gap-5">
                <button
                  onMouseDown={playPause}
                  onTouchStart={playPause}
                  className="w-20 h-20 rounded-3xl bg-white/25 text-white hover:bg-white/35 active:bg-white/45 transition-all backdrop-blur-3xl flex items-center justify-center border border-white/20 touch-manipulation"
                >
                  {globalState.playing ? <RiPauseFill size={26} /> : <RiPlayFill size={26} />}
                </button>
                <button
                  onMouseDown={next}
                  onTouchStart={next}
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
                    value={globalState.volume}
                    onChange={handleVolumeChange}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    className="flex-1 h-6 bg-white/25 rounded-full appearance-none slider backdrop-blur-3xl touch-manipulation"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #10b981 ${globalState.volume * 100}%, rgba(255,255,255,0.25) ${globalState.volume * 100}%, rgba(255,255,255,0.25) 100%)`
                    }}
                  />
                </div>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => updateGlobalState({ open: true })}
              className="w-full h-full flex items-center justify-center text-white relative touch-manipulation"
            >
              <RiMusicFill size={24} />
              {globalState.playing && (
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