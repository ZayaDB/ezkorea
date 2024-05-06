import { Products } from '../types/typesProducts';

export const getData = async (url: string): Promise<Products[]> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Products[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // 에러 발생 시 빈 배열을 반환하거나 적절한 에러 처리를 수행할 수 있습니다.
  }
};
