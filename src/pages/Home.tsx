import MainSlide from '../components/Home/MainSlide';
import MoodCarousel from '../components/Home/MoodCarousel';
import LeviewCarousel from '../components/Home/LeviewCarousel';
import NewItem from '../components/Home/NewItem';
import MdPick from '../components/Home/MdPick';

export default function Home() {
  return (
    <>
      <MainSlide />
      <MoodCarousel />
      <NewItem />
      <LeviewCarousel />
      <MdPick />
    </>
  );
}
