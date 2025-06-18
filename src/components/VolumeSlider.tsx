import React from "react";

interface VolumeSliderProps {
  volume: number;
  setVolume: (volume: number) => void;
}

export default function VolumeSlider({ volume, setVolume }: VolumeSliderProps) {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="relative flex-1 flex items-center">
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
          className="w-full h-4 rounded-full appearance-none slider backdrop-blur-xl"
          style={{
            background: `linear-gradient(90deg, #a21caf 0%, #06b6d4 ${volume *
              100}%, rgba(255,255,255,0.10) ${volume * 100}%, rgba(255,255,255,0.10) 100%)`
          }}
        />
      </div>
      <span className="text-white/80 text-sm font-mono min-w-[32px] text-right select-none">
        {(volume * 100).toFixed(0)}%
      </span>
      <style jsx>{`
        .slider {
          outline: none;
          margin: 0;
          padding: 0;
        }
        .slider::-webkit-slider-thumb {
          appearance: none;
          margin-top: -10px; /* Centraliza a bolinha na barra */
          width: 28px;
          height: 28px;
          background: conic-gradient(from 180deg at 50% 50%, #a21caf, #06b6d4, #6366f1, #a21caf);
          border-radius: 50%;
          cursor: pointer;
          border: 4px solid #fff;
          box-shadow: 0 0 16px #06b6d4cc, 0 0 0 4px #a21caf33;
          transition: box-shadow 0.2s;
          animation: fruitacormove 2s linear infinite;
        }
        .slider:active::-webkit-slider-thumb {
          box-shadow: 0 0 24px #06b6d4cc, 0 0 0 6px #a21caf55;
        }
        .slider::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 999px;
          background: transparent;
        }
        .slider::-moz-range-thumb {
          width: 28px;
          height: 28px;
          background: conic-gradient(from 180deg at 50% 50%, #a21caf, #06b6d4, #6366f1, #a21caf);
          border-radius: 50%;
          cursor: pointer;
          border: 4px solid #fff;
          box-shadow: 0 0 16px #06b6d4cc, 0 0 0 4px #a21caf33;
          transition: box-shadow 0.2s;
          animation: fruitacormove 2s linear infinite;
        }
        .slider:active::-moz-range-thumb {
          box-shadow: 0 0 24px #06b6d4cc, 0 0 0 6px #a21caf55;
        }
        .slider::-ms-thumb {
          width: 28px;
          height: 28px;
          background: conic-gradient(from 180deg at 50% 50%, #a21caf, #06b6d4, #6366f1, #a21caf);
          border-radius: 50%;
          cursor: pointer;
          border: 4px solid #fff;
          box-shadow: 0 0 16px #06b6d4cc, 0 0 0 4px #a21caf33;
          transition: box-shadow 0.2s;
          animation: fruitacormove 2s linear infinite;
        }
        .slider:active::-ms-thumb {
          box-shadow: 0 0 24px #06b6d4cc, 0 0 0 6px #a21caf55;
        }
        .slider::-ms-fill-lower,
        .slider::-ms-fill-upper {
          background: none;
        }
        @keyframes fruitacormove {
          0% { filter: hue-rotate(0deg);}
          100% { filter: hue-rotate(360deg);}
        }
      `}</style>
    </div>
  );
}