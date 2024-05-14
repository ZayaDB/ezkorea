import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/Home/Footer';
import { useMediaQuery } from '@mui/material';
import BottomNav from '../components/header/BottomNav';

export default function MainLayout() {
  const sections = [
    // { title: '쇼핑홈', url: '/' },
    { title: '카테고리', url: '/shop' },
    { title: '베스트', url: '/shop/best' },
    { title: '세일', url: '/shop/sale' },
  ];

  const isMobile = useMediaQuery('(max-width:500px)');

  return (
    <>
      <Header title='Dururu' sections={sections} />
      <Outlet />
      {isMobile ? null : <Footer />}
      {isMobile && <BottomNav />}
    </>
  );
}
