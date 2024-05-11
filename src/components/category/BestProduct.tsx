
import { Box } from '@mui/material';
import ProductItem from './ProductItem';
import useSort from '../../hooks/shop/useSort';
import { useEffect, useState } from 'react';
import { getData } from '../../utils/getData';
import { Products } from '../../types/typesProducts';

import '../../styles/category/productWrap.scss';

export default function BestProduct() {
  const [prodData, setProdData] = useState<Products[]>([]); // Specify the type as Products[]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { products } = await getData('/data/prodData.json');
        setProdData(products);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // 인기순으로 정렬된 상품 목록을 가져오기
  const sortOption = '인기순'; // 인기순 정렬 기준
  const sortedProducts = useSort(prodData, sortOption);

  return (
    <Box className='best-content'>
      <div
        style={{ textAlign: 'center', paddingTop: '40px', fontSize: '25px' }}
      >
        BEST PRODUCTS
      </div>
      <Box className='prod-wrapper-best'>
        {sortedProducts.map(prod => (
          // <Box className='bestProds'>
            <ProductItem key={prod.productId} prod={prod} />
          // </Box>
        ))}
      </Box>
    </Box>
  );
}

