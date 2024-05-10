import { Box } from '@mui/material';
import ProductItem from './ProductItem';
import useSort from '../../hooks/useSort';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config';

export default function BestProduct() {
  const products = useSelector((state: RootState) => state.category.products);

  // 인기순으로 정렬된 상품 목록을 가져오기
  const sortOption = '인기순'; // 인기순 정렬 기준
  const sortedProducts = useSort(products, sortOption);

  return (
    <Box className='prod-wrapper'>
      {/* 정렬된 상품 목록을 map을 사용하여 각 상품 아이템을 렌더링 */}
      {sortedProducts.map(prod => (
        <ProductItem key={prod.productId} prod={prod} />
      ))}
    </Box>
  );
}
