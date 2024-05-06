import React, { useState, useEffect } from 'react';
import { Products } from '../types/typesProducts';
import ProductList from '../components/category/ProductList';
import SideNav from '../components/category/SideNav';
import '../styles/category/categoryCss.scss';
import { getData } from '../utils/getData';
import { Box } from '@mui/material';

const Category: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getData('/data/prodData.json', setProducts);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };
    fetchData();
  }, []);
  const [selectedCategory, setSelectedCategory] = useState<string>(''); // 선택한 카테고리 상태

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
            prodData={products}
            selectedCategory={selectedCategory}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Category;