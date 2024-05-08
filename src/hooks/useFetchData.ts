// import { useState, useEffect } from 'react';

// export const useFetchData = <T>(url: string): [T | null, boolean, any] => {
//   const [data, setData] = useState<T | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<any>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const json = (await response.json()) as T;
//         setData(json);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url]);

//   useEffect(() => {
//     console.log('Data:', data);
//     console.log('Loading:', loading);
//     console.log('Error:', error); 
//   }, [data, loading, error]);

//   return [data, loading, error];
// };

import { useState, useEffect } from 'react';

export const useFetchData = <T>(url: string): [T | null, boolean, any] => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching data from URL:', url);  // URL 로깅
      try {
        const response = await fetch(url);
        console.log('Response status:', response.status); // 응답 상태 로깅
        console.log('Response headers:', response.headers); // 응답 헤더 로깅
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const json: T = await response.json();
        console.log('Received data:', json); // 파싱된 데이터 로깅
        setData(json);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return [data, loading, error];
};
