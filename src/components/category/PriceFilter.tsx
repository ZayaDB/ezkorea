import { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../redux/slices/categorySlice';
import { RootState } from '../../redux/config';

// 숫자를 천 단위로 쉼표로 구분하여 포맷하는 함수
const formatPriceWithComma = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const PriceFilter = () => {
  const [price, setPrice] = useState<number[]>([0, 1000000]); // 가격 범위 선택
  const dispatch = useDispatch();
  const selectedFilters = useSelector(
    (state: RootState) => state.category.selectedFilters
  );

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    const newPrice = newValue as number[]; // 새로운 가격 범위 값
    setPrice(newPrice); // 로컬 상태 업데이트

    // 선택된 가격 범위를 함께 업데이트하여 Redux store에 저장
    dispatch(setFilters({ ...selectedFilters, prices: newPrice }));

    console.log('설정된 가격 범위:', newPrice);
  };

  const marks = [
    { value: 0, label: '0' },
    { value: 100000 },
    { value: 200000 },
    { value: 300000 },
    { value: 400000 },
    { value: 500000 },
    { value: 600000 },
    { value: 700000 },
    { value: 800000 },
    { value: 900000 },
    { value: 1000000, label: '100+' },
  ];

  return (
    <Box sx={{ width: '80%', margin: '5px' }}>
      <Slider
        value={price}
        min={0}
        max={1000000}
        step={100000}
        marks={marks}
        onChange={handlePriceChange}
        valueLabelDisplay='auto'
        sx={{ color: 'black', width: '90%' }}
        valueLabelFormat={value =>
          `~${formatPriceWithComma(value as number)}원`
        } // 숫자를 천 단위로 포맷하여 표시
        style={{
          marginLeft: '15px',
        }}
      />
    </Box>
  );
};

export default PriceFilter;
