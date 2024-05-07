// import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import Home from './pages/Home';
import {
  Products,
  CategoryData,
  ProductListProps,
} from './types/typesProducts';
import CommunityPostPage from './pages/CommunityPostPage';
import Login from './pages/Login';
import Header from './components/common/Header';
import BestProduct from './components/category/BestProduct';
import SaleProduct from './components/category/SaleProduct';
import Category from './pages/Category';

function App() {
  const sections = [
    { title: '쇼핑홈', url: '/' },
    { title: '카테고리', url: '/shop' },
    { title: '베스트', url: '/shop/best' },
    { title: '세일', url: '/shop/sale' },
  ];

  const [products, setProducts] = useState<Products[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header title='Drururu' sections={sections} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/shop'
            element={
              <Category
                categoryData={categoryData}
                selectedCategory={selectedCategory}
                prodData={products}
                selectedSubCategory={selectedSubCategory}
              />
            }
          />
          {/* <Route
            path='/shop/best'
            element={<BestProduct prodData={products} />}
          />
          <Route
            path='/shop/sale'
            element={<SaleProduct prodData={products} />}
          /> */}
          <Route path='/login' element={<Login />} />
          <Route path='/community/post' element={<CommunityPostPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
