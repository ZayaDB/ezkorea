import React, { useState, useEffect } from 'react';
import { Products } from '../../types/typesProducts';
import ProductItem from './ProductItem';
import { Box, Pagination } from '@mui/material';
import '../../styles/category/productWrapCss.scss';
import { getData } from '../../utils/getData';

interface ProductListProps {
  selectedCategory: string;
  prodData: Products[];
}

const SaleProduct: React.FC<ProductListProps> = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: Products[] = await getData('/data/prodData.json');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching category data:', error);
      }
    };

    fetchData();
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  // 상품을 discout 수가 높은 순으로 정렬
  const sortedProducts = [...products].sort((a, b) => b.discount - a.discount);

  return (
    <Box className='prod-container-best'>
      <Box className='prod-wrapper'>
        {sortedProducts.map(prod => (
          <ProductItem key={prod.productId} prod={prod} />
        ))}
      </Box>
      {/* 페이지네이션 */}
      <Pagination count={10} />
    </Box>
  );
};

export default SaleProduct;
