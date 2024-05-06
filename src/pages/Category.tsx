import React, { useState, useEffect } from 'react';
import { Products, CategoryData } from '../types/typesProducts';
import ProductList from '../components/category/ProductList';
import SideNav from '../components/category/SideNav';
import { Box } from '@mui/material';
import { getData } from '../utils/getData';
import '../styles/category/categoryCss.scss';
interface ProductListProps {
  categoryData: CategoryData[];
  selectedCategory: string;
  prodData: Products[];
}

const categoryData: CategoryData[] = [
  {
    name: '가구',
    subCategories: [
      'ALL',
      '책상',
      '의자',
      '모니터암/받침대',
      '거치대',
      '서랍장',
      '선반',
    ],
  },
  {
    name: '전자기기',
    subCategories: ['ALL', '키보드', '마우스', '스피커', '멀티탭', '충전기'],
  },
  {
    name: '조명/인테리어',
    subCategories: [
      'ALL',
      '조명',
      '오브제',
      '시계',
      '캘린더',
      '트레이',
      '타공판',
      '데스크매트',
    ],
  },
  {
    name: '데코/식물',
    subCategories: ['ALL', '디퓨저', '캔들', '인센스', '식물'],
  },
];

const Category: React.FC<ProductListProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // 선택한 카테고리 상태
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Products[] = await getData('/data/prodData.json');

        setProducts(data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  return (
    <Box className='category-page'>
      <Box className='category-content'>
        <Box className='sideNavigation'>
          <SideNav onSelectCategory={handleCategorySelect} />
        </Box>

        <Box className='containerProducts'>
          <ProductList
            categoryData={categoryData}
            prodData={products}
            selectedCategory={selectedCategory}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Category;
