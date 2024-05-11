import { useEffect, useState } from 'react';

export interface Review {
  reUserId: number;
  reUserPhoto: string;
  reUserName: string;
  reDate: string;
  rating: number;
  contentPhoto: string;
  contentText: string;
}

export default function List() {
  // prodDetail에서 reviews 배열을 직접 가져옵니다.
  const [reviewData, setReviewData] = useState<Review[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/prodDetail.json');
        const data = await response.json();
        const reviews = data[0].reviews; 
        setReviewData(reviews);
      } catch (error) {
        console.error('Error fetching review data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {reviewData.map((item, index) => (
        <div key={index}>
          <p>User ID: {item.reUserId}</p>
          <p>User Name: {item.reUserName}</p>
          <p>Date: {item.reDate}</p>
          <p>Rating: {item.rating}</p>
          <p>Content: {item.contentText}</p>
          {/* 여기서 contentPhoto도 표시할 수 있음 */}
        </div>
      ))}
    </div>
  );
}
