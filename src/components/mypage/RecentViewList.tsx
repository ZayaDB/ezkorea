import { Products } from '../../types/productTypes';
import ProductItem from '../category/ProductItem';
import '../../styles/category/likes.scss';

const RecentViewList = () => {
  const clickedProducts: Products[] = JSON.parse(
    sessionStorage.getItem('clickedProducts') || '[]'
  );

  return (
    <div className='likes-page'>
      {clickedProducts.length === 0 ? (
        <div style={{ textAlign: 'center', margin: '200px' }}>
          최근 본 상품이 없습니다.
        </div>
      ) : (
        <div className='likes-content'>
          {clickedProducts.map(product => (
            <ProductItem key={product.productId} prod={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentViewList;
