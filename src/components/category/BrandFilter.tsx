import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@mui/material/Checkbox';
import { Box, styled } from '@mui/system';
import { RootState } from '../../redux/config';
import { setFilters } from '../../redux/slices/categorySlice';
import '../../styles/category/sideFilter.scss';

const BrandFilter = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );
  const products = useSelector((state: RootState) => state.category.products);
  const selectedFilters = useSelector(
    (state: RootState) => state.category.selectedFilters
  );

  // 컴포넌트가 마운트될 때 selectedFilters에서 브랜드 필터 값을 초기화
  const [checkedBrands, setCheckedBrands] = useState<string[]>(
    selectedFilters.brands || []
  );

  useEffect(() => {
    // 선택된 카테고리 변경 시 해당 카테고리의 브랜드 목록을 가져와서 checkedBrands를 업데이트
    const brandsForCategory = getBrandsByCategory(selectedCategory);
    // 이전에 저장된 필터 값과 현재 카테고리의 브랜드 목록을 합침
    const updatedCheckedBrands = brandsForCategory.filter(brand =>
      checkedBrands.includes(brand)
    );
    setCheckedBrands(updatedCheckedBrands);
  }, [selectedCategory]);

  const handleClick = (brand: string) => {
    // 선택한 브랜드를 토글하여 checkedBrands를 업데이트
    const newCheckedBrands = checkedBrands.includes(brand)
      ? checkedBrands.filter(b => b !== brand)
      : [...checkedBrands, brand];
    setCheckedBrands(newCheckedBrands);

    // 업데이트된 브랜드 필터를 Redux store에 저장
    dispatch(setFilters({ ...selectedFilters, brands: newCheckedBrands }));
  };

  const BlackCheckbox = styled(Checkbox)({
    color: 'black',
    '&.Mui-checked': {
      color: 'black',
    },
  });

  const getBrandsByCategory = (category: string): string[] => {
    // 선택된 카테고리에 해당하는 제품의 브랜드 목록을 필터링하고 중복을 제거
    const filteredBrands = products
      .filter(product => product.category1 === category)
      .map(product => product.brand);
    return Array.from(new Set(filteredBrands));
  };

  return (
    <Box className='element-brand'>
      {getBrandsByCategory(selectedCategory).map(brand => (
        <Box key={brand} className='brand'>
          <BlackCheckbox
            checked={checkedBrands.includes(brand)}
            onChange={() => handleClick(brand)}
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
            onClick={() => handleClick(brand)}
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
};

export default BrandFilter;
