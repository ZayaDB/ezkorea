import { useMemo } from 'react';
import { Products,SortOption } from '../types/typesProducts';



const useSort = (products: Products[], sortOption: SortOption) => {
  const sortedProducts = useMemo(() => {
    switch (sortOption) {
      case '인기순':
        return products.slice().sort((a, b) => b.views - a.views);
      case '리뷰많은순':
        return products.slice().sort((a, b) => b.commentCount - a.commentCount);
      case '낮은가격순':
        return products.slice().sort((a, b) => {
          const priceA = parseInt(a.price.replace(',', ''));
          const priceB = parseInt(b.price.replace(',', ''));
          return priceA - priceB;
        });
      case '높은가격순':
        return products.slice().sort((a, b) => {
          const priceA = parseInt(a.price.replace(',', ''));
          const priceB = parseInt(b.price.replace(',', ''));
          return priceB - priceA;
        });
      case '할인율높은순':
        return products.slice().sort((a, b) => b.discount - a.discount);
      default:
        return products;
    }
  }, [products, sortOption]);

  return sortedProducts;
};

export default useSort;

