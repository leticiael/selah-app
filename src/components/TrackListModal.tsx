import React from "react";
import { RiCloseFill } from "react-icons/ri";
import { GiTreeBranch, GiWaterDrop, GiBrain, GiCampfire } from "react-icons/gi";

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
      {/* Bolha fruta cor animada */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(at_top_left,_#f0c,#0ff,#0fc,#0cf,#f0c)] blur-[160px] opacity-90 animate-bubble" />
        {/* Onda fruta cor */}
        <div className="absolute left-1/2 top-[70%] w-[350px] h-[120px] -translate-x-1/2 rounded-full bg-[conic-gradient(at_bottom_right,_#f0c,#0ff,#0fc,#0cf,#f0c)] blur-[100px] opacity-70 animate-wave" />
      </div>
      {/* Fundo escuro com blur mais vivo e transparente */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[80px] transition-all duration-300" />
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-[98vw] sm:max-w-lg md:max-w-2xl mx-auto rounded-3xl bg-black/20 shadow-2xl border border-white/20 p-0 overflow-hidden animate-fadein"
        style={{
          boxShadow: "0 8px 40px 0 rgba(0,0,0,0.10)",
          backdropFilter: "blur(60px)",
        }}
      >
        <div className="flex justify-between items-center px-5 py-5 sm:px-8 sm:py-8 border-b border-white/20 bg-black/10 backdrop-blur-2xl">
          <h2 className="text-xl sm:text-2xl font-light text-white tracking-wider">Sons</h2>
          <button
            className="p-2 sm:p-3 hover:bg-white/10 rounded-xl text-white/80 hover:text-white transition-all"
            onClick={() => setExpanded(false)}
            aria-label="Fechar"
          >
            <RiCloseFill size={28} />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-4 py-6 sm:px-8 sm:py-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {soundCategories.map((category, categoryIndex) => {
            const icons = [GiTreeBranch, GiWaterDrop, GiBrain, GiCampfire];
            const CategoryIcon = icons[categoryIndex] || category.icon;
            return (
              <div key={categoryIndex} className="space-y-6">
                <div className="flex items-center gap-3 text-white/90 bg-black/20 px-5 py-3 rounded-2xl shadow-sm">
                  <CategoryIcon size={24} />
                  <h3 className="text-lg font-medium uppercase tracking-wide">{category.name}</h3>
                </div>
                <div className="flex flex-col gap-4">
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
                        className={`flex items-center gap-4 px-5 py-4 rounded-2xl border transition-all duration-200 shadow-sm ${
                          isActive
                            ? "bg-gradient-to-r from-fuchsia-400/60 via-cyan-400/40 to-indigo-400/60 border-cyan-400 text-white shadow-lg"
                            : "bg-black/20 border-white/20 text-white/90 hover:bg-gradient-to-r hover:from-fuchsia-400/30 hover:via-cyan-400/20 hover:to-indigo-400/30 hover:border-cyan-400"
                        }`}
                        style={{ backdropFilter: "blur(12px)" }}
                      >
                        <IconComponent size={22} />
                        <span className="text-base flex-1 font-medium">{track.label}</span>
                        {isActive && playing && (
                          <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
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
        .animate-fadein {
          animation: fadein 0.5s cubic-bezier(.4,0,.2,1);
        }
        @keyframes fadein {
          from { opacity: 0; transform: scale(0.95);}
          to { opacity: 1; transform: scale(1);}
        }
        .animate-bubble {
          animation: bubbleMove 12s ease-in-out infinite alternate;
        }
        @keyframes bubbleMove {
          0% { transform: translate(-50%, -50%) scale(1);}
          100% { transform: translate(-48%, -52%) scale(1.08);}
        }
        .animate-wave {
          animation: waveMove 8s ease-in-out infinite alternate;
        }
        @keyframes waveMove {
          0% { transform: translate(-50%, 0) scaleX(1);}
          100% { transform: translate(-48%, -10px) scaleX(1.1);}
        }
      `}</style>
    </div>
  );
}