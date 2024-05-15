//CarouselCompoSale.tsx
import Carousel from 'react-bootstrap/Carousel';
import sale1 from '../../assets/images/sale1.webp';
import sale2 from '../../assets/images/sale2.webp';
import sale3 from '../../assets/images/sale3.webp';
import '../../styles/category/likes.scss';

export default function CarouselCompoSale() {
  return (
    <div className='carouselBest'>
      <span className='best-title'>SALE</span>
      <span className='best-desc'>
        두루루의 다양한 제품들을 특별한 가격에 만나보세요!
      </span>
      <div style={{ width: 'auto', margin: 0, padding: 0 }}>
        <Carousel interval={5000}>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src={sale1}
              alt='First slide'
              style={{
                height: 'auto',
                margin: '0 auto',
                maxHeight: '450px',
                objectFit: 'cover',
                filter: 'brightness(60%) contrast(120%) grayscale(40%)',
              }}
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className='d-block w-100'
              style={{
                height: 'auto',
                margin: '0 auto',
                maxHeight: '450px',
                objectFit: 'cover',
                filter: 'brightness(60%) contrast(120%) grayscale(40%)',
              }}
              src={sale2}
              alt='Second slide'
            />
          </Carousel.Item>

          <Carousel.Item>
            <img
              className='d-block w-100'
              style={{
                height: 'auto',
                margin: '0 auto',
                maxHeight: '450px',
                objectFit: 'cover',
                filter: 'brightness(60%) contrast(120%) grayscale(40%)',
              }}
              src={sale3}
              alt='Third slide'
            />
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}
