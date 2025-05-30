import { useState } from 'react';

export const useZenMode = () => {
  const [isZenMode, setIsZenMode] = useState(false);

  const toggleZenMode = () => {
    setIsZenMode((prev) => !prev);
  };

  return {
    isZenMode,
    toggleZenMode,
  };
};
