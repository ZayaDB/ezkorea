
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import Home from './pages/Home';
import CommunityPostPage from './pages/CommunityPostPage';
import CommunityModifyPage from './pages/CommunityModifyPage';
import Login from './pages/Login';
import Header from './components/header/Header';
import BestProduct from './components/category/BestProduct';
import SaleProduct from './components/category/SaleProduct';
import Category from './pages/Category';
import Community from './pages/Community';
import ProductDetail from './pages/ProductDetail';
import OrderPage from './pages/OrderPage';
import MyPage from './pages/MyPage';
import NotFound from './pages/NotFound';

function App() {
  const sections = [
    { title: '쇼핑홈', url: '/' },
    { title: '카테고리', url: '/shop' },
    { title: '베스트', url: '/shop/best' },
    { title: '세일', url: '/shop/sale' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header title='Dururu' sections={sections} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/shop' element={<Category />} />
          <Route path='/shop/best' element={<BestProduct />} />
          <Route path='/shop/sale' element={<SaleProduct />} />
          <Route path='/shop/:productId' element={<ProductDetail />} />
          <Route path='/community' element={<Community />} />
          <Route path='/login' element={<Login />} />
          <Route path='/community/post' element={<CommunityPostPage />} />
          <Route
            path='community/modify/:feedId'
            element={<CommunityModifyPage />}
          />
          <Route path='/order' element={<OrderPage />} />
          <Route path='/my' element={<MyPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

