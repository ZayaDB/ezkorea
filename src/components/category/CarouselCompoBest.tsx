import Carousel from 'react-bootstrap/Carousel';
import best1 from '../../assets/images/best1.webp';
import best2 from '../../assets/images/best2.webp';
import best4 from '../../assets/images/best4.webp';
import '../../styles/category/likes.scss';

export default function CarouselCompoBest() {
  return (
    <div className='carouselBest'>
      <span className='best-title'>BEST</span>
      <span className='best-desc'>
        똑같은 일상을 좀 더 특별하게,
        <br />
        다양한 제품으로 감각적인 데스크를 완성해보세요
      </span>
      <div style={{ width: 'auto', margin: 0, padding: 0 }}>
        <Carousel interval={5000}>
          <Carousel.Item>
            <img
              style={{
                height: 'auto',
                margin: '0 auto',
                maxHeight: '450px',
                objectFit: 'cover',
                filter: 'brightness(60%) contrast(120%) grayscale(40%)',
              }}
              className='d-block w-100'
              src={best1}
              alt='First slide'
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              style={{
                height: 'auto',
                margin: '0 auto',
                maxHeight: '450px',
                objectFit: 'cover',
                filter: 'brightness(60%) contrast(120%) grayscale(40%)',
              }}
              className='d-block w-100'
              src={best2}
              alt='Second slide'
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              style={{
                height: 'auto',
                margin: '0 auto',
                maxHeight: '450px',
                objectFit: 'cover',
                filter: 'brightness(60%) contrast(120%) grayscale(40%)',
              }}
              className='d-block w-100'
              src={best4}
              alt='Third slide'
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

