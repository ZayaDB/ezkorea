import Carousel from 'react-bootstrap/Carousel';
// import mainSlide from '../../assets/images/main_slide8.webp';
import mainSlide2 from '../../assets/images/main_slide13.webp';
// import mainSlide3 from '../../assets/images/main_slide3.jpg';
import '../../styles/home/carousel.scss';

export default function MainSlide() {
  return (
    <>
      <div style={{ width: 'auto', margin: 0, padding: 0 }}>
        <Carousel>
          <Carousel.Item>
            <img className='d-block w-100' src={mainSlide2} alt='First slide' />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className='d-block w-100'
              src={mainSlide2}
              alt='Second slide'
            />
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className='d-block w-100' src={mainSlide2} alt='Third slide' />
            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}
