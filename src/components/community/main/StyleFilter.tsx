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
          // variant={styleIndexes.includes(style) ? 'contained' : 'outlined'}
          onClick={() => styleButtonClick(style)}
          disableRipple
          sx={{
            padding: '10px 14px',
            m: 0,
            fontSize: '14px',
            lineHeight: '16px',
            // background: styleIndexes.includes(style) ? 'white' : 'outlined',
            ...(!styleIndexes.includes(style) && {
              // 아웃라인 버튼일 경우
              border: '1px solid rgb(218, 221, 224)', // 아웃라인 버튼의 테두리 스타일을 지정합니다

              color: '#2F3438', // 아웃라인 버튼의 폰트 색상을 지정합니다
              '&:hover': {
                color: '#000000', // 컨테인드 버튼의 폰트 색상을 호버시 변경합니다
                border: '1px solid #7f7f7f',
                backgroundColor: 'transparent',
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
