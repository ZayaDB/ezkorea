import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { setColors } from '../../redux/slices/categorySlice';
import { RootState } from '../../redux/config';
import '../../styles/category/sideFilter.scss';

export default function ColorFilter() {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );
  const products = useSelector((state: RootState) => state.category.products);

  const [checkedColors, setCheckedColors] = useState<string[]>([]);

  useEffect(() => {
    setCheckedColors([]); // 선택된 카테고리가 변경될 때 컬러 목록 초기화
  }, [selectedCategory]);

  const handleClick = (colorName: string) => {
    const newCheckedColors = [...checkedColors];
    const colorIndex = newCheckedColors.indexOf(colorName);

    if (colorIndex === -1) {
      newCheckedColors.push(colorName);
    } else {
      newCheckedColors.splice(colorIndex, 1);
    }

    setCheckedColors(newCheckedColors);
    dispatch(setColors(newCheckedColors));
  };

  const getColorsByCategory = (category: string): string[] => {
    // 선택된 카테고리에 해당하는 제품들의 컬러 목록을 필터링하고 중복 제거
    const filteredColors = products
      .filter(product => product.category1 === category)
      .reduce((acc, curr) => {
        curr.colors.forEach(color => {
          if (!acc.includes(color)) {
            acc.push(color);
          }
        });
        return acc;
      }, [] as string[]);

    return filteredColors;
  };

  return (
    <Box className='color-wrap'>
      {getColorsByCategory(selectedCategory).map(color => (
        <Box
          key={color}
          className='element-color'
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
                color === 'white' ? '1px solid rgba(0, 0, 0, 0.1)' : 'none', // 화이트 컬러일 때 아주 연한 테두리 추가
            }}
          ></Box>
          <Box className='color-text'>{color}</Box>
        </Box>
      ))}
    </Box>
  );
}
