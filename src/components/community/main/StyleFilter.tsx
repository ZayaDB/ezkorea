/* eslint-disable no-unused-vars */
// StyleFilter.tsx
import React from 'react';
import { Button } from '@mui/material';
import './../../../styles/community/main.scss';

interface StyleFilterProps {
  styleIndexes: string[];
  styleButtonClick: (style: string) => void;
}

const StyleFilter: React.FC<StyleFilterProps> = ({
  styleIndexes,
  styleButtonClick,
}) => {
  const styleVariants = ['gaming', 'simple', 'antique', 'unique'];

  return (
    <div className='style-filter'>
      <p className='filter-title'>Concept</p>
      {styleVariants.map((style, index) => (
        <Button
          key={index}
          variant={styleIndexes.includes(style) ? 'contained' : 'outlined'}
          onClick={() => styleButtonClick(style)}
          sx={{
            p: 1,
            m: 0,
            lineHeight: '16px',
            ...(!styleIndexes.includes(style) && {
              // 아웃라인 버튼일 경우
              border: '1px solid #000', // 아웃라인 버튼의 테두리 스타일을 지정합니다
              color: '#000', // 아웃라인 버튼의 폰트 색상을 지정합니다
              '&:hover': {
                color: '#5FF531', // 컨테인드 버튼의 폰트 색상을 호버시 변경합니다
              },
            }),
            ...(styleIndexes.includes(style) && {
              border: '1px solid transparent',
            }),
          }}
        >
          {style}
        </Button>
      ))}
    </div>
  );
};

export default StyleFilter;
