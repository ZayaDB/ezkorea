import '../../styles/productDetail/productDetail.scss';
import Carousel from 'react-bootstrap/Carousel';

export default function ProductCarousel() {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <div className='slidercontents1'></div>
        </Carousel.Item>
        <Carousel.Item>
          <div className='slidercontents2'></div>
        </Carousel.Item>
        <Carousel.Item>
          <div className='slidercontents3'></div>
        </Carousel.Item>
      </Carousel>
    </>
  );
}
