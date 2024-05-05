// getData.ts
import { Products } from '../types/typesProducts';
export const getData = async (
  url: string,
  setState: React.Dispatch<React.SetStateAction<Products[]>>
) => {
  try {
    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: Products[] = await response.json();
    console.log(data);
    setState(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
