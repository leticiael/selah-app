import React from "react";

interface VolumeSliderProps {
  volume: number;
  setVolume: (volume: number) => void;
}

export default function VolumeSlider({ volume, setVolume }: VolumeSliderProps) {
  return (
    <div className="flex items-center gap-2 w-full">
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={e => setVolume(parseFloat(e.target.value))}
        className="w-full h-3 rounded-full appearance-none bg-gradient-to-r from-cyan-300/30 via-fuchsia-300/30 to-indigo-400/30 backdrop-blur-xl slider"
        style={{
          background: `linear-gradient(90deg, #a5f3fc 0%, #f0abfc ${volume *
            100}%, #fff3 ${volume * 100}%, #fff3 100%)`
        }}
      />
      <span className="text-white/70 text-xs font-mono min-w-[28px] text-right select-none">
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
          margin-top: -6px;
          width: 20px;
          height: 20px;
          background: rgba(255,255,255,0.7);
          border-radius: 50%;
          box-shadow: 0 2px 12px 0 #a5f3fc55;
          border: 2px solid #f0abfc88;
          transition: box-shadow 0.2s;
        }
        .slider:active::-webkit-slider-thumb {
          box-shadow: 0 0 16px #f0abfc99;
        }
        .slider::-webkit-slider-runnable-track {
          height: 8px;
          border-radius: 999px;
          background: transparent;
        }
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          background: rgba(255,255,255,0.7);
          border-radius: 50%;
          box-shadow: 0 2px 12px 0 #a5f3fc55;
          border: 2px solid #f0abfc88;
          transition: box-shadow 0.2s;
        }
        .slider:active::-moz-range-thumb {
          box-shadow: 0 0 16px #f0abfc99;
        }
        .slider::-ms-thumb {
          width: 20px;
          height: 20px;
          background: rgba(255,255,255,0.7);
          border-radius: 50%;
          box-shadow: 0 2px 12px 0 #a5f3fc55;
          border: 2px solid #f0abfc88;
          transition: box-shadow 0.2s;
        }
        .slider:active::-ms-thumb {
          box-shadow: 0 0 16px #f0abfc99;
        }
        .slider::-ms-fill-lower,
        .slider::-ms-fill-upper {
          background: none;
        }
      `}</style>
    </div>
  );
}