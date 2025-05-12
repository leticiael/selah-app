"use client";
import React, { ReactNode, createContext, useState } from "react";

export const ZenModeContext = createContext({
  isZenMode: false,
  toggleZenMode: () => {},
});

export const ZenModeProvider = ({ children }: { children: ReactNode }) => {
  const [isZenMode, setIsZenMode] = useState(false);

  const toggleZenMode = () => {
    setIsZenMode((prev) => !prev); // Alterna o estado de Zen Mode
  };

  return (
    <ZenModeContext.Provider value={{ isZenMode, toggleZenMode }}>
      {children}
    </ZenModeContext.Provider>
  );
};
