import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/slices/categorySlice';
import { RootState } from '../../redux/config';
import { Products } from '../../types/productTypes';

const ColorFilter = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );
  const products = useSelector((state: RootState) => state.category.products);
  const selectedFilters = useSelector(
    (state: RootState) => state.category.selectedFilters
  );

  // 초기값은 선택한 필터에서 컬러를 가져오거나 빈 배열
  const [checkedColors, setCheckedColors] = useState<string[]>(
    selectedFilters.colors || []
  );

  useEffect(() => {
    // 선택한 카테고리 변경 시, 해당 카테고리의 컬러 필터 업데이트
    const colorsForCategory = getColorsByCategory(selectedCategory);
    const updatedCheckedColors = colorsForCategory.filter(color =>
      checkedColors.includes(color)
    );
    setCheckedColors(updatedCheckedColors);
  }, [selectedCategory]);

  // 컬러 클릭 시 호출되는 함수
  const handleClick = (colorName: string) => {
    const newCheckedColors = checkedColors.includes(colorName)
      ? checkedColors.filter(c => c !== colorName) // 선택한 컬러가 이미 체크된 경우, 해당 컬러를 제외하고 새로운 배열 생성
      : [...checkedColors, colorName]; // 선택한 컬러가 체크되지 않은 경우, 해당 컬러를 추가한 새로운 배열 생성
    setCheckedColors(newCheckedColors);
    dispatch(setFilters({ ...selectedFilters, colors: newCheckedColors }));
  };

  // 선택한 카테고리에 해당하는 제품들의 중복되지 않는 컬러 배열 반환
  const getColorsByCategory = (category: string): string[] => {
    const filteredColors = products
      .filter((product: Products) => product.category1 === category) // 선택한 카테고리에 해당하는 제품들 필터링
      .reduce((acc: string[], curr: Products) => {
        curr.colors.forEach((color: string) => {
          if (!acc.includes(color)) {
            // 중복되지 않는 컬러만 배열에 추가
            acc.push(color);
          }
        });
        return acc;
      }, []); // 초기값은 빈 배열
    return filteredColors;
  };

  return (
    <Box className='color-wrap'>
      {/* 선택한 카테고리의 컬러 필터 표시 */}
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
};

export default ColorFilter;
