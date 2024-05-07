// StyleFilter.tsx
import { Button } from '@mui/material';
import { useStyleFilter } from './../../hooks/community/useStyleFilter';
import './../../styles/community/main.scss';

const StyleFilter = () => {
  const { styleIndexes, styleButtonClick } = useStyleFilter();
  const styleVariants = ['Gaming', 'Simple', 'Antique', 'Unique'];

  return (
    <div className='style-filter'>
      <p className='filter-title'>Concept</p>
      {styleVariants.map((style, index) => (
        <Button
          key={index}
          variant={styleIndexes.includes(index) ? 'contained' : 'outlined'}
          onClick={() => styleButtonClick(index)}
        >
          {style}
        </Button>
      ))}
    </div>
  );
};

export default StyleFilter;
