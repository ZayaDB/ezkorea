
import { useSelector } from 'react-redux';
// import ProductItem from '../category/ProductItem';
import { RootState } from '../../redux/config';
import { Products } from '../../types/typesProducts';

export default function HeartProduct() {
  const isLikedMap = useSelector((state: RootState) => state.category.isLiked);
  const products = useSelector((state: RootState) => state.category.products);

  // isLiked가 true인 상품들 필터링
  // const likedProducts = useSelector((state: RootState) =>
  //   products.filter(product => isLikedMap[product.productId] === true)
  // );
  const likedProducts = useSelector(() =>
    products.filter(product => isLikedMap[product.productId] === true)
  );

  return (
    <div>
      <h1>마이 페이지</h1>
      <div>
        {likedProducts.map((product: Products) => (
          <div key={product.productId}>
            <p>{product.name}</p>
            {/* 필요한 상품 정보를 렌더링 */}
            <img src={product.thumbnail} alt={product.name} />
            <p>{product.price}원</p>
            {/* 기타 필요한 상품 정보를 렌더링 */}
          </div>
        ))}
      </div>
    </div>
  );
}

