import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import {
  CategoryMapping,
  FilterVisibility,
  SideNavProps,
  CategoryData,
  SubCategory, // SubCategory 타입 추가
} from '../../types/typesProducts';
import '../../styles/category/sideNavCss.scss';
import BrandFilter from './BrandFilter';
import PriceFilter from './PriceFilter';
import ColorFilter from './ColorFilter';
import ThemeFilter from './ThemeFilter';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Button, { ButtonProps } from '@mui/material/Button';
import { getData } from '../../utils/getData';

const categoryMapping: CategoryMapping = {
  가구: 'furniture',
  전자기기: 'electronics',
  '조명/인테리어': 'lighting-interior',
  '데코/식물': 'deco-plant',
};

const SideNav: React.FC<SideNavProps> = ({ onSelectCategory }) => {
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { categoryData: categoriesData } = await getData(
          '/data/categoryData.json'
        );
        console.log('Fetched category data:', categoriesData);
        // products와 categoryData 설정
        // setProducts(productsData);
        setCategoryData(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  const [selectedCategory, setSelectedCategory] = useState<string>('가구');
  const [filterVisibility, setFilterVisibility] = useState<FilterVisibility>({
    brand: false,
    price: false,
    color: false,
    theme: false,
  });

  const handleCategoryClick = (categoryName: string) => {
    onSelectCategory(categoryName); // 선택한 카테고리를 부모 컴포넌트로 전달
    setSelectedCategory(categoryName);
  };

  const toggleFilterVisibility = (filterName: keyof FilterVisibility) => {
    setFilterVisibility(prevVisibility => ({
      ...prevVisibility,
      [filterName]: !prevVisibility[filterName],
    }));
  };

  const resetFilters = () => {
    setFilterVisibility({
      brand: false,
      price: false,
      color: false,
      theme: false,
    });
  };

  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    fontSize: '14px',
    borderRadius: '5px',
    color: theme.palette.getContrastText(grey[900]),
    backgroundColor: grey[900],
    '&:hover': {
      color: '#00ff00',
      backgroundColor: grey[900],
    },
    marginLeft: '70%',
  }));

  return (
    <Box className='side-nav'>
      {categoryData.map(category => (
        <Box key={category.name} className={'nav-box'}>
          <Box
            className={`nav ${categoryMapping[category.name]}`}
            onClick={() => handleCategoryClick(category.name)}
            role='button'
            tabIndex={0}
          >
            <Box className='nav-title'>{category.name}</Box>
          </Box>
          {selectedCategory === category.name && (
            <Box className={`${categoryMapping[category.name]}-box`}>
              <hr
                style={{
                  border: 0,
                  height: '2px',
                  backgroundColor: '#272727',
                  marginRight: '30px',
                  marginBottom: '18px',
                }}
              />
              {category.subCategories.map(subCategory => (
                <Box
                  key={subCategory.name} // key에는 subCategory.name을 사용
                  className={`sub ${subCategory.name === 'ALL' ? 'bold' : ''}`}
                  onClick={() => onSelectCategory(subCategory.name)}
                  role='button'
                  tabIndex={0}
                >
                  {subCategory.name}
                </Box>
              ))}
            </Box>
          )}
        </Box>
      ))}
      <Box className={'filter-box'}>
        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box className='nav-title'>필터</Box>
          <Box className='remove-filter' onClick={resetFilters}>
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
                toggleFilterVisibility(
                  filter.name.toLowerCase() as keyof FilterVisibility
                )
              }
            >
              <Box className='filter-title'>{filter.name}</Box>
              <Box className='plus'>
                {filterVisibility[
                  filter.name.toLowerCase() as keyof FilterVisibility
                ]
                  ? '-'
                  : '+'}
              </Box>
            </Box>
            {filterVisibility[
              filter.name.toLowerCase() as keyof FilterVisibility
            ] && filter.component}
          </Box>
        ))}
        <ColorButton
          variant='contained'
          sx={{ marginTop: '20px', marginBottom: '20px' }}
        >
          검색
        </ColorButton>
      </Box>
    </Box>
  );
};

export default SideNav;
