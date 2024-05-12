import React from 'react';
import { Chip, Box } from '@mui/material';
import { Dispatch } from 'redux';

interface FilterChipsProps {
  selectedFilters: string[];
  onRemoveFilter: (filter: string) => void;
}

const FilterChips = () => {
  
  // 칩 렌더링 함수
  const renderChips = (chipType: string, values: (string | number)[]) => {
    console.log(values);
    return (
      <Box className='filter-chip-bar'>
        {values.map((value, index) => {
          return (
            <Chip
              key={`${chipType}-${index}`}
              label={String(value)}
              onDelete={() => handleDelete(chipType, String(value))}
              style={
                {
                  // 스타일 적용
                }
              }
            />
          );
        })}
      </Box>
    );
  };
  const handleDelete = (chipType: string, chipValue: string) => {
    console.info(`Deleting ${chipType} - ${chipValue}`);
    switch (chipType) {
      case '브랜드':
        dispatch(
          removeSelectedFilter({ filterType: 'brands', value: chipValue })
        );
        break;
      case '가격':
        dispatch(
          removeSelectedFilter({ filterType: 'prices', value: chipValue })
        );
        break;
      case '색상':
        dispatch(
          removeSelectedFilter({ filterType: 'colors', value: chipValue })
        );
        break;
      case '테마':
        dispatch(
          removeSelectedFilter({ filterType: 'themes', value: chipValue })
        );
        break;
      default:
        break;
    }
  };
  const formatPrice = (price: number): string => {
    const formatted = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return `~${formatted}`; // price값 이하
  };
  
  
  
  
  return (
    <Box>
      {selectedFilters.map((filter, index) => (
        <Chip
          key={index}
          label={filter}
          onDelete={() => onRemoveFilter(filter)}
          style={{ margin: '5px' }}
        />
      ))}
    </Box>
  );
};

export default FilterChips;
