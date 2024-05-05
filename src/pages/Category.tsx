import React, { useState, useEffect } from 'react';
import { Products } from '../types/typesProducts';
import ProductList from '../components/category/ProductList';
import SideNav from '../components/category/SideNav';
import '../styles/category/categoryCss.scss';
import { getData } from '../utils/getData';
import ContentArea from '../styles/ContentArea';

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
    <div className='categoryPage'>
      <ContentArea>
        <div className='category-content'>
          <SideNav />
          <ProductList prodData={products} />
        </div>
      </ContentArea>
    </div>
  );
};

export default Category;
