import { useState } from 'react';

export function useProductHandler(initialProducts: string[] = []) {
  const [products, setProducts] = useState<string[]>(initialProducts);
  const [productName, setProductName] = useState('');

  const addProduct = () => {
    if (productName && !products.includes(productName)) {
      setProducts(prevProducts => [...prevProducts, productName]);
      setProductName(''); // 입력 필드 초기화
    }
  };

  return {
    products,
    productName,
    setProductName,
    addProduct,
    setProducts,
  };
}
