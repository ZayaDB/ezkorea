import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import { Box, styled } from '@mui/system';
import { RootState } from '../../redux/config';
import { setBrands } from '../../redux/slices/categorySlice';
import '../../styles/category/sideFilter.scss';

export default function BrandFilter() {
  const dispatch = useDispatch();

  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );
  const products = useSelector((state: RootState) => state.category.products);

  const [checkedBrands, setCheckedBrands] = useState<string[]>([]);

  useEffect(() => {
    setCheckedBrands([]); // 선택된 카테고리가 변경될 때 브랜드 목록 초기화
  }, [selectedCategory]);

  const handleLabelClick = (brand: string) => {
    const newCheckedBrands = [...checkedBrands];
    const brandIndex = newCheckedBrands.indexOf(brand);

    if (brandIndex === -1) {
      newCheckedBrands.push(brand);
    } else {
      newCheckedBrands.splice(brandIndex, 1);
    }

    setCheckedBrands(newCheckedBrands);
    dispatch(setBrands(newCheckedBrands));
  };

  const BlackCheckbox = styled(Checkbox)({
    color: 'black',
    '&.Mui-checked': {
      color: 'black',
    },
  });

  const getBrandsByCategory = (category: string): string[] => {
    // 선택된 카테고리에 해당하는 제품 브랜드 목록 필터링
    const filteredBrands = products
      .filter(product => product.category1 === category)
      .map(product => product.brand);
    return Array.from(new Set(filteredBrands)); // 중복 제거 후 배열로 반환
  };

  return (
    <Box className='element-brand'>
      {getBrandsByCategory(selectedCategory).map(brand => (
        <Box key={brand} className='brand'>
          <BlackCheckbox
            checked={checkedBrands.includes(brand)}
            onChange={() => handleLabelClick(brand)}
            inputProps={{ 'aria-label': `${brand} checkbox` }}
            sx={{
              padding: '2px',
              '& .MuiSvgIcon-root': {
                width: '0.9em',
                height: '0.7em',
              },
            }}
          />
          <Box
            className='brand-name'
            onClick={() => handleLabelClick(brand)}
            role='button'
            tabIndex={0}
            sx={{ marginLeft: '2px', cursor: 'pointer' }}
          >
            {brand}
          </Box>
        </Box>
      ))}
    </Box>
  );
}
