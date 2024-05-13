import MainSlide from '../components/Home/MainSlide';
import MoodCarousel from '../components/Home/MoodCarousel';
import LeviewCarousel from '../components/Home/LeviewCarousel';
import Footer from '../components/Home/Footer';
import NewItem from '../components/Home/NewItem';
import MdPick from '../components/Home/MdPick';
import BottomNav from '../../src/components/header/BottomNav';
import { useMediaQuery } from '@mui/material';

export default function Home() {
  const isMobile = useMediaQuery('(max-width:619px)');
  return (
    <>
      <MainSlide />
      <MoodCarousel />
      <NewItem />
      <LeviewCarousel />
      <MdPick />
      <Footer />
      {isMobile && <BottomNav />}
    </>
  );
}
