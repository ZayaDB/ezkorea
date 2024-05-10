// StyleFilter.tsx
import React from 'react';
import { Button } from '@mui/material';
import './../../../styles/community/main.scss';

interface StyleFilterProps {
  styleIndexes: string[];
  // eslint-disable-next-line no-unused-vars
  styleButtonClick: (style: string) => void;
}

const StyleFilter: React.FC<StyleFilterProps> = ({
  styleIndexes,
  styleButtonClick,
}) => {
  const styleVariants = ['Gaming', 'Simple', 'Antique', 'Unique'];

  return (
    <div className='style-filter'>
      <p className='filter-title'>Concept</p>
      {styleVariants.map((style, index) => (
        <Button
          key={index}
          variant={
            styleIndexes.includes(style.toLowerCase())
              ? 'contained'
              : 'outlined'
          } // 소문자로 변환하여 비교
          onClick={() => styleButtonClick(style.toLowerCase())} // 소문자로 전달
        >
          {style}
        </Button>
      ))}
    </div>
  );
};

export default StyleFilter;
