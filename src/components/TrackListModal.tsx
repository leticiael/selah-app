import React from "react";
import { RiCloseFill } from "react-icons/ri";

interface Track { label: string; file: string; icon: any; }
interface SoundCategory { name: string; icon: any; tracks: Track[]; }
interface TrackListModalProps {
  modalRef: React.RefObject<HTMLDivElement>;
  setExpanded: (v: boolean) => void;
  selectTrack: (i: number) => void;
  soundCategories: SoundCategory[];
  index: number;
  playing: boolean;
}

export default function TrackListModal({
  modalRef,
  setExpanded,
  selectTrack,
  soundCategories,
  index,
  playing,
}: TrackListModalProps) {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[60px] transition-all duration-300" />
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-md mx-auto rounded-3xl bg-black/30 shadow-2xl p-0 overflow-hidden"
        style={{
          boxShadow: "0 8px 40px 0 rgba(0,0,0,0.10)",
          backdropFilter: "blur(40px)",
        }}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b border-white/20 bg-black/10 backdrop-blur-2xl">
          <h2 className="text-base sm:text-lg font-light text-white tracking-wider">Sons</h2>
          <button
            className="p-2 hover:bg-white/10 rounded-xl text-white/80 hover:text-white transition-all"
            onClick={() => setExpanded(false)}
            aria-label="Fechar"
          >
            <RiCloseFill size={28} />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-2 py-4 flex flex-col gap-6 sm:px-6 sm:py-8">
          {soundCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <div key={categoryIndex} className="space-y-3">
                <div className="flex items-center gap-2 text-white/90 bg-black/20 px-3 py-2 rounded-2xl shadow-sm w-full">
                  <CategoryIcon size={20} />
                  <h3 className="text-sm sm:text-base font-medium uppercase tracking-wide">{category.name}</h3>
                </div>
                <div className="flex flex-col gap-2">
                  {category.tracks.map((track: any, trackIndex: number) => {
                    const globalTrackIndex = soundCategories
                      .slice(0, categoryIndex)
                      .reduce((acc, cat) => acc + cat.tracks.length, 0) + trackIndex;
                    const IconComponent = track.icon;
                    const isActive = index === globalTrackIndex;
                    return (
                      <button
                        key={trackIndex}
                        onClick={() => selectTrack(globalTrackIndex)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-2xl border transition-all duration-200 shadow-sm w-full
                          ${isActive
                            ? "bg-gradient-to-r from-fuchsia-400/60 via-cyan-400/40 to-indigo-400/60 border-cyan-400 text-white shadow-lg"
                            : "bg-black/20 border-white/20 text-white/90 hover:bg-gradient-to-r hover:from-fuchsia-400/30 hover:via-cyan-400/20 hover:to-indigo-400/30 hover:border-cyan-400"
                          }`}
                        style={{ backdropFilter: "blur(8px)" }}
                      >
                        <IconComponent size={18} />
                        <span className="text-xs sm:text-sm flex-1 font-medium">{track.label}</span>
                        {isActive && playing && (
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        @media (max-width: 640px) {
          .max-w-md {
            max-width: 98vw !important;
          }
        }
      `}</style>
    </div>
  );
}