// useStyleFilter.ts
import { useState } from 'react';

export const useStyleFilter = () => {
  const [styleIndexes, setStyleIndexes] = useState<number[]>([]);

  const styleButtonClick = (index: number) => {
    const selectedIndex = styleIndexes.indexOf(index);
    if (selectedIndex === -1) {
      setStyleIndexes([...styleIndexes, index]);
    } else {
      setStyleIndexes(styleIndexes.filter(i => i !== index));
    }
  };

  const resetStyleFilter = () => {
    setStyleIndexes([]);
  };

  return { styleIndexes, styleButtonClick, resetStyleFilter };
};
