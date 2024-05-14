import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/slices/categorySlice';
import { RootState } from '../../redux/config';
import { Products } from '../../types/productTypes';

export default function ColorFilter() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );
  const products = useSelector((state: RootState) => state.category.products);
  const selectedFilters = useSelector(
    (state: RootState) => state.category.selectedFilters
  );

  const [checkedColors, setCheckedColors] = useState<string[]>(
    selectedFilters.colors || []
  );

  useEffect(() => {
    const colorsForCategory = getColorsByCategory(selectedCategory);
    const updatedCheckedColors = colorsForCategory.filter(color =>
      checkedColors.includes(color)
    );
    setCheckedColors(updatedCheckedColors);
  }, [selectedCategory]);

  const handleClick = (colorName: string) => {
    const newCheckedColors = checkedColors.includes(colorName)
      ? checkedColors.filter(c => c !== colorName)
      : [...checkedColors, colorName];
    setCheckedColors(newCheckedColors);
    dispatch(setFilters({ ...selectedFilters, colors: newCheckedColors }));
  };

  const getColorsByCategory = (category: string): string[] => {
    const filteredColors = products
      .filter((product: Products) => product.category1 === category)
      .reduce((acc: string[], curr: Products) => {
        curr.colors.forEach((color: string) => {
          if (!acc.includes(color)) {
            acc.push(color);
          }
        });
        return acc;
      }, []);

    return filteredColors;
  };

  return (
    <Box className='color-wrap'>
      {getColorsByCategory(selectedCategory).map((color: string) => (
        <Box
          key={color}
          className={`element-color ${
            checkedColors.includes(color) ? 'selected' : ''
          }`}
          onClick={() => handleClick(color)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              handleClick(color);
            }
          }}
          role='button'
          tabIndex={0}
        >
          <Box
            className='circle-color'
            style={{
              backgroundColor: color,
              border:
                color === 'white' ? '1px solid rgba(0, 0, 0, 0.1)' : 'none',
            }}
          ></Box>
          <Box className='color-text'>{color}</Box>
        </Box>
      ))}
    </Box>
  );
}
