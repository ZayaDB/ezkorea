import MainSlide from '../components/Home/MainSlide';
import MoodCarousel from '../components/Home/MoodCarousel';
import LeviewCarousel from '../components/Home/LeviewCarousel';
import NewItem from '../components/Home/NewItem';
import MdPick from '../components/Home/MdPick';
import ItemNav from '../components/Home/ItemNav';

export default function Home() {
  return (
    <>
      <MainSlide />
      <ItemNav />
      <MoodCarousel />
      <NewItem />
      <LeviewCarousel />
      <MdPick />
    </>
  );
}
