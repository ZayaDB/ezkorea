import React, { useState, useEffect } from 'react';
import { Box } from '@mui/system';
import {
  CategoryMapping,
  SideNavProps,
  CategoryData,
} from '../../types/typesProducts';
import '../../styles/category/sideNavCss.scss';
import { getData } from '../../utils/getData';
import FilterComponent from './FilterCompo';
import { useMediaQuery } from '@mui/material';

const categoryMapping: CategoryMapping = {
  가구: 'furniture',
  전자기기: 'electronics',
  '조명/인테리어': 'lighting-interior',
  '데코/식물': 'deco-plant',
};

const SideNav: React.FC<SideNavProps> = ({ onSelectCategory }) => {
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const isMobile = useMediaQuery('(max-width:768px)');

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

  const handleCategoryClick = (categoryName: string) => {
    onSelectCategory(categoryName); // 선택한 카테고리를 부모 컴포넌트로 전달
    setSelectedCategory(categoryName);
  };

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
      {!isMobile && <FilterComponent />}
    </Box>
  );
};

export default SideNav;
