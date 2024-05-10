import { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import '../../styles/category/sideFilter.scss';

import BrandFilter from './BrandFilter';
import PriceFilter from './PriceFilter';
import ColorFilter from './ColorFilter';
import ThemeFilter from './ThemeFilter';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/config';
import { clearFilters } from '../../redux/slices/categorySlice';

import { Products, Filters } from '../../types/typesProducts';

export default function FilterCompo() {
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  
  const selectedBrands = useSelector(
    (state: RootState) => state.category.brands
  );
  const selectedPrices = useSelector(
    (state: RootState) => state.category.prices
  );
  const selectedColors = useSelector(
    (state: RootState) => state.category.colors
  );
  const selectedThemes = useSelector(
    (state: RootState) => state.category.themes
  );
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    brand: false,
    price: false,
    color: false,
    theme: false,
  });

  const dispatch = useDispatch();

  // useEffect(() => {
  // filterProducts(); // 필터링된 상품 리스트 업데이트

  // }, [selectedBrands, selectedColors, selectedThemes]);

  // const filterProducts = () => {
  //   // Redux store에서 모든 상품 가져오기
  //   const allProducts = useSelector(
  //     (state: RootState) => state.category.products
  //   );
  //   // 필터링된 상품 리스트 생성
  //   const filteredList = allProducts.filter(product => {
  //     const isBrandSelected = selectedBrands.includes(product.brand);
  //     // const isPriceSelected = selectedPrices === 0 || product.price <= selectedPrices;

  //     // product.colors가 배열인지 확인하고, 선택된 색상 중 하나라도 포함되어 있는지 검사
  //     const isColorSelected = Array.isArray(product.colors)
  //       ? product.colors.some(color => selectedColors.includes(color))
  //       : selectedColors.includes(product.colors as string);

  //     const isThemeSelected = selectedThemes.includes(product.theme);
  //     // 모든 필터 조건이 true인 경우에만 포함
  //     // return isBrandSelected && isPriceSelected && isColorSelected && isThemeSelected;

  //     return isBrandSelected && isColorSelected && isThemeSelected;
  //   });

  //   // 필터링된 상품 리스트를 컴포넌트 상태에 저장
  //   setFilteredProducts(filteredList);
  // };

  // const renderProducts = () => {
  //   // 필터링된 상품 리스트를 사용하여 상품을 렌더링
  //   return filteredProducts.map(product => (
  //     <div key={product.productId}>
  //       <p>{product.name}</p>
  //       <p>{product.price}</p>
  //       {/* 상품 정보 렌더링 */}
  //     </div>
  //   ));
  // };

  const toggleFilter = (filterName: keyof Filters) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const filterHandle = () => {
    console.log('선택된 브랜드:', selectedBrands);
    console.log('선택된 가격:', selectedPrices);
    console.log('선택된 색상:', selectedColors);
    console.log('선택된 테마:', selectedThemes);
    // 이 값들을 기준으로 상품을 렌더링하기
    // filterProducts();
  };

  const handleResetFilters = () => {
    // 모든 필터 상태 초기화
    setSelectedFilters({
      brand: false,
      price: false,
      color: false,
      theme: false,
    });
    // Redux store에서 모든 필터 값 제거
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
        { name: '브랜드', component: <BrandFilter /> },
        { name: '가격', component: <PriceFilter /> },
        { name: '색상', component: <ColorFilter /> },
        { name: '테마', component: <ThemeFilter /> },
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
        sx={{
          marginTop: '20px',
          marginBottom: '20px',
          marginLeft: '60%',
          width: '89px',
          backgroundColor: 'black',
          color: 'white',
          '&:hover': {
            backgroundColor:'black',
            color: '#5FF531',
          },
        }}
        onClick={filterHandle}
      >
        검색
      </Button>
      {/* 필터링된 상품 렌더링 */}
      {/* {renderProducts()} */}
    </Box>
  );
}
