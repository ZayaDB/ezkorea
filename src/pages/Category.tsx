import React, { useState, useEffect } from 'react';
import {
  Products,
  CategoryData,
  ProductListProps,
} from '../types/typesProducts';
import ProductList from '../components/category/ProductList';
import SideNav from '../components/category/SideNav';
import { getData } from '../utils/getData';
import '../styles/category/categoryCss.scss';

const Category: React.FC<ProductListProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('가구');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('ALL');
  const [products, setProducts] = useState<Products[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { products: products } = await getData('/data/prodData.json');
        const { categoryData: categoryData } = await getData(
          '/data/categoryData.json'
        );
        // products와 categoryData 설정
        console.log(products);
        setProducts(products);
        console.log(categoryData);
        setCategoryData(categoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // 컴포넌트 마운트 시 한 번만 실행

  return (
    <div className='category-page'>
      <div className='category-content'>
        <div className='sideNavigation'>
          <SideNav
            onSelectCategory={setSelectedCategory}
            onSelectSubCategory={(subCategory: string) => {
              setSelectedSubCategory(subCategory);
            }}
          />
        </div>
        <div className='containerProducts'>
          <ProductList
            categoryData={categoryData}
            prodData={products}
            selectedCategory={selectedCategory}
            selectedSubCategory={selectedSubCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default Category;
