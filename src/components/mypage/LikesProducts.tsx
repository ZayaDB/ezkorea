import { useState, useEffect } from 'react';
import ProductItem from '../category/ProductItem';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config';
import { Products } from '../../types/productTypes';
import '../../styles/category/likes.scss';
import { getData } from '../../utils/getData';

const LikesProduct = () => {
  const [filteredProducts, setFilteredProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const isLikedMap = useSelector((state: RootState) => state.category.isLiked);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);

    try {
      const { products } = await getData('/data/prodData.json');

      const likedProducts = products.filter(
        (product: Products) => isLikedMap[product.productId]
      );
      setFilteredProducts(likedProducts); // 필터링된 상품 목록 설정
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div className='likes-page'>
      {loading ? (
        <div style={{ textAlign: 'center', margin: '200px' }}>Loading...</div>
      ) : filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', margin: '200px' }}>
          찜한 상품이 없습니다.
        </div>
      ) : (
        <div className='likes-content'>
          {/* 좋아요가 눌려있는 상품들을 순회하면서 ProductItem 컴포넌트를 렌더링 */}
          {filteredProducts.map(product => (
            <ProductItem key={product.productId} prod={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikesProduct;
