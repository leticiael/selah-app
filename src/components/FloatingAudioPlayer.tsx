"use client";

import { useState, useRef, useEffect, useCallback, useMemo, useContext } from "react";
import { FaPlay, FaPause, FaForward, FaVolumeUp, FaMusic } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { ZenModeContext } from "@/components/ZenModeProvider";

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

// Global state que persiste entre navegações
let globalAudio: HTMLAudioElement | null = null;
let globalState = {
  open: false,
  expanded: false,
  playing: false,
  index: 0,
  volume: 0.5,
  position: { x: 32, y: 32 }
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
    if (!globalAudio) {
      globalAudio = new Audio();
      globalAudio.src = tracks[globalState.index].file;
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
        const nextIndex = (globalState.index + 1) % tracks.length;
        globalAudio!.src = tracks[nextIndex].file;
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
      globalAudio.src = tracks[globalState.index].file;
    }
  }, [globalState.index]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        playerRef.current &&
        !playerRef.current.contains(event.target as Node) &&
        globalState.open
      ) {
        updateGlobalState({ open: false });
      }

      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node) &&
        globalState.expanded
      ) {
        updateGlobalState({ expanded: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const currentTrack = useMemo(() => tracks[globalState.index], [globalState.index]);

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

    const nextIndex = (globalState.index + 1) % tracks.length;
    const wasPlaying = !globalAudio.paused;
    
    globalAudio.pause();
    updateGlobalState({ index: nextIndex });

    setTimeout(() => {
      if (wasPlaying && globalAudio) {
        globalAudio.play().catch(() => {});
      }
    }, 100);
  }, []);

  const selectTrack = useCallback((i: number) => {
    if (!globalAudio) return;

    globalAudio.pause();
    updateGlobalState({ 
      index: i, 
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
    dragging.current = true;
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = globalState.position;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragging.current) return;
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      const newX = Math.max(0, Math.min(window.innerWidth - 180, startPos.x + dx));
      const newY = Math.max(0, Math.min(window.innerHeight - 180, startPos.y + dy));
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
      {globalState.expanded && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
      )}

      {globalState.expanded && (
        <div
          ref={modalRef}
          className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-neutral-950/90 backdrop-blur-md border border-white/20 shadow-2xl rounded-3xl p-6 w-11/12 max-w-2xl"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-white">Ambientes Sonoros</h2>
            <button
              className="p-2 hover:bg-white/10 rounded-full text-white"
              onClick={() => updateGlobalState({ expanded: false })}
            >
              <IoMdClose size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {tracks.map((t, i) => (
              <button
                key={i}
                onClick={() => selectTrack(i)}
                className={`px-3 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all
                  ${globalState.index === i
                    ? "bg-white/20 text-white"
                    : "bg-white/5 text-white/80 hover:bg-white/10"
                  }`}
              >
                {globalState.index === i && globalState.playing ? <FaPause size={14} /> : <FaPlay size={14} />}
                {t.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {!globalState.expanded && (
        <div
          ref={playerRef}
          className={`fixed z-50 ${globalState.open ? "w-64 p-4" : "p-3"} bg-neutral-800/80 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl`}
          style={{ top: globalState.position.y, left: globalState.position.x }}
          onMouseDown={handleMouseDown}
        >
          {globalState.open ? (
            <>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => updateGlobalState({ expanded: true })}
                  className="text-white text-sm font-medium flex items-center gap-2"
                >
                  <FaMusic size={16} />
                  {currentTrack.label}
                </button>
                <button
                  onClick={() => updateGlobalState({ open: false })}
                  className="text-white/60 hover:text-white"
                >
                  <IoMdClose size={16} />
                </button>
              </div>
              <div className="flex justify-between items-center mt-4 gap-3">
                <button
                  onClick={playPause}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  {globalState.playing ? <FaPause size={14} /> : <FaPlay size={14} />}
                </button>
                <button
                  onClick={next}
                  className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20"
                >
                  <FaForward size={14} />
                </button>
                <div className="flex items-center gap-2 w-full">
                  <FaVolumeUp className="text-white/60" size={14} />
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={globalState.volume}
                    onChange={(e) => updateGlobalState({ volume: parseFloat(e.target.value) })}
                    className="w-full accent-white"
                  />
                </div>
              </div>
            </>
          ) : (
            <button onClick={() => updateGlobalState({ open: true })} className="text-white relative">
              <FaMusic size={20} />
              {globalState.playing && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full animate-ping" />
              )}
            </button>
          )}
        </div>
      )}
    </>
  );
}