import { Products, CategoryData } from '../types/productTypes';

export const getData = async (
  url: string
): Promise<{ products: Products[]; categoryData: CategoryData[] }> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    // 데이터를 products와 categoryData로 분리
    const products = data.filter((item: Products[]) => 'productId' in item);
    const categoryData = data.filter(
      (item: CategoryData[]) => 'subCategories' in item
    );

    return { products, categoryData };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // 에러 발생 시 예외 처리
  }
};
