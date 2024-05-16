import Carousel from 'react-bootstrap/Carousel';
import mainSlide from '../../assets/images/main_slide1.webp';
import mainSlide1 from '../../assets/images/main_slide2.webp';
import mainSlide2 from '../../assets/images/main_slide3.webp';
import '../../styles/home/carousel.scss';
import { useMediaQuery } from '@mui/material';

export default function MainSlide() {

  const isMiniMobile = useMediaQuery('(max-width: 406px)');
  const isMobile = useMediaQuery('(max-width: 619px)');
  const isTablet = useMediaQuery('(max-width: 768px)');


  const captionLineHeight = isMobile ? '10px' : isTablet ? '16px' : '30px';
  const captionFontSize = isMobile ? '12px' : isTablet ? '16px' : '18px';
  const titleFontSize = isMobile ? '28px' : isTablet ? '34px' : '45px';

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
                maxHeight: '560px',
                objectFit: 'cover',
                filter: 'brightness(90%) contrast(120%) grayscale(20%)',
              }}
            />
            {!isMiniMobile && (
            <Carousel.Caption
              style={{
                lineHeight: captionLineHeight,
                marginBottom: '40px',
                textAlign: 'left',
              }}
            >
              <p
                style={{
                  fontWeight: '500',
                  fontSize: titleFontSize,
                }}
              >
                2024 FAMILY MONTH
              </p>
              <p style={{ fontSize: captionFontSize }}>
                가정의 달, 두루루가 제안하는 라이프 스타일을 함께 해보세요.
              </p>
            </Carousel.Caption>
            )}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src={mainSlide1}
              alt='Second slide'
              style={{
                height: 'auto',
                margin: '0 auto',
                maxHeight: '560px',
                objectFit: 'cover',
                filter: 'brightness(78%) contrast(110%)',
              }}
            />
            {!isMiniMobile && (
            <Carousel.Caption
              style={{
                lineHeight: captionLineHeight,
                marginBottom: '40px',
                textAlign: 'left',
                // fontSize: captionFontSize,
              }}
            >
              <p style={{ fontSize: titleFontSize, fontWeight: '500' }}>
                2024 FAMILY MONTH
              </p>
              <p style={{fontSize: captionFontSize,}}>가정의 달, 두루루가 제안하는 라이프 스타일을 함께 해보세요.</p>
            </Carousel.Caption>
            )}
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src={mainSlide2}
              alt='Third slide'
              style={{
                height: 'auto',
                margin: '0 auto',
                maxHeight: '560px',
                objectFit: 'cover',
                filter: 'brightness(85%) contrast(120%) grayscale(10%)',
              }}
            />
            {!isMiniMobile && (
            <Carousel.Caption
              style={{
                lineHeight: captionLineHeight,
                marginBottom: '40px',
                textAlign: 'left',
                
              }}
            >
              <p style={{ fontSize: titleFontSize, fontWeight: '500' }}>
                2024 FAMILY MONTH
              </p>
              <p style={{fontSize: captionFontSize,}}>가정의 달, 두루루가 제안하는 라이프 스타일을 함께 해보세요.</p>
            </Carousel.Caption>
            )}
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}
