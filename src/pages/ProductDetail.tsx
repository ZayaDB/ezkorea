import SelectPurchase from '../components/productDetail/SelectPurchase';
import ProductTabs from '../components/productDetail/ProductTabs';
import SimilarProducts from '../components/productDetail/SimilarProducts';
import ProductCarousel from '../components/productDetail/ProductCarousel';
import { Container, useMediaQuery } from '@mui/material';

// import { useNavigate, useParams } from 'react-router-dom';

// const isMobile = useMediaQuery('(max-width: 768px)');
export default function ProductDetail() {
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/data/prodReview.json');
  //       const data = await response.json();
  //       const reviews = data[0].reviews;
  //       setReviewData(reviews);
  //     } catch (error) {
  //       console.error('Error fetching review data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  // const navigate = useNavigate();
  // const params = useParams();

  // const {productId} =useParams();

  // const [result] = prodData.filter(
  //   (prod) => prod.productId === Number(productId)
  // );
  const matches = useMediaQuery('(max-width:768px)');
  return (
    <div className='App'>
      <Container>
        <div className='detailPage' style={matches ? { width: '480px' } : {}}>
          <div className='detailMain'>
            {/* navigation에 인자로 슬래시 없이 어떤 값을 보내면
           현재 주소 뒤에 /작성한값 으로 이동 */}
            {/* <button onClick={() => navigate('3')}></button> */}

            <ProductCarousel />
            <div className='contents'>
              <ProductTabs />
              <SimilarProducts />

              {/* reviews props을 List 컴포넌트에 전달합니다. */}
            </div>
          </div>
          <div className='detailSide'>
            <SelectPurchase />
          </div>
        </div>
      </Container>
    </div>
  );
}
