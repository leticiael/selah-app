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

// Flatten all tracks for easy access
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

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (globalState.expanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [globalState.expanded]);

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
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        globalState.expanded
      ) {
        updateGlobalState({ expanded: false });
      }

      if (
        playerRef.current &&
        !playerRef.current.contains(event.target as Node) &&
        globalState.open &&
        !globalState.expanded
      ) {
        updateGlobalState({ open: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentTrack = useMemo(() => allTracks[globalState.index], [globalState.index]);

  const playPause = useCallback(() => {
    if (!globalAudio) return;

    if (globalAudio.paused) {
      globalAudio.play().catch(() => {});
    } else {
      globalAudio.pause();
    }
  }, []);

  const next = useCallback(() => {
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
    // Não permitir drag quando o modal expandido estiver aberto
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

  if (isZenMode) {
    return null;
  }

  return (
    <>
      {/* Overlay para o modal expandido */}
      {globalState.expanded && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md" />
      )}

      {/* Modal expandido de seleção de música */}
      {globalState.expanded && (
        <div
          ref={modalRef}
          className="fixed inset-1 z-50 bg-black/30 backdrop-blur-2xl border border-white/5 shadow-2xl rounded-xl flex flex-col xs:inset-2 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[85%] sm:max-w-lg sm:h-auto sm:rounded-2xl md:max-w-xl lg:max-w-2xl"
        >
          {/* Header minimalista */}
          <div className="flex justify-between items-center p-4 sm:p-5 border-b border-white/5 flex-shrink-0">
            <h2 className="text-base sm:text-lg font-light text-white/90 tracking-wider">Sons</h2>
            <button
              className="p-3 hover:bg-white/10 rounded-xl text-white/40 hover:text-white/80 transition-all touch-manipulation"
              onClick={() => updateGlobalState({ expanded: false })}
            >
              <RiCloseFill size={20} />
            </button>
          </div>

          {/* Conteúdo com scroll otimizado */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-3 sm:p-4 space-y-4 sm:space-y-5">
              {soundCategories.map((category, categoryIndex) => {
                const CategoryIcon = category.icon;
                return (
                  <div key={categoryIndex} className="space-y-3">
                    {/* Header categoria minimalista */}
                    <div className="flex items-center gap-3 text-white/60 sticky top-0 bg-black/50 backdrop-blur-md px-3 py-2 rounded-lg">
                      <CategoryIcon size={16} />
                      <h3 className="text-sm font-medium tracking-wide uppercase">{category.name}</h3>
                    </div>
                    
                    {/* Grid ultra responsivo com botões maiores */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                            className={`p-4 sm:p-5 rounded-xl text-sm font-light flex items-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] border text-left min-h-[64px] sm:min-h-[72px] touch-manipulation ${
                              isActive
                                ? "bg-white/20 text-white border-white/25 shadow-lg"
                                : "bg-white/8 text-white/80 hover:bg-white/15 border-white/8 hover:text-white active:bg-white/20"
                            }`}
                          >
                            <IconComponent size={20} className="flex-shrink-0 opacity-80" />
                            <span className="text-sm sm:text-base truncate flex-1 tracking-wide font-medium">{track.label}</span>
                            {isActive && globalState.playing && (
                              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Espaço final para scroll */}
            <div className="h-6" />
          </div>
        </div>
      )}

      {/* Player flutuante - só aparece quando modal não está expandido */}
      {!globalState.expanded && (
        <div
          ref={playerRef}
          className={`fixed z-30 bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300 ease-out ${
            globalState.open 
              ? "w-64 sm:w-72 p-4 rounded-3xl cursor-default" 
              : "w-14 h-14 p-0 rounded-2xl hover:scale-105 active:scale-95 hover:bg-black/50 cursor-grab active:cursor-grabbing"
          }`}
          style={{ top: globalState.position.y, left: globalState.position.x }}
          onMouseDown={handleMouseDown}
        >
          {globalState.open ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => updateGlobalState({ expanded: true })}
                  className="text-white text-sm font-light flex items-center gap-3 hover:text-emerald-300 transition-colors flex-1 min-w-0 touch-manipulation"
                >
                  <RiMusicFill size={16} className="flex-shrink-0" />
                  <span className="truncate">{currentTrack.label}</span>
                </button>
                <button
                  onClick={() => updateGlobalState({ open: false })}
                  className="text-white/60 hover:text-white transition-colors p-2 ml-2 flex-shrink-0 touch-manipulation"
                >
                  <RiCloseFill size={16} />
                </button>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={playPause}
                  className="w-12 h-12 rounded-2xl bg-white/20 text-white hover:bg-white/30 transition-all backdrop-blur-sm flex items-center justify-center border border-white/10 touch-manipulation"
                >
                  {globalState.playing ? <RiPauseFill size={18} /> : <RiPlayFill size={18} />}
                </button>
                
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-2xl bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-all backdrop-blur-sm flex items-center justify-center border border-white/10 touch-manipulation"
                >
                  <RiSkipForwardFill size={18} />
                </button>
                
                <div className="flex items-center gap-2 flex-1">
                  <RiVolumeUpFill className="text-white/60" size={16} />
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={globalState.volume}
                    onChange={(e) => updateGlobalState({ volume: parseFloat(e.target.value) })}
                    className="flex-1 h-3 bg-white/20 rounded-full appearance-none slider backdrop-blur-sm touch-manipulation"
                    style={{
                      background: `linear-gradient(to right, #10b981 0%, #10b981 ${globalState.volume * 100}%, rgba(255,255,255,0.2) ${globalState.volume * 100}%, rgba(255,255,255,0.2) 100%)`
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
              <RiMusicFill size={20} />
              {globalState.playing && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping absolute" />
                </div>
              )}
            </button>
          )}
        </div>
      )}
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          background: #10b981;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.6);
          border: 3px solid rgba(255,255,255,0.3);
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: #10b981;
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid rgba(255,255,255,0.3);
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.6);
        }

        @media (max-width: 640px) {
          .slider::-webkit-slider-thumb {
            width: 24px;
            height: 24px;
          }
          
          .slider::-moz-range-thumb {
            width: 24px;
            height: 24px;
          }
        }
      `}</style>
    </>
  );
}