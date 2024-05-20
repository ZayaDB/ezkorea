import ProductItem from './ProductItem';
import useSort from '../../hooks/shop/useSort';
import { useEffect, useState } from 'react';
import { getData } from '../../utils/getData';
import { Products } from '../../types/productTypes';
import '../../styles/category/likes.scss';

export default function SaleProduct() {
  const [prodData, setProdData] = useState<Products[]>([]);

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

  const sortOption = '할인율높은순';
  const sortedProducts = useSort(prodData, sortOption);

  return (
    <div className='likes-page'>
      <br />
      <div className='likes-content'>
        {sortedProducts.map(prod => (
          <ProductItem key={prod.productId} prod={prod} disc={true} />
        ))}
      </div>
    </div>
  );
}
