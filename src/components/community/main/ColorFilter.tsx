/* eslint-disable no-unused-vars */
// ColorFilter.tsx
import React from 'react';
import { Button, Box } from '@mui/material';
import './../../../styles/community/main.scss';
import styled from '@emotion/styled';
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
          // variant='outlined'
          onClick={() => colorButtonClick(color)}
          disableRipple
          sx={{
            padding: '10px 14px',
            m: 0,
            fontSize: '14px',
            lineHeight: '16px',
            borderRadius: '999px',
            ...(!colorIndexes.includes(color) && {
              // 아웃라인 버튼일 경우
              border: '1px solid rgb(218, 221, 224)', // 아웃라인 버튼의 테두리 스타일을 지정합니다
              color: '#2F3438', // 아웃라인 버튼의 폰트 색상을 지정합니다
              '&:hover': {
                color: '#000000', // 컨테인드 버튼의 폰트 색상을 호버시 변경합니다
                border: '1px solid #5FF531',
              },
            }),
            ...(colorIndexes.includes(color) && {
              color: '#000000', // 컨테인드 버튼의 폰트 색상을 호버시 변경합니다
              border: '1px solid #7f7f7f',
              backgroundColor: '#5FF531',
              '&:hover': {
                color: '#000000', // 컨테인드 버튼의 폰트 색상을 호버시 변경합니다
                border: '1px solid transparent',
                backgroundColor: '#5FF531',
              },
            }),
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
