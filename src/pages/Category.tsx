import React, { useState, useEffect } from 'react';
import { Products } from '../types/typesProducts';
import ProductList from '../components/category/ProductList';
import SideNav from '../components/category/SideNav';
import '../styles/category/categoryCss.scss';
import { getData } from '../utils/getData';
import ContentArea from '../styles/ContentArea';
import { Box } from '@mui/material';
import Header from '../components/common/Header';

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

  return (
    <Box className='category-page'>
      <Header sections={[{ title: '', url: '#' }]} title={'dururu'} />
      <Box className='category-content'>
        <Box className='sideNavigation'>
          <SideNav />
        </Box>

        <Box className='containerProducts'>
          <ProductList prodData={products} />
        </Box>
      </Box>
    </Box>
  );
};

export default Category;
