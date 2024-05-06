import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useToggle from '../../hooks/useToggle';
import '../../styles/category/productItemCss.scss';
import HandleClickHeart from './HandleClickHeart';
import { Products } from '../../types/typesProducts';
import { Box } from '@mui/material';

interface ProductItemProps {
  prod: Products;
}

// 상품 카드 컴포넌트
export default function ProductItem({ prod }: ProductItemProps) {
  const [isHeart, toggleHeart] = useToggle(prod.heart);
  const [isLiked, setIsLiked] = useState<boolean>(prod.heart);

  const handleLikeToggle = () => {
    setIsLiked(prevIsLiked => !prevIsLiked);
  };

  // 상품 아이템 클릭 이벤트 핸들러
  const handleProdItemClick = (productId: number): void => {
    console.log('Clicked product ID:', productId);
    // 클릭한 상품의 productId로 상품 객체 찾기
    const clickedProduct = prod; // 이미 prod 객체가 해당 상품을 나타냄
    console.log('Clicked product details:', clickedProduct);
  };

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Box
      className='prod-item'
      role='button'
      onClick={() => handleProdItemClick(prod.productId)}
    >
      <Link to={`/productDetail?productId=${prod.productId}`} className='link-to-detail'>
        {/* 상품이미지 */}
        <div
          className='prod-img'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <img
            src={hovered ? prod.hoverImage : prod.thumbnail}
            alt={prod.name}
          />
        </div>
        <div className='prod-info'>
          {/* 브랜드명 */}
          <div className='prod-brand'>{prod.brand}</div>
          {/* 상품명 */}
          <div className='prod-name'>{prod.name}</div>
          {/* 할인율 */}
          {prod.discount !== 0 ? (
            <div className='prod-discount'>{prod.discount}%</div>
          ) : (
            <div style={{ color: 'white' }}>;;;</div>
          )}
          {/* 원가 */}
          {prod.discount !== 0 ? (
            <div className='prod-prevPrice'>{prod.prevPrice}</div>
          ) : (
            <div style={{ color: 'white' }}>;;;</div>
          )}
          {/* 할인가 */}
          <div className='prod-price'>{prod.price}</div>
        </div>
      </Link>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '10px',
        }}
      >
        {/* 옵션 - 컬러 */}
        <div className='color-wrapper'>
          {prod.colors.map((color, index) => (
            <div
              key={index}
              className='color-circle'
              style={{
                backgroundColor: color,
                border:
                  color === 'white'
                    ? '0.1px solid rgba(68, 68, 68, 0.239)'
                    : 'none',
              }}
            ></div>
          ))}
        </div>
        {/* 찜하기 */}
        <div className='heart'>
          <HandleClickHeart
            productName={prod.name}
            isLiked={isLiked}
            onLikeToggle={handleLikeToggle}
          />
        </div>
      </div>
    </Box>
  );
}
