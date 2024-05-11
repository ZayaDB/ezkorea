/* eslint-disable no-unused-vars */
// ColorFilter.tsx
import React from 'react';
import { Button } from '@mui/material';
import { Button } from '@mui/material';
import './../../../styles/community/main.scss';
// import theme from '../../../styles/theme';

interface ColorFilterProps {
  colorIndexes: string[];
  colorButtonClick: (color: string) => void;
}

const ColorFilter: React.FC<ColorFilterProps> = ({
  colorIndexes,
  colorButtonClick,
}) => {
  const colors = ['white', 'black', 'pink', 'wood'];

  return (
    <div className='color-filter'>
      <p className='filter-title'>컬러 선택</p>
      {colors.map((color, index) => (
        <Button
          key={index}
          variant={colorIndexes.includes(color) ? 'contained' : 'outlined'} // 소문자로 변환하여 비교
          onClick={() => colorButtonClick(color)} // 소문자로 전달
        >
          {color}
        </Button>
      ))}
    </div>
  );
};

export default ColorFilter;
