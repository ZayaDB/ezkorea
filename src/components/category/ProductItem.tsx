import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/category/productItem.scss';
import HandleClickHeart from './HandleClickHeart';
import { Box } from '@mui/material';
import { Products } from '../../types/productTypes';
import prod_review from '../../assets/images/prod_review.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/config';
import { setIsLiked } from '../../redux/slices/categorySlice';

interface ProductItemProps {
  prod: Products;
  rank?: number;
  disc?: boolean;
}

const addCommaNumber = (num?: number): string => {
  // num이 undefined이거나 null인 경우 처리
  if (num === undefined || num === null) {
    return '';
  }

  // num이 유효한 숫자인 경우 1000단위 콤마를 추가하여 반환
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 상품 카드 컴포넌트
export default function ProductItem({ prod, rank, disc }: ProductItemProps) {
  const dispatch = useDispatch();

  // useSelector를 통해 isLiked 상태가져옴
  const isLiked = useSelector(
    (state: RootState) => state.category.isLiked[prod.productId] || false
  );

  // 좋아요 토글 핸들러
  const handleLikeToggle = () => {
    const updatedIsLiked = !isLiked;
    dispatch(
      setIsLiked({ productId: prod.productId, isLiked: updatedIsLiked })
    );
  };

  // 세션에 최근 본 상품 넣기
  const inputSession = (product: Products): void => {
    const storedProducts = sessionStorage.getItem('clickedProducts');
    let clickedProducts: Products[] = [];
    // 이미 존재하다면
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        if (Array.isArray(parsedProducts)) {
          clickedProducts = parsedProducts;
        }
      } catch (error) {
        console.error('clickedProducts 파싱 중 오류 발생:', error);
      }
    }
    // 하나라도 맞으면 or조건 (some)
    const isAlreadyClicked = clickedProducts.some(
      (prod: Products) => prod.productId === product.productId
    );
    // 한번도 클릭하지 않았으면 세션에 set
    if (!isAlreadyClicked) {
      clickedProducts.push(product);
      sessionStorage.setItem(
        'clickedProducts',
        JSON.stringify(clickedProducts)
      );
    }
  };

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Box className='prod-item' role='button' onClick={() => inputSession(prod)}>
      <Link to={`/shop/${prod.productId}`} className='link-to-detail'>
        {/* 상품이미지 */}

        <div
          className='prod-img'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {rank && <div className='rank'>{rank}</div>}
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
          {disc !== true ? (
            <div>
              {prod.discount !== 0 ? (
                <div className='prod-discount'>{prod.discount}%</div>
              ) : (
                <div style={{ color: 'white' }}></div>
              )}
            </div>
          ) : (
            <div>
              {prod.discount !== 0 ? (
                <div className='prod-discount-sale'>{prod.discount}%</div>
              ) : (
                <div style={{ color: 'white' }}></div>
              )}
            </div>
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
          {prod.colors?.map((color, index) => (
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
