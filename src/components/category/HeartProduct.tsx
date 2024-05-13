
import ProductItem from '../category/ProductItem'; // ProductItem 컴포넌트를 가져옴
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config';
import '../../styles/category/likes.scss';

export default function HeartProduct() {
  const isLikedMap = useSelector((state: RootState) => state.category.isLiked);
  const products = useSelector((state: RootState) => state.category.products);

  // isLiked가 true인 상품들 필터링하여 likedProducts 배열에 저장
  const likedProducts = products.filter(
    product => isLikedMap[product.productId]
  );

  return (
    <div className='likes-page'>
      <div className='likes-content'>
      
          {/* 좋아요가 눌려있는 상품들을 순회하면서 ProductItem 컴포넌트를 렌더링 */}
          {likedProducts.map(product => (
            <ProductItem key={product.productId} prod={product} />
          ))}
      </div>
    </div>
  );
}
