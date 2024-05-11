import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';

interface Review {
  reUserId: number;
  reUserName: string;
  reDate: string;
  rating: number;
  contentText: string;
}

const List = () => {
  const [page, setPage] = useState(1);
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const reviewsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/prodReview.json');
        const data = await response.json();
        const reviews = data[0].reviews;
        setReviewData(reviews);
      } catch (error) {
        console.error('Error fetching review data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  const startIndex = (page - 1) * reviewsPerPage;
  const endIndex = page * reviewsPerPage;
  const currentReviews = reviewData.slice(startIndex, endIndex);

  return (
    <div>
      {currentReviews.map((item, index) => (
        <div className='reviewItem' key={index}>
          <div className='reviewUser'>
            <div className='userPhoto'></div>
            <div className='userName'>{item.reUserName}</div>
            <div className='writingdate'>{item.reDate}</div>
            <div className='reviewrating'>
              {item.rating}
              <Stack spacing={1}>
                <Rating
                  name='size-small'
                  value={item.rating}
                  size='small'
                  readOnly
                />
              </Stack>
            </div>
          </div>
          <div className='reviewWB'>
            <div className='reviewPhoto'></div>
            <div className='reviewComments'>{item.contentText}</div>
          </div>
        </div>
      ))}
      {/* Pagination */}
      <div>
        <Pagination
          count={Math.ceil(reviewData.length / reviewsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </div>
    </div>
  );
};

export default List;
