// ColorFilter.tsx
import { Button } from '@mui/material';
import { useColorFilter } from './../../hooks/community/useColorFilter';

const ColorFilter = () => {
  const { colorIndexes, colorButtonClick } = useColorFilter();
  const colorVariants = ['White', 'Black', 'Wood', 'Pink'];

  return (
    <div className='color-filter'>
      <p className='filter-title'>Color</p>
      {colorVariants.map((color, index) => (
        <Button
          key={index}
          variant={colorIndexes.includes(index) ? 'contained' : 'outlined'}
          onClick={() => colorButtonClick(index)}
        >
          {color}
        </Button>
      ))}
    </div>
  );
};

export default ColorFilter;
