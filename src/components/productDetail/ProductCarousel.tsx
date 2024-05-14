import '../../styles/productDetail/productCarousel.scss';
import Carousel from 'react-bootstrap/Carousel';

export default function ProductCarousel() {
  return (
    <>
      <div className='p-0'>
        <Carousel>
          {/* <img className='d-block w-100' /> */}
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
      </div>
    </>
  );
}
