import React, { useEffect, useState, useRef } from 'react';
import { Products } from '../../types/productTypes';
import { getData } from '../../utils/getData';
import ProductItem from '../category/ProductItem';
import { Button } from '@mui/material';

interface ResultProductsProps {
  keyword: string;
}

const ResultProducts: React.FC<ResultProductsProps> = ({ keyword }) => {

  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [visibleProductsCount, setVisibleProductsCount] = useState<number>(6);
  const prevKeyword = useRef<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { products: fetchedProducts } = await getData(
          '/data/prodData.json'
        );
        const lowercaseKeyword = keyword.toLowerCase();

        const filtered = fetchedProducts.filter(
          (product: Products) =>
            product.category1.toLowerCase().includes(lowercaseKeyword) ||
            product.category2.toLowerCase().includes(lowercaseKeyword) ||
            product.name.toLowerCase().includes(lowercaseKeyword) ||
            product.brand.toLowerCase().includes(lowercaseKeyword)
        );

        setFilteredProducts(filtered);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    if (keyword !== prevKeyword.current) {
      prevKeyword.current = keyword;
      fetchData();
    }
  }, [keyword]);

  const handleLoadMore = () => {
    setVisibleProductsCount(prevCount => prevCount + 6);
  };

  const allProducts = keyword ? filteredProducts : filteredProducts;

  return (
    <div>
      {loading ? (
        <div style={{ textAlign: 'center' }}>Loading...</div>
      ) : (
        <div>
          {allProducts.length > 0 ? (
            <div className='likes-page'>
              <div className='likes-content'>
                {allProducts
                  .slice(0, visibleProductsCount)
                  .map((product: Products) => (
                    <ProductItem key={product.productId} prod={product} />
                  ))}
              </div>
              {visibleProductsCount < allProducts.length && (
                <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                  <Button
                    onClick={handleLoadMore}
                    sx={{
                      p: 1,
                      width: '100px',
                      backgroundColor: 'black',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'black',
                        color: '#5FF531',
                      },
                    }}
                  >
                    더보기
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className='likes-content'>
              <div
                style={{
                  textAlign: 'center',
                  width: '100%',
                  marginTop: '100px',
                }}
              >
                상품 검색 결과가 없습니다.
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultProducts;
