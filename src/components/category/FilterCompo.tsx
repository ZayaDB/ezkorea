import React, { FC } from 'react';
import { useState } from 'react';
import { Box, Button } from '@mui/material';
import BrandFilter from './BrandFilter';
import PriceFilter from './PriceFilter';
import ColorFilter from './ColorFilter';
import ThemeFilter from './ThemeFilter';
import { useDispatch } from 'react-redux';
import { clearFilters, setRendering } from '../../redux/slices/categorySlice';
import '../../styles/category/sideFilter.scss';
interface FilterCompoProps {
  onApplyFilters: () => void; // onApplyFilters 함수의 타입 정의
}

const FilterCompo: FC<FilterCompoProps> = ({ onApplyFilters }) => {
  const dispatch = useDispatch();
  const [brandFilterOpen, setBrandFilterOpen] = useState(false);
  const [priceFilterOpen, setPriceFilterOpen] = useState(false);
  const [colorFilterOpen, setColorFilterOpen] = useState(false);
  const [themeFilterOpen, setThemeFilterOpen] = useState(false);

  const handleApplyFilters = () => {
    dispatch(setRendering(true));

    if (typeof onApplyFilters === 'function') {
      onApplyFilters();
    }
  };

  const handleResetFilters = () => {
    setBrandFilterOpen(false);
    setPriceFilterOpen(false);
    setColorFilterOpen(false);
    setThemeFilterOpen(false);
    // 모든 선택한 필터값 삭제
    dispatch(clearFilters());
  };

  return (
    <Box className='filter-box'>
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box className='nav-title'>필터</Box>
        <Box className='remove-filter' onClick={handleResetFilters}>
          초기화
        </Box>
      </Box>
      <hr
        style={{
          border: 0,
          height: '2px',
          backgroundColor: '#272727',
          marginRight: '30px',
        }}
      />
      {[
        {
          name: '브랜드',
          component: <BrandFilter />,
          isOpen: brandFilterOpen,
          setOpen: setBrandFilterOpen,
        },
        {
          name: '가격',
          component: <PriceFilter />,
          isOpen: priceFilterOpen,
          setOpen: setPriceFilterOpen,
        },
        {
          name: '색상',
          component: <ColorFilter />,
          isOpen: colorFilterOpen,
          setOpen: setColorFilterOpen,
        },
        {
          name: '테마',
          component: <ThemeFilter />,
          isOpen: themeFilterOpen,
          setOpen: setThemeFilterOpen,
        },
      ].map((filter, index) => (
        <Box key={index} className={`${filter.name.toLowerCase()}-box`}>
          <Box
            style={{
              marginTop: '20px',
              marginLeft: '5px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => filter.setOpen(!filter.isOpen)}
          >
            <Box className='filter-title'>{filter.name}</Box>
            <Box className='plus'>{filter.isOpen ? '-' : '+'}</Box>
          </Box>
          {filter.isOpen && filter.component}
        </Box>
      ))}
      <Button
        variant='contained'
        sx={{
          marginTop: '20px',
          marginBottom: '20px',
          // marginLeft: '80%',
          backgroundColor: 'black',
          color: 'white',
          '&:hover': {
            backgroundColor: 'black',
            color: '#5FF531',
          },
        }}
        onClick={handleApplyFilters}
      >
        검색
      </Button>
    </Box>
  );
};

export default FilterCompo;
