import React, { useState } from 'react';
import { Box } from '@mui/system';
import BrandFilter from './BrandFilter';
import PriceFilter from './PriceFilter';
import ColorFilter from './ColorFilter';
import ThemeFilter from './ThemeFilter';
import { Button } from '@mui/material';

// interface FilterCompoProps {
//   isOpen: boolean;
//   onToggle: () => void;
// }

interface Filters {
  brand: boolean;
  price: boolean;
  color: boolean;
  theme: boolean;
}

const FilterCompo: React.FC = () => {
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    brand: false,
    price: false,
    color: false,
    theme: false,
  });

  const toggleFilter = (filterName: keyof Filters) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  return (
    <Box className='filter-box'>
      <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box className='nav-title'>필터</Box>
        <Box
          className='remove-filter'
          onClick={() =>
            setSelectedFilters({
              brand: false,
              price: false,
              color: false,
              theme: false,
            })
          }
        >
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
        { name: '브랜드', component: <BrandFilter /> },
        { name: '가격', component: <PriceFilter /> },
        { name: '색상', component: <ColorFilter /> },
        { name: '테마', component: <ThemeFilter /> },
      ].map((filter, index) => (
        <Box key={index} className={`${filter.name.toLowerCase()}-box`}>
          <Box
            style={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() =>
              toggleFilter(filter.name.toLowerCase() as keyof Filters)
            }
          >
            <Box className='filter-title'>{filter.name}</Box>
            <Box className='plus'>
              {selectedFilters[filter.name.toLowerCase() as keyof Filters]
                ? '-'
                : '+'}
            </Box>
          </Box>
          {selectedFilters[filter.name.toLowerCase() as keyof Filters] &&
            filter.component}
        </Box>
      ))}
      <Button
        variant='contained'
        sx={{ marginTop: '20px', marginBottom: '20px' }}
      >
        검색
      </Button>
    </Box>
  );
};

export default FilterCompo;
