import { useState, useEffect } from 'react';
import '../../styles/productDetail/productInfo.scss';

export default function ProductInfo() {
  const [inImg, setInImg] = useState([]);

  // fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/prodDetail.json');
        const data = await response.json();
        const infoImg = data[0].product_info_image;
        setInImg(infoImg);
      } catch (error) {
        console.error('Error fetching review data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className='pdInfo'>
        {inImg.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Product ${index + 1}`} />
          </div>
        ))}
      </div>
    </>
  );
}

export function DeliveryInfo() {
  const [delImg, setDelImg] = useState([]);

  // fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/prodDetail.json');
        const data = await response.json();
        const infoImg = data[0].delivery_refund;
        setDelImg(infoImg);
      } catch (error) {
        console.error('Error fetching review data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className='pdInfo'>
        {delImg.map((img, index) => (
          <div key={index}>
            <img src={img} alt={`Product ${index + 1}`} />
          </div>
        ))}
      </div>
    </>
  );
}
