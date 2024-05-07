// useColorFilter.ts
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

  const resetColorFilter = () => {
    setColorIndexes([]);
  };

  return { colorIndexes, colorButtonClick, resetColorFilter };
};
