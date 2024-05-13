/* eslint-disable no-unused-vars */
// ConceptFilter.tsx
import React from 'react';
import { Button } from '@mui/material';
import './../../../styles/community/main.scss';

interface ConceptFilterProps {
  conceptIndexes: string[];
  conceptButtonClick: (concept: string) => void;
}

const ConceptFilter: React.FC<ConceptFilterProps> = ({
  conceptIndexes,
  conceptButtonClick,
}) => {
  const conceptVariants = ['gaming', 'simple', 'antique', 'unique'];

  return (
    <div className='concept-filter'>
      <p className='filter-title'>Concept</p>
      {conceptVariants.map((concept, index) => (
        <Button
          key={index}
          onClick={() => conceptButtonClick(concept)}
          disableRipple
          sx={{
            width: '96px',
            padding: '0 12px',
            fontSize: '14px',
            height: '32px',
            borderRadius: '16px',
            ...(conceptIndexes.includes(concept)
              ? containedButtonStyles
              : outlineButtonStyles),
          }}
        >
          {concept}
        </Button>
      ))}
    </div>
  );
};

export default ConceptFilter;

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
