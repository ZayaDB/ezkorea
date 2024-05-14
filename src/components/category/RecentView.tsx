import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config';
import { Products } from '../../types/productTypes';
import ProductItem from '../category/ProductItem';
import '../../styles/category/likes.scss';

export default function RecentView() {
  const products = useSelector((state: RootState) => state.category.products);

  // 세션 스토리지에서 클릭된 상품 배열 가져오기
  const clickedProducts: Products[] = JSON.parse(
    sessionStorage.getItem('clickedProducts') || '[]'
  );

  useEffect(() => {
    console.log('최근 본 상품:', clickedProducts);
  }, [clickedProducts]);

  // 클릭된 상품 배열을 기준으로 최근 본 상품 필터링
  const recentProducts = products.filter(product =>
    clickedProducts.some(
      clickedProduct => clickedProduct.productId === product.productId
    )
  );

  return (
    <div className='recent-products'>
      <div
        style={{
          textAlign: 'center',
          fontSize: '13px',
          marginBottom: '10px',
        }}
      >
        RECENT VIEW
      </div>
      {recentProducts.map(product => (
        <ProductItem key={product.productId} prod={product} />
      ))}
    </div>
  );
}