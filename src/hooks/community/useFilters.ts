// useFilters.ts
import { useState } from 'react';

export const useColorFilter = () => {
  const [colorIndexes, setColorIndexes] = useState<number[]>([]);

  const colorButtonClick = (index: number) => {
    const selectedIndex = colorIndexes.indexOf(index);
    if (selectedIndex === -1) {
      setColorIndexes([...colorIndexes, index]);
    } else {
      setColorIndexes(colorIndexes.filter(i => i !== index));
    }
  };

  return { colorIndexes, colorButtonClick };
};

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

  return { styleIndexes, styleButtonClick };
};
