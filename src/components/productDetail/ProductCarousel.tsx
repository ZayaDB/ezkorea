import '../../styles/productDetail/productCarousel.scss';
import Carousel from 'react-bootstrap/Carousel';
import { useEffect, useState } from 'react';

export default function ProductCarousel() {
  const [pdCarousel, setPdCarousel] = useState([]);
  // fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/prodDetail.json');
        const data = await response.json();
        const carouselImg = data[0].product_image;
        setPdCarousel(carouselImg);
      } catch (error) {
        console.error('Error fetching review data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className='carousel'>
        <Carousel>
          {pdCarousel.map((img, index) => (
            <Carousel.Item key={index}>
              <img src={img} alt={`Product ${index + 1}`} />
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </>
  );
}
