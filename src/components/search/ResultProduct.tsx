import React, { useEffect, useState, useRef } from 'react';
import { Products } from '../../types/productTypes';
import { getData } from '../../utils/getData';
import ProductItem from '../category/ProductItem';

interface ResultProductsProps {
  keyword: string;
}

const ResultProducts: React.FC<ResultProductsProps> = ({ keyword }) => {
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const prevKeyword = useRef<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading state to true when fetching new data
      try {
        const { products: fetchedProducts } = await getData('/data/prodData.json');
        const lowercaseKeyword = keyword.toLowerCase();

        const filtered = fetchedProducts.filter(
          (product: Products) =>
            product.category1.toLowerCase().includes(lowercaseKeyword) ||
            product.category2.toLowerCase().includes(lowercaseKeyword) ||
            product.name.toLowerCase().includes(lowercaseKeyword) ||
            product.brand.toLowerCase().includes(lowercaseKeyword)
        );

        setFilteredProducts(filtered);
        setLoading(false); // Set loading state to false after fetching and updating data
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false); // Ensure loading state is set to false in case of error
      }
    };

    // Fetch data only if the keyword has changed
    if (keyword && keyword !== prevKeyword.current) {
      fetchData();
      prevKeyword.current = keyword; // Update previous keyword with current keyword
    }
  }, [keyword]); // Dependency array with keyword ensures useEffect runs when keyword changes

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {filteredProducts.length > 0 ? (
            <div className='likes-page'>
              <div style={{ textAlign: 'center', fontSize: '13px', marginBottom: '10px' }}>상품결과</div>
              <div className='likes-content'>
                {filteredProducts.map((product: Products) => (
                  <ProductItem key={product.productId} prod={product} />
                ))}
              </div>
            </div>
          ) : (
            <div>상품 검색 결과가 없습니다.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultProducts;
