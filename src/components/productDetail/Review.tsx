import '../../styles/productDetail/review.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../styles/theme';
// import { createTheme, makeStyles } from '@mui/material';
// const [currentPage, setCurrentPage] = useState(1);
// const onPageChange = (e: React.ChangeEvent<unknown>, page: number) => {
//   setCurrentPage(page);
// };

// interface ProductDetail {
//   children: React.ReactNode;
//   page: number;
//   index: number;
// }
// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#4AD395',
//     },
//   },
// });

export interface Review {
  reUserId: number;
  reUserPhoto: string;
  reUserName: string;
  reDate: string;
  rating: number;
  contentPhoto: string;
  contentText: string;
}

// Pagination
// const OpenPage = (props: ProductDetail) => {
//   const { children, page, index } = props;
//   return (
//     <div hidden={page !== index}>
//       {page === index && <Box mt={2}>{children}</Box>}
//     </div>
//   );
// };

// Modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
// file
export function FileInput() {
  const inputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);

  // Handle the change event when a file is selected
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target.files && event.target.files.length > 0) {
      // setSelectedFile(event.target[0]);
    }
  };

  const onChooseFile = () => {
    // inputRef.current.click();
  };
  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div>
      {/* Hidden file input element */}
      <input
        type='file'
        ref={inputRef}
        onChange={handleOnChange}
        style={{ display: 'none' }}
      />

      {/* Button to trigger the file input dialog */}
      <button className='fileBtn' onClick={onChooseFile}>
        <span className='upload'>upload</span>Upload File
      </button>

      {selectedFile && (
        <div className='selectedFile'>
          <p>{selectedFile}</p>

          <button onClick={removeFile}>
            <span className='upload'>delete</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default function Review() {
  // 리뷰 개수
  const [rvTotal, setRvTotal] = useState();
  // rating
  const value = 3.5;

  // Modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Snackbar
  const [openSnack, setOpenSnack] = useState(false);
  const snackClick = () => {
    setOpenSnack(true);
  };
  const snackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };
  // pagination
  const [page, setPage] = useState(1);
  const [reviewData, setReviewData] = useState<Review[]>([]);
  const reviewsPerPage = 5;
  // sort
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sortedReviews, setSortedReviews] = useState<Review[]>([]);
  const [sortBy, setSortBy] = useState<string>('');

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
  // 소팅
  // 정렬
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
          <div id='writeReview'>
            <Button onClick={handleOpen}>
              <h6>리뷰쓰기</h6>
            </Button>
          </div>
        </div>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                리뷰 쓰기
              </Typography>
              <div>포토리뷰 250P, 일반리뷰 100P</div>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                <div id='reviewProduct'>
                  <div className='productPhoto'></div>
                  <div id='productBN'>
                    <div className='productBrand'></div>
                    <div className='productName'></div>
                  </div>
                  <div className='reviewTitle'>별점 평가</div>
                  <div id='ratingZone'>
                    <div>만족도</div>
                    <div className='ratingInput'>
                      <Rating name='size-large' defaultValue={2} size='large' />
                    </div>
                  </div>
                  <div id='file'>
                    <div className='reviewTitle'>사진 첨부(선택)</div>
                    <div>사진을 첨부해주세요.(최대 1장)</div>
                    <FileInput />
                  </div>
                  <div id='writingReview'>
                    <div className='reviewTitle'>리뷰 작성</div>
                    <TextField
                      sx={{ width: 400 }}
                      id='outlined-multiline-static'
                      multiline
                      rows={4}
                      defaultValue='Default Value'
                    />
                  </div>
                </div>
              </Typography>
              <Button onClick={snackClick}>리뷰 등록하기</Button>
            </Box>
          </Modal>
        </div>
        <div>
          <Snackbar
            open={openSnack}
            autoHideDuration={6000}
            onClose={snackClose}
          >
            <Alert
              onClose={snackClose}
              severity='success'
              variant='filled'
              sx={{ width: '100%' }}
            >
              고객님의 소중한 리뷰가 등록되었습니다.
            </Alert>
          </Snackbar>
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
                      defaultValue={item.rating}
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
