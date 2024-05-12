import SelectPurchase from '../components/productDetail/SelectPurchase';
import ProductTabs from '../components/productDetail/ProductTabs';
import SimilarProducts from '../components/productDetail/SimilarProducts';
import ProductCarousel from '../components/productDetail/ProductCarousel';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// import { useNavigate, useParams } from 'react-router-dom';

// const isMobile = useMediaQuery('(max-width: 768px)');
export default function ProductDetail() {
  // id값 넘겨받기
  const [validProduct, setValidProduct] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { productId } = useParams();

        const categoryResponse = await fetch('/data/prodData.json');
        const prodData = await categoryResponse.json();
        const prodDataNum1 = prodData[0].productId;

        const prodDetailResponse = await fetch('/data/prodDetail.json');
        const prodDetailData = await prodDetailResponse.json();
        const prodDataNum2 = prodDetailData[0].prodId;

        const result =
          prodDataNum1 === prodDataNum2 && prodDataNum1 === Number(productId);

        if (result) {
          setValidProduct(true);
        } else {
          setValidProduct(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='App'>
      {validProduct ? (
        <Container>
          <div className='detailPage'>
            <div className='detailMain'>
              <ProductCarousel />
              <div className='contents'>
                <ProductTabs />
                <SimilarProducts />
              </div>
            </div>
            <div className='detailSide'>
              <SelectPurchase />
            </div>
          </div>
        </Container>
      ) : (
        <h1>존재하지 않는 상품입니다.</h1>
      )}
    </div>
  );
}
