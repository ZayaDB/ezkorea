import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import CommunityPostPage from './pages/CommunityPostPage';
import Category from './pages/Category';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path='/shop/category' element={<Category />}></Route>
          <Route path='/shop/detail' element={<ProductDetail />}></Route>
          <Route path='/community/post' element={<CommunityPostPage />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
