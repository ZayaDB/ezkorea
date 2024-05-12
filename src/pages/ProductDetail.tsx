import SelectPurchase from '../components/productDetail/SelectPurchase';
import ProductTabs from '../components/productDetail/ProductTabs';
import SimilarProducts from '../components/productDetail/SimilarProducts';
import ProductCarousel from '../components/productDetail/ProductCarousel';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types/productDetail';

export default function ProductDetail() {
  const [validProduct, setValidProduct] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { productId } = useParams(); 

  useEffect(() => {
    const numProductId = Number(productId); 

    const fetchData = async () => {
      try {
        const prodDetailResponse = await fetch('/data/prodDetail.json');
        const prodDetailData: Product[] = await prodDetailResponse.json();

        const foundProduct = prodDetailData.find(
          (prod: Product) => prod.productId === numProductId
        );
        
        if (foundProduct) {
          setValidProduct(true);
        } else {
          setValidProduct(false);
        }
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); 

  }, [productId]); 

  if (isLoading) {
    return <h1>로딩 중...</h1>;
  }

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
