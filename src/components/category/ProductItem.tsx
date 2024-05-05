import React, { useState } from 'react';
import useToggle from '../../hooks/useToggle';
import '../../styles/category/productItemCss.scss';
import HandleClickHeart from './HandleClickHeart';

interface Product {
  thumbnail: string;
  name: string;
  brand: string;
  colors: string[];
  price: string;
  heart: boolean;
  discount: number;
  prevPrice: string;
  hoverImage: string;
}

interface ProductItemProps {
  prod: Product;
}

// 상품 카드 컴포넌트
export default function ProductItem({ prod }: ProductItemProps) {
  const [isHeart, toggleHeart] = useToggle(prod.heart);
  const [isLiked, setIsLiked] = useState<boolean>(prod.heart);

  const handleLikeToggle = () => {
    setIsLiked(prevIsLiked => !prevIsLiked);
  };

  // 버튼 클릭 이벤트 핸들러
  const handleButtonClick = (): void => {
    toggleHeart(); // 하트 토글
    // 좋아요가 설정되었을 때 마이페이지 찜한리스트 컴포넌트에 나타나야 함
  };
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className='prod-item'>
      {/* 상품이미지 */}
      <div
        className='prod-img'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* <img src={prod.thumbnail} alt={prod.name} /> */}
        <img src={hovered ? prod.hoverImage : prod.thumbnail} alt={prod.name} />
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

        {/* 할인가 및 찜하기 */}

        {/* 할인가 */}
        <div className='prod-price'>{prod.price}</div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          // lineHeight: '42px',
          padding:'10px'
        }}
      >
        {/* 옵션 - 컬러 */}
        <div className='color-wrapper'>
          {prod.colors.map((color, index) => (
            <div
              key={index}
              className='color-circle'
              style={{ backgroundColor: color }}
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
    </div>
  );
}
