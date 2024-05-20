import ProductItem from './ProductItem';
import useSort from '../../hooks/shop/useSort';
import { useEffect, useState } from 'react';
import { getData } from '../../utils/getData';
import { Products } from '../../types/productTypes';
import '../../styles/category/likes.scss';

export default function BestProduct() {
  const [prodData, setProdData] = useState<Products[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { products } = await getData('/data/prodData.json');
        setProdData(products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // 인기순으로 정렬된 상품 목록을 가져오기
  const sortOption = '인기순'; // 인기순 정렬 기준
  const sortedProducts = useSort(prodData, sortOption);

  return (
    <div className='likes-page'>
      <br />
      <div className='likes-content'>
        {/* 상위 50개만 렌더링하기 */}
        {sortedProducts.slice(0, 50).map((prod, index) => (
          <ProductItem key={prod.productId} prod={prod} rank={index + 1} />
        ))}
      </div>
    </div>
  );
}
