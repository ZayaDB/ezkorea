import MainSlide from '../components/Home/MainSlide';
import MoodCarousel from '../components/Home/MoodCarousel';
import LeviewCarousel from '../components/Home/LeviewCarousel';
import BestItem from '../components/Home/BestItem';
import MdPick from '../components/Home/MdPick';
import ItemNav from '../components/Home/ItemNav';

export default function Home() {
  return (
    <>
      <MainSlide />
      <ItemNav />
      <MoodCarousel />
      <BestItem />
      <LeviewCarousel />
      <MdPick />
    </>
  );
}
