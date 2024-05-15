import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/Home/Footer';
import { useMediaQuery } from '@mui/material';
import BottomNav from '../components/header/BottomNav';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/config';

export default function MainLayout() {
  const sections = [
    // { title: '쇼핑홈', url: '/' },
    { title: '카테고리', url: '/shop' },
    { title: '베스트', url: '/shop/best' },
    { title: '세일', url: '/shop/sale' },
  ];

  const isMobile = useMediaQuery('(max-width:619px)');
  const selectedOption = useSelector(
    (state: RootState) => state.product.selectedOption
  );
  const cartBadgeNum = selectedOption.length;
  return (
    <>
      <Header title='dururu' sections={sections} cartBadgeNum={cartBadgeNum} />
      <Outlet />
      {isMobile ? null : <Footer />}
      {isMobile && <BottomNav />}
    </>
  );
}
