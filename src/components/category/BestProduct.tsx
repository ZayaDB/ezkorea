// import React, { useState, useEffect } from 'react';
// import { Products,ProductListProps,CategoryData } from '../../types/typesProducts';
// import ProductItem from './ProductItem';
// import { Box, Pagination } from '@mui/material';
// import '../../styles/category/productWrapCss.scss';
// import { getData } from '../../utils/getData';



// const BestProduct: React.FC<ProductListProps> = () => {
//   const [products, setProducts] = useState<Products[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Products[] 타입 데이터 가져오기
//         const productsData: Products[] | CategoryData[] = await getData(
//           '/data/prodData.json'
//         );
//         if (Array.isArray(productsData) && productsData.length > 0) {
//           // Products[] 타입인 경우
//           setProducts(productsData as Products[]);
//         } else {
//           // CategoryData[] 타입인 경우
//           // setCategoryData(productsData as CategoryData[]);
//           return;
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

//   // 상품을 views 수가 높은 순으로 정렬
//   const sortedProducts = [...products].sort((a, b) => b.views - a.views);

//   return (
//     <Box className='prod-container-best'>
//       <Box className='prod-wrapper'>
//         {sortedProducts.map(prod => (
//           <ProductItem key={prod.productId} prod={prod} />
//         ))}
//       </Box>
//       {/* 페이지네이션 */}
//       <Pagination count={10} />
//     </Box>
//   );
// };

// export default BestProduct;

import React from 'react'

export default function BestProduct() {
  return (
    <div>BestProduct</div>
  )
}

