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
          variant={styleIndexes.includes(style) ? 'contained' : 'outlined'} // 소문자로 변환하여 비교
          onClick={() => styleButtonClick(style)}
        >
          {style}
        </Button>
      ))}
    </div>
  );
};

export default StyleFilter;
