import '../../styles/productDetail/productCarousel.scss';
import Carousel from 'react-bootstrap/Carousel';

export default function ProductCarousel() {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <div className='slidercontents1'></div>
          {/* <img className='d-block w-100' /> */}
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
