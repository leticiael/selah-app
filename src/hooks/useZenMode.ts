// src/hooks/useZenMode.ts
import { useState } from 'react';

// Hook para gerenciar o modo zen
export const useZenMode = () => {
  const [isZenMode, setIsZenMode] = useState(false);

  // Função para alternar entre o modo zen
  const toggleZenMode = () => {
    setIsZenMode((prev) => !prev);
  };

  return {
    isZenMode,
    toggleZenMode,
  };
};
