import React from "react";
import { RiMusicFill } from "react-icons/ri";

interface FloatingPlayerButtonProps {
  setOpen: (isOpen: boolean) => void;
  playing: boolean;
}

export default function FloatingPlayerButton({ setOpen, playing }: FloatingPlayerButtonProps) {
  return (
    <button onClick={() => setOpen(true)} className="w-full h-full flex items-center justify-center text-white relative touch-manipulation">
      <RiMusicFill size={24} />
      {playing && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full">
          <div className="w-4 h-4 bg-emerald-400 rounded-full animate-ping absolute" />
        </div>
      )}
    </button>
  );
}