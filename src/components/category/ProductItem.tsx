import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/category/productItem.scss';
import HandleClickHeart from './HandleClickHeart';
import { Box } from '@mui/material';
import { Products } from '../../types/typesProducts';
import prod_review from '../../assets/images/prod_review.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/config';
import { setIsLiked } from '../../redux/slices/categorySlice';

interface ProductItemProps {
  prod: Products;
}

// 1000단위 콤마를 추가하는 함수
const addCommaNumber = (num: number): string => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
// 상품 카드 컴포넌트
export default function ProductItem({ prod }: ProductItemProps) {
  const dispatch = useDispatch();

  const isLiked = useSelector(
    (state: RootState) => state.category.isLiked[prod.productId] || false
  );
  // console.log('가져온 isLiked', isLiked);

  const handleLikeToggle = () => {
    dispatch(setIsLiked({ productId: prod.productId, isLiked: !isLiked }));
    console.log('dispatch한 liked:', isLiked);
  };

  const handleProdItemClick = (productId: number): void => {
    // 이미 저장된 상품 목록을 가져옴
    const storedProducts = localStorage.getItem('clickedProducts');
    let clickedProducts: Products[] = storedProducts
      ? JSON.parse(storedProducts)
      : [];

    // 이미 클릭된 상품인지 확인
    const isAlreadyClicked = clickedProducts.some(
      (product: Products) => product.productId === productId
    );

    if (!isAlreadyClicked) {
      // 중복 저장을 방지하기 위해 로컬 스토리지에 클릭한 상품 추가
      clickedProducts = [...clickedProducts, prod];
      localStorage.setItem('clickedProducts', JSON.stringify(clickedProducts));
    }

    // 상품 상세 페이지로 이동
    // 예: react-router-dom의 history.push 메서드를 사용하여 이동
    // history.push(`/productDetail?productId=${productId}`);
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
      <Link
        to={`/productDetail?productId=${prod.productId}`}
        className='link-to-detail'
      >
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
            <div className='prod-prevPrice'>
              {addCommaNumber(prod.prevPrice)}
            </div>
          ) : (
            <div style={{ color: 'white' }}>;;;</div>
          )}
          {/* 할인가 */}
          <div className='prod-price'>{addCommaNumber(prod.price)}원</div>
          <div className='prod-commentCount'>
            <img src={prod_review} alt='' className='prod-review-icon' />(
            {addCommaNumber(prod.commentCount)})
          </div>
        </div>
      </Link>
      <div className='color-heart-box'>
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
