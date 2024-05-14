// ColorFilter.tsx
import React from 'react';
import { Button, Box } from '@mui/material';
import './../../../styles/community/main.scss';
import styled from '@emotion/styled';

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
      <p className='filter-title'>Color</p>
      {colors.map((color, index) => (
        <Button
          key={index}
          onClick={() => colorButtonClick(color)}
          disableRipple
          sx={{
            width: '96px',
            padding: '0 12px',
            fontSize: '14px',
            height: '32px',
            borderRadius: '16px',
            ...(colorIndexes.includes(color)
              ? containedButtonStyles
              : outlineButtonStyles),
          }}
        >
          <ColorCircle color={color} />
          {color}
        </Button>
      ))}
    </div>
  );
};

export default ColorFilter;

const ColorCircle = styled(Box)<{ color: string }>(({ color }) => ({
  width: 15,
  height: 15,
  color: '#000000',
  borderRadius: '50%',
  border: color === 'white' ? '1px solid #E5E5E5' : 'contained',
  backgroundColor: color === 'wood' ? '#9A6322' : color,
  marginRight: '8px',
}));

const containedButtonStyles = {
  color: '#000000',
  border: '1px solid #5FF531',
  backgroundColor: '#5FF531', // 클릭 효과와 호버 효과를 일관성 있게 만들기 위해 변경

  '&:hover': {
    color: '#000000',
    backgroundColor: '#B7FF8B', // 클릭 효과와 호버 효과를 일관성 있게 만들기 위해 변경
    border: '1px solid #5FF531',
  },
};

const outlineButtonStyles = {
  border: '1px solid rgb(218, 221, 224)',
  color: '#2F3438',
  '&:hover': {
    color: '#5FF531',
    border: '1px solid #000000',
    backgroundColor: 'transparent',
  },
};
