import Carousel from 'react-bootstrap/Carousel';
// import mainSlide from '../../assets/images/main_slide8.webp';
// import mainSlide2 from '../../assets/images/main_slide13.webp';
import mainSlide from '../../assets/images/main_slide1.png';
import mainSlide1 from '../../assets/images/main_slide1.png';
import mainSlide2 from '../../assets/images/main_slide1.png';
// import mainSlide3 from '../../assets/images/main_slide3.jpg';
import '../../styles/home/carousel.scss';

export default function MainSlide() {
  return (
    <>
      <div style={{ width: 'auto', margin: 0, padding: 0 }}>
        <Carousel>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src={mainSlide}
              alt='First slide'
              style={{
                height: 'auto',
                margin: '0 auto',
                maxHeight: '550px',
                objectFit: 'cover',
                filter: 'brightness(90%) contrast(120%) grayscale(40%)',
              }}
            />
            <Carousel.Caption
              style={{
                lineHeight: '30px',
                marginBottom: '40px',
                textAlign: 'left',
              }}
            >
              <p style={{ fontSize: '50px', fontWeight: '500' }}>
                2024 FAMILY MONTH
              </p>
              <p>가정의 달, 두루루가 제안하는 라이프 스타일을 함께 해보세요.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src={mainSlide1}
              alt='Second slide'
              style={{
                height: 'auto',
                margin: '0 auto',
                maxHeight: '550px',
                objectFit: 'cover',
                filter: 'brightness(90%) contrast(120%) grayscale(40%)',
              }}
            />
            <Carousel.Caption
              style={{
                lineHeight: '30px',
                marginBottom: '40px',
                textAlign: 'left',
              }}
            >
              <p style={{ fontSize: '50px', fontWeight: '500' }}>
                2024 FAMILY MONTH
              </p>
              <p>가정의 달, 두루루가 제안하는 라이프 스타일을 함께 해보세요.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src={mainSlide2}
              alt='Third slide'
              style={{
                height: 'auto',
                margin: '0 auto',
                maxHeight: '550px',
                objectFit: 'cover',
                filter: 'brightness(90%) contrast(120%) grayscale(40%)',
              }}
            />
            <Carousel.Caption
              style={{
                lineHeight: '30px',
                marginBottom: '40px',
                textAlign: 'left',
              }}
            >
              <p style={{ fontSize: '50px', fontWeight: '500' }}>
                2024 FAMILY MONTH
              </p>
              <p>가정의 달, 두루루가 제안하는 라이프 스타일을 함께 해보세요.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}
