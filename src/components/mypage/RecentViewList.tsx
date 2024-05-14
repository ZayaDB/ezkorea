import { Products } from '../../types/productTypes';
import ProductItem from '../category/ProductItem';
import '../../styles/category/likes.scss';

const RecentViewList = () => {
  const clickedProducts: Products[] = JSON.parse(
    sessionStorage.getItem('clickedProducts') || '[]'
  );

  return (
    <div className='likes-page'>
      <h1> 최근 본 상품 </h1>
      <div className='likes-content'>
        {/* 좋아요가 눌려있는 상품들을 순회하면서 ProductItem 컴포넌트를 렌더링 */}
        {clickedProducts.map(product => (
          <ProductItem key={product.productId} prod={product} />
        ))}
      </div>
    </div>
  );
};

export default RecentViewList;
