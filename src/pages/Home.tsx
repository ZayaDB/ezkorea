import Carousel from 'react-bootstrap/Carousel';
import mainSlide from '../assets/images/main_slide8.webp';
import mainSlide2 from '../assets/images/main_slide11_1.webp';
import mainSlide3 from '../assets/images/main_slide3.jpg';

export default function Home() {
  return (
    <>
      <div>
        <Carousel data-bs-theme='dark'>
          <Carousel.Item>
            <img
              className='d-block'
              style={{
                width: '100vw',
                height: 'calc(100vh - 113px)',
              }}
              src={mainSlide}
              alt='First slide'
            />
            <Carousel.Caption
              style={{
                textAlign: 'left',
                paddingBottom: '18vh',
              }}
            >
              <button
                style={{
                  border: '2px solid #5ff531',
                  borderRadius: '3px',
                  padding: '5px 9px',
                  backgroundColor: 'transparent',
                  fontSize: '15px',
                  fontWeight: '500',
                  marginBottom: '14px',
                  color: '#5ff531',
                }}
              >
                PROMOTION
              </button>
              <p
                style={{
                  color: '#000000',
                  textAlign: 'left',
                  fontSize: '42px',
                  lineHeight: '44px',
                  left: '50px',
                  fontWeight: '700',
                }}
              >
                2024 FAMILY MONTH
              </p>
              <p
                style={{
                  fontSize: '18px',
                  color: '#000000',
                  fontWeight: '400',
                }}
              >
                가정의 달, 두루루가 제안하는 우리 가족의 라이프 스타일을 함께해
                보세요.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block'
              style={{
                width: '100vw',
                height: 'calc(100vh - 113px)',
              }}
              src={mainSlide2}
              alt='Second slide'
            />
            <Carousel.Caption
              style={{
                textAlign: 'left',
                paddingBottom: '18vh',
              }}
            >
              <p
                style={{
                  color: 'white',
                  textAlign: 'left',
                  fontSize: '42px',
                  lineHeight: '44px',
                  left: '50px',
                  fontWeight: '700',
                }}
              >
                FOLES MIRROR LAUNCHING
              </p>
              <p
                style={{
                  fontSize: '18px',
                  color: '#f1f1f1',
                  fontWeight: '400',
                }}
              >
                드디어 폴스 미러가 정식 출시 되었습니다. 출시 기념 혜택을
                만나보세요.
                <br></br>
                3. 30. Sat - 8. 25. Sun
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              style={{
                width: '100vw',
                height: 'calc(100vh - 113px)',
              }}
              src={mainSlide3}
              alt='Third slide'
            />
            <Carousel.Caption
              style={{
                textAlign: 'left',
                paddingBottom: '18vh',
              }}
            >
              <p
                style={{
                  color: 'white',
                  textAlign: 'left',
                  fontSize: '42px',
                  lineHeight: '44px',
                  left: '50px',
                  fontWeight: '700',
                }}
              >
                2024 FAMILY MONTH
              </p>
              <p
                style={{
                  fontSize: '18px',
                  color: '#f1f1f1',
                  fontWeight: '400',
                }}
              >
                가정의 달, 두루루가 제안하는 우리 가족의 라이프 스타일을 함께해
                보세요.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}
