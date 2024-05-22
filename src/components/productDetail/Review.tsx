import '../../styles/productDetail/review.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useEffect, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../styles/theme';
import Grid from '@mui/material/Grid';

export interface Review {
  reUserId: number;
  reUserPhoto: string;
  reUserName: string;
  reDate: string;
  rating: number;
  contentPhoto: string;
  contentText: string;
}

export default function Review() {
  // 리뷰 개수
  const [rvTotal, setRvTotal] = useState();
  // rating
  const value = 3.5;
  // pagination
  const [page, setPage] = useState(1);
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const reviewsPerPage = 5;
  // sort
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sortedReviews, setSortedReviews] = useState<Review[]>([]);
  const [sortBy, setSortBy] = useState<string>('');
  console.log(sortBy);
  // fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/prodReview.json');
        const data = await response.json();
        const reviews = data[0].reviews;
        const reviewTo = data[0].reviewTotal;
        setReviewData(reviews);
        setReviews(reviews);
        setSortedReviews(reviews); // 초기에 정렬되지 않은 데이터로 설정
        setRvTotal(reviewTo);
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
  // 페이지네이션
  const startIndex = (page - 1) * reviewsPerPage;
  const endIndex = page * reviewsPerPage;
  const currentReviews = reviewData.slice(startIndex, endIndex);
  console.log(currentReviews);

  // 별점 높은순 정렬
  const sortByHighestRating = () => {
    const sorted = [...reviews].sort((a, b) => b.rating - a.rating);
    setSortedReviews(sorted);
    setSortBy('별점 높은순');
  };

  // 별점 낮은순 정렬
  const sortByLowestRating = () => {
    const sorted = [...reviews].sort((a, b) => a.rating - b.rating);
    setSortedReviews(sorted);
    setSortBy('별점 낮은순');
  };

  // 최신순 정렬
  const sortByRecent = () => {
    const sorted = [...reviews].sort(
      (a, b) => new Date(b.reDate).getTime() - new Date(a.reDate).getTime()
    );
    setSortedReviews(sorted);
    setSortBy('최신순');
  };
  return (
    <ThemeProvider theme={theme}>
      <div id='reviewZone'>
        <div id='reviewTop'>
          <div id='reviewBox'>
            <div id='reviewName'>리뷰</div>
            <div className='reviewTotal'>{rvTotal}</div>
            <div id='ratingBox'>
              <div className='starTotal'>
                <Box
                  sx={{
                    width: 120,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Rating name='read-only' value={value} readOnly />
                  <Box sx={{ ml: 2 }}></Box>
                </Box>
              </div>
              <div className='rating'>평점</div>
            </div>
          </div>
        </div>
        <div id='reviewSorting'>
          <button className='highestRating' onClick={sortByHighestRating}>
            별점 높은순
          </button>
          <button className='lowestRating' onClick={sortByLowestRating}>
            별점 낮은순
          </button>
          <button className='recent' onClick={sortByRecent}>
            최신순
          </button>
        </div>
        <div className='reviewContents'>
          {sortedReviews.slice(startIndex, endIndex).map((item, index) => (
            <div className='reviewItem' key={index}>
              <div className='reviewUser'>
                <div className='userPhoto'></div>
                <div className='userName'> {item.reUserName}</div>
                <div className='writingdate'>{item.reDate}</div>
                <div className='reviewrating'>
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
                <div className='reviewPhoto'>
                  <img src={item.contentPhoto} alt='스타일링샷' />
                </div>
                <div className='reviewComments'>{item.contentText}</div>
              </div>
            </div>
          ))}

          <div className='rePagination'>
            {/* mui 요소 중앙정렬 Grid 사용하기 */}
            <Grid
              container
              direction='row'
              justifyContent='center'
              alignItems='center'
            >
              <Pagination
                count={Math.ceil(reviewData.length / reviewsPerPage)}
                page={page}
                onChange={handleChangePage}
              />
            </Grid>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
