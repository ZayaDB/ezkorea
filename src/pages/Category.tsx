import React, { useState, useEffect } from 'react';
import {
  Products,
  CategoryData,
  ProductListProps,
} from '../types/typesProducts';
import ProductList from '../components/category/ProductList';
import SideNav from '../components/category/SideNav';
// import { Box } from '@mui/material';
import { getData } from '../utils/getData';
import '../styles/category/categoryCss.scss';

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

const Category: React.FC<ProductListProps> = ({ prodData }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('가구');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('ALL');

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
  }, []); // Empty array to run once on component mount

  return (
    <div className='category-page'>
      <div className='category-content'>
        <div className='sideNavigation'>
          {/* Pass onSelectCategory and onSelectSubCategory to SideNav */}
          <SideNav
            onSelectCategory={setSelectedCategory}
            onSelectSubCategory={(subCategory: string) => {
              // Handle subcategory selection here
              console.log('Selected subcategory:', subCategory);
            }}
          />
        </div>
        <div className='containerProducts'>
          <ProductList
            categoryData={categoryData}
            prodData={products}
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory} // selectedSubCategory를 추가하여 전달
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
