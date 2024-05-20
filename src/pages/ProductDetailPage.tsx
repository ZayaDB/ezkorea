import '../styles/productDetail/productDetail.scss';
import SelectPurchase from '../components/productDetail/SelectPurchase';
import ProductTabs from '../components/productDetail/ProductTabs';
import ProductCarousel from '../components/productDetail/ProductCarousel';
import { Container } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../types/productDetail';
import { createTheme, ThemeProvider } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface ThemeOptions {
    overrides?: {
      MuiContainer?: {
        root?: {
          padding?: string | number;
        };
      };
    };
  }
}

export default function ProductDetailPage() {
  const theme = createTheme({
    overrides: {
      MuiContainer: {
        root: {
          padding: 0,
        },
      },
    },
  });

  const isTablet = useMediaQuery('(max-width: 768px)');

  const [isLoading, setIsLoading] = useState(true);
  const [validProduct, setValidProduct] = useState(false);
  const { productId } = useParams();

  useEffect(() => {
    const numProductId = Number(productId);

    const fetchData = async () => {
      try {
        const prodDetailResponse = await fetch('/data/prodDetail.json');
        const prodDetailData: Product[] = await prodDetailResponse.json();
        // console.log(prodDetailData);
        const foundProduct = prodDetailData[0];
        // console.log(foundProduct);

        if (Number(foundProduct.prodId) === numProductId) {
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
      <ThemeProvider theme={theme}>
        {validProduct ? (
          isTablet ? (
            <Container>
              <div className='detailPage'>
                <div className='detailMain'>
                  <ProductCarousel />
                  <div className='detailSide'>
                    <SelectPurchase />
                  </div>
                  <div className='contents'>
                    <ProductTabs />
                  </div>
                </div>
              </div>
            </Container>
          ) : (
            <Container>
              <div className='detailPage'>
                <div className='detailMain'>
                  <ProductCarousel />
                  <div className='contents'>
                    <ProductTabs />
                  </div>
                </div>
                <div className='detailSide'>
                  <SelectPurchase />
                </div>
              </div>
            </Container>
          )
        ) : (
          <div
            style={{
              width: '100%',
              textAlign: 'center',
              margin: 'auto',
              marginTop: '200px',
              marginBottom: '200px',
            }}
          >
            존재하지 않는 상품입니다.
          </div>
        )}
      </ThemeProvider>
    </div>
  );
}
