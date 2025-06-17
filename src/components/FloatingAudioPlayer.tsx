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
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
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
      {/* Overlay para o modal expandido */}
      {globalState.expanded && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md" />
      )}

      {/* Modal expandido de seleção de música */}
      {globalState.expanded && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-2xl border border-white/5 shadow-2xl flex flex-col sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[90%] sm:max-w-lg sm:h-[90%] sm:rounded-2xl md:max-w-xl lg:max-w-2xl"
        >
          {/* Header fixo */}
          <div className="flex justify-between items-center p-4 sm:p-5 border-b border-white/5 flex-shrink-0 bg-black/20 backdrop-blur-md">
            <h2 className="text-lg sm:text-xl font-light text-white/90 tracking-wider">Sons Ambientes</h2>
            <button
              className="p-3 hover:bg-white/10 rounded-xl text-white/40 hover:text-white/80 transition-all touch-manipulation"
              onClick={() => updateGlobalState({ expanded: false })}
            >
              <RiCloseFill size={22} />
            </button>
          </div>

          {/* Conteúdo scrollável */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden" style={{ WebkitOverflowScrolling: 'touch' }}>
            <div className="p-4 sm:p-5 space-y-5 sm:space-y-6">
              {soundCategories.map((category, categoryIndex) => {
                const CategoryIcon = category.icon;
                return (
                  <div key={categoryIndex} className="space-y-4">
                    {/* Header categoria com melhor visibilidade */}
                    <div className="flex items-center gap-3 text-white/70 bg-black/40 backdrop-blur-md px-4 py-3 rounded-xl sticky top-0 z-10">
                      <CategoryIcon size={18} />
                      <h3 className="text-base font-medium tracking-wide uppercase">{category.name}</h3>
                    </div>
                    
                    {/* Grid com botões mega clicáveis */}
                    <div className="grid grid-cols-1 gap-4">
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
                            className={`p-5 sm:p-6 rounded-2xl text-base font-medium flex items-center gap-4 transition-all hover:scale-[1.02] active:scale-[0.98] border text-left min-h-[72px] sm:min-h-[80px] touch-manipulation ${
                              isActive
                                ? "bg-white/25 text-white border-white/30 shadow-xl"
                                : "bg-white/10 text-white/85 hover:bg-white/20 border-white/10 hover:text-white active:bg-white/25"
                            }`}
                          >
                            <IconComponent size={24} className="flex-shrink-0 opacity-90" />
                            <span className="text-base sm:text-lg truncate flex-1 tracking-wide font-medium">{track.label}</span>
                            {isActive && globalState.playing && (
                              <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse flex-shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Espaço final generoso para scroll completo */}
            <div className="h-16" />
          </div>
        </div>
      )}

      {/* Player flutuante - só aparece quando modal não está expandido */}
      {!globalState.expanded && (
        <div
          ref={playerRef}
          className={`fixed z-30 bg-black/40 backdrop-blur-xl border border-white/20 shadow-2xl transition-all duration-300 ease-out ${
            globalState.open 
              ? "w-64 sm:w-72 p-4 rounded-3xl" 
              : "w-14 h-14 p-0 rounded-2xl hover:scale-105 active:scale-95 hover:bg-black/50 cursor-grab active:cursor-grabbing"
          }`}
          style={{ top: globalState.position.y, left: globalState.position.x }}
          onMouseDown={globalState.open ? undefined : handleMouseDown}
        >
          {globalState.open ? (
            <div className="space-y-4">
              {/* Header clicável mega grande para abrir modal */}
              <button
                onClick={openModal}
                className="w-full text-white text-sm font-light flex items-center gap-3 hover:text-emerald-300 transition-colors p-4 hover:bg-white/10 rounded-xl touch-manipulation min-h-[56px]"
              >
                <RiMusicFill size={18} className="flex-shrink-0" />
                <span className="truncate flex-1 text-left text-base">{currentTrack.label}</span>
              </button>
              
              {/* Botão fechar maior */}
              <button
                onClick={() => updateGlobalState({ open: false })}
                className="absolute top-2 right-2 text-white/60 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-xl touch-manipulation"
              >
                <RiCloseFill size={18} />
              </button>
              
              {/* Controles mega clicáveis */}
              <div className="flex items-center gap-4">
                <button
                  onMouseDown={playPause}
                  onTouchStart={playPause}
                  className="w-16 h-16 rounded-2xl bg-white/20 text-white hover:bg-white/30 active:bg-white/40 transition-all backdrop-blur-sm flex items-center justify-center border border-white/10 touch-manipulation"
                >
                  {globalState.playing ? <RiPauseFill size={22} /> : <RiPlayFill size={22} />}
                </button>
                
                <button
                  onMouseDown={next}
                  onTouchStart={next}
                  className="w-16 h-16 rounded-2xl bg-white/10 text-white/80 hover:bg-white/20 hover:text-white active:bg-white/30 transition-all backdrop-blur-sm flex items-center justify-center border border-white/10 touch-manipulation"
                >
                  <RiSkipForwardFill size={22} />
                </button>
                
                <div className="flex items-center gap-3 flex-1">
                  <RiVolumeUpFill className="text-white/60" size={18} />
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={globalState.volume}
                    onChange={handleVolumeChange}
                    onMouseDown={(e) => e.stopPropagation()}
                    onTouchStart={(e) => e.stopPropagation()}
                    className="flex-1 h-5 bg-white/20 rounded-full appearance-none slider backdrop-blur-sm touch-manipulation"
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
          width: 28px;
          height: 28px;
          background: #10b981;
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.8);
          border: 4px solid rgba(255,255,255,0.5);
        }
        
        .slider::-moz-range-thumb {
          width: 28px;
          height: 28px;
          background: #10b981;
          border-radius: 50%;
          cursor: pointer;
          border: 4px solid rgba(255,255,255,0.5);
          box-shadow: 0 0 15px rgba(16, 185, 129, 0.8);
        }
      `}</style>
    </>
  );
}