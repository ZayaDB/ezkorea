/* eslint-disable no-unused-vars */
// ColorFilter.tsx
import React from 'react';
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
          variant={colorIndexes.includes(color) ? 'contained' : 'outlined'}
          onClick={() => colorButtonClick(color)}
          sx={{
            p: 1,
            m: 0,
            lineHeight: '16px',
            ...(!colorIndexes.includes(color) && {
              // 아웃라인 버튼일 경우
              border: '1px solid #000', // 아웃라인 버튼의 테두리 스타일을 지정합니다
              color: '#000', // 아웃라인 버튼의 폰트 색상을 지정합니다
              '&:hover': {
                color: '#5FF531', // 컨테인드 버튼의 폰트 색상을 호버시 변경합니다
              },
            }),
            ...(colorIndexes.includes(color) && {
              border: '1px solid transparent',
            }),
          }}
        >
          {color}
        </Button>
      ))}
    </div>
  );
};

export default ColorFilter;
