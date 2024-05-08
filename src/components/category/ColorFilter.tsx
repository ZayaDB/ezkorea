import React from 'react';
import '../../styles/category/colorFilter.scss';
import { Box } from '@mui/system';

export default function ColorFilter() {
  // 컬러와 이름을 매핑한 객체
  const colors = {
    white: '화이트',
    '#b7b7b7': '그레이',
    black: '블랙',

    '#eca83b': '오렌지',
    '#a3d9e3': '라이트블루',
    beige: '베이지',
    '#3b5ad7': '블루',

    navy: '네이비',
    '#f8fcd5': '아이보리',
    '#ffee01': '옐로우',
    '#546414': '카키',
    '#6c4502': '브라운',
    green: '그린',
    '#e32626': '레드',
    '#8b2020': '버건디',
    pink: '핑크',
    purple: '퍼플',
    lavender: '라벤더',
  };

  const handleClick = (colorName: string) => {
    console.log(`선택한 색상: ${colorName}`);
  };

  return (
    <Box className='color-wrap'>
      {Object.entries(colors).map(([color, name]) => (
        <Box
          className='element-color'
          key={color}
          onClick={() => handleClick(name)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              handleClick(name);
            }
          }}
          role='button'
          tabIndex={0}
        >
          <Box
            className={`circle-color ${
              color === 'white' ? 'white' : 'other-color'
            }`}
            style={{ backgroundColor: color }}
          ></Box>
          <Box className='color-text'>{name}</Box>
        </Box>
      ))}
    </Box>
  );
}
