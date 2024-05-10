import '../../styles/productDetail/productDetail.scss';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { ChangeEvent, useRef, useState } from 'react';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';

// import { createTheme, makeStyles } from '@mui/material';
// const [currentPage, setCurrentPage] = useState(1);
// const onPageChange = (e: React.ChangeEvent<unknown>, page: number) => {
//   setCurrentPage(page);
// };
// Pagination
const OpenPage = (props: any) => {
  const { children, page, index } = props;
  return (
    <div hidden={page !== index}>
      {page === index && <Box mt={2}>{children}</Box>}
    </div>
  );
};

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
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div id='reviewZone'>
      <div id='reviewTop'>
        <div id='reviewBox'>
          <div id='reviewName'>리뷰</div>
          <div className='reviewTotal'>리뷰 수</div>
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
          <div id='writeReview'>
            <Button onClick={handleOpen}>리뷰쓰기</Button>
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
      </div>

      <div id='reviewSorting'>
        <div className='best selected'>베스트순</div>
        <div className='recent'>최신순</div>
      </div>
      <div className='reviewContents'>
        <Stack spacing={2}>
          <OpenPage page={page} index={1}>
            <div className='reviewItem'>
              <div className='reviewUser'>
                <div className='userPhoto'></div>
                <div className='userName'>두루루</div>
                <div className='writingdate'>24.05.06</div>
                <div className='reviewrating'>
                  <Stack spacing={1}>
                    <Rating
                      name='size-small'
                      defaultValue={2}
                      size='small'
                      readOnly
                    />
                  </Stack>
                </div>
              </div>
              <div className='reviewWB'>
                <div className='reviewPhoto'></div>
                <div className='reviewComments'>
                  신혼부부,취미 방을 어떻게 가꿀가 생각하다 책상은 필수템이라..
                  가로 사이즈를 조절할 수 있는 책상을 찾다가 구매 하게
                  되었습니다 군더더기 없는 심플한 디자인이 너무 마음에
                  들었습니다 실제로 받았을때 더 만족했습니다 모던한 디자인에 각
                  모서리 부분에 라운드 곡선이 고급스러운 느낌을 더 해주는것
                  같았어요
                </div>
              </div>
            </div>
            <div className='reviewItem'>
              <div className='reviewUser'>
                <div className='userPhoto'></div>
                <div className='userName'>두루루</div>
                <div className='writingdate'>24.05.06</div>
                <div className='reviewrating'>
                  <Stack spacing={1}>
                    <Rating
                      name='size-small'
                      defaultValue={2}
                      size='small'
                      readOnly
                    />
                  </Stack>
                </div>
              </div>
              <div className='reviewWB'>
                <div className='reviewPhoto'></div>
                <div className='reviewComments'>
                  신혼부부,취미 방을 어떻게 가꿀가 생각하다 책상은 필수템이라..
                  가로 사이즈를 조절할 수 있는 책상을 찾다가 구매 하게
                  되었습니다 군더더기 없는 심플한 디자인이 너무 마음에
                  들었습니다 실제로 받았을때 더 만족했습니다 모던한 디자인에 각
                  모서리 부분에 라운드 곡선이 고급스러운 느낌을 더 해주는것
                  같았어요
                </div>
              </div>
            </div>
            <div className='reviewItem'>
              <div className='reviewUser'>
                <div className='userPhoto'></div>
                <div className='userName'>두루루</div>
                <div className='writingdate'>24.05.06</div>
                <div className='reviewrating'>
                  <Stack spacing={1}>
                    <Rating
                      name='size-small'
                      defaultValue={2}
                      size='small'
                      readOnly
                    />
                  </Stack>
                </div>
              </div>
              <div className='reviewWB'>
                <div className='reviewPhoto'></div>
                <div className='reviewComments'>
                  신혼부부,취미 방을 어떻게 가꿀가 생각하다 책상은 필수템이라..
                  가로 사이즈를 조절할 수 있는 책상을 찾다가 구매 하게
                  되었습니다 군더더기 없는 심플한 디자인이 너무 마음에
                  들었습니다 실제로 받았을때 더 만족했습니다 모던한 디자인에 각
                  모서리 부분에 라운드 곡선이 고급스러운 느낌을 더 해주는것
                  같았어요
                </div>
              </div>
            </div>
            <div className='reviewItem'>
              <div className='reviewUser'>
                <div className='userPhoto'></div>
                <div className='userName'>두루루</div>
                <div className='writingdate'>24.05.06</div>
                <div className='reviewrating'>
                  <Stack spacing={1}>
                    <Rating
                      name='size-small'
                      defaultValue={2}
                      size='small'
                      readOnly
                    />
                  </Stack>
                </div>
              </div>
              <div className='reviewWB'>
                <div className='reviewPhoto'></div>
                <div className='reviewComments'>
                  신혼부부,취미 방을 어떻게 가꿀가 생각하다 책상은 필수템이라..
                  가로 사이즈를 조절할 수 있는 책상을 찾다가 구매 하게
                  되었습니다 군더더기 없는 심플한 디자인이 너무 마음에
                  들었습니다 실제로 받았을때 더 만족했습니다 모던한 디자인에 각
                  모서리 부분에 라운드 곡선이 고급스러운 느낌을 더 해주는것
                  같았어요
                </div>
              </div>
            </div>
            <div className='reviewItem'>
              <div className='reviewUser'>
                <div className='userPhoto'></div>
                <div className='userName'>두루루</div>
                <div className='writingdate'>24.05.06</div>
                <div className='reviewrating'>
                  <Stack spacing={1}>
                    <Rating
                      name='size-small'
                      defaultValue={2}
                      size='small'
                      readOnly
                    />
                  </Stack>
                </div>
              </div>
              <div className='reviewWB'>
                <div className='reviewPhoto'></div>
                <div className='reviewComments'>
                  신혼부부,취미 방을 어떻게 가꿀가 생각하다 책상은 필수템이라..
                  가로 사이즈를 조절할 수 있는 책상을 찾다가 구매 하게
                  되었습니다 군더더기 없는 심플한 디자인이 너무 마음에
                  들었습니다 실제로 받았을때 더 만족했습니다 모던한 디자인에 각
                  모서리 부분에 라운드 곡선이 고급스러운 느낌을 더 해주는것
                  같았어요
                </div>
              </div>
            </div>
          </OpenPage>
          <OpenPage page={page} index={2}>
            <div className='reviewItem'>
              <div className='reviewUser'>
                <div className='userPhoto'></div>
                <div className='userName'>두루루</div>
                <div className='writingdate'>24.05.06</div>
                <div className='reviewrating'>
                  <Stack spacing={1}>
                    <Rating
                      name='size-small'
                      defaultValue={2}
                      size='small'
                      readOnly
                    />
                  </Stack>
                </div>
              </div>
              <div className='reviewWB'>
                <div className='reviewPhoto'></div>
                <div className='reviewComments'>
                  주문 폭주로 거의 한 달 걸려서 받았지만ㅠ ㅠ 오래 기다릴 수
                  있을만큼 예쁘고 튼튼하고 좋아요! 조립은 성인 2명이서 30분 만에
                  끝냈고, 가방걸이는 숄더백 같이 끈 얇은 가방 3개까지는 걸려서
                  편하고 좋습니다ㅎㅎㅎ 1400으로 했는데 본체 올려놓고 수납함
                  올려두니까 딱 맞고, 카멜 싱글 모니터암도 잘 거치됩니다~ 멀티탭
                  정리함 안 쓸 것 같아서 추가 안 했는데, 막상 써보니까 없는 게
                  불편해서 따로 구매해 사용 중입니다(스탠드나 충전기 2개 쓰면
                  멀티탭 필수니까 사실 분은 미리 추가해서 구매하세요;) 화이트
                  톤으로 데스크테리어하기 좋은 것 같아요! 가성비 예쁜 책상으로
                  완전 추천합니다!
                </div>
              </div>
            </div>
            <div className='reviewItem'>
              <div className='reviewUser'>
                <div className='userPhoto'></div>
                <div className='userName'>두루루</div>
                <div className='writingdate'>24.05.06</div>
                <div className='reviewrating'>
                  <Stack spacing={1}>
                    <Rating
                      name='size-small'
                      defaultValue={2}
                      size='small'
                      readOnly
                    />
                  </Stack>
                </div>
              </div>
              <div className='reviewWB'>
                <div className='reviewPhoto'></div>
                <div className='reviewComments'>
                  주문 폭주로 거의 한 달 걸려서 받았지만ㅠ ㅠ 오래 기다릴 수
                  있을만큼 예쁘고 튼튼하고 좋아요! 조립은 성인 2명이서 30분 만에
                  끝냈고, 가방걸이는 숄더백 같이 끈 얇은 가방 3개까지는 걸려서
                  편하고 좋습니다ㅎㅎㅎ 1400으로 했는데 본체 올려놓고 수납함
                  올려두니까 딱 맞고, 카멜 싱글 모니터암도 잘 거치됩니다~ 멀티탭
                  정리함 안 쓸 것 같아서 추가 안 했는데, 막상 써보니까 없는 게
                  불편해서 따로 구매해 사용 중입니다(스탠드나 충전기 2개 쓰면
                  멀티탭 필수니까 사실 분은 미리 추가해서 구매하세요;) 화이트
                  톤으로 데스크테리어하기 좋은 것 같아요! 가성비 예쁜 책상으로
                  완전 추천합니다!
                </div>
              </div>
            </div>
            <div className='reviewItem'>
              <div className='reviewUser'>
                <div className='userPhoto'></div>
                <div className='userName'>두루루</div>
                <div className='writingdate'>24.05.06</div>
                <div className='reviewrating'>
                  <Stack spacing={1}>
                    <Rating
                      name='size-small'
                      defaultValue={2}
                      size='small'
                      readOnly
                    />
                  </Stack>
                </div>
              </div>
              <div className='reviewWB'>
                <div className='reviewPhoto'></div>
                <div className='reviewComments'>
                  주문 폭주로 거의 한 달 걸려서 받았지만ㅠ ㅠ 오래 기다릴 수
                  있을만큼 예쁘고 튼튼하고 좋아요! 조립은 성인 2명이서 30분 만에
                  끝냈고, 가방걸이는 숄더백 같이 끈 얇은 가방 3개까지는 걸려서
                  편하고 좋습니다ㅎㅎㅎ 1400으로 했는데 본체 올려놓고 수납함
                  올려두니까 딱 맞고, 카멜 싱글 모니터암도 잘 거치됩니다~ 멀티탭
                  정리함 안 쓸 것 같아서 추가 안 했는데, 막상 써보니까 없는 게
                  불편해서 따로 구매해 사용 중입니다(스탠드나 충전기 2개 쓰면
                  멀티탭 필수니까 사실 분은 미리 추가해서 구매하세요;) 화이트
                  톤으로 데스크테리어하기 좋은 것 같아요! 가성비 예쁜 책상으로
                  완전 추천합니다!
                </div>
              </div>
            </div>
            <div className='reviewItem'>
              <div className='reviewUser'>
                <div className='userPhoto'></div>
                <div className='userName'>두루루</div>
                <div className='writingdate'>24.05.06</div>
                <div className='reviewrating'>
                  <Stack spacing={1}>
                    <Rating
                      name='size-small'
                      defaultValue={2}
                      size='small'
                      readOnly
                    />
                  </Stack>
                </div>
              </div>
              <div className='reviewWB'>
                <div className='reviewPhoto'></div>
                <div className='reviewComments'>
                  주문 폭주로 거의 한 달 걸려서 받았지만ㅠ ㅠ 오래 기다릴 수
                  있을만큼 예쁘고 튼튼하고 좋아요! 조립은 성인 2명이서 30분 만에
                  끝냈고, 가방걸이는 숄더백 같이 끈 얇은 가방 3개까지는 걸려서
                  편하고 좋습니다ㅎㅎㅎ 1400으로 했는데 본체 올려놓고 수납함
                  올려두니까 딱 맞고, 카멜 싱글 모니터암도 잘 거치됩니다~ 멀티탭
                  정리함 안 쓸 것 같아서 추가 안 했는데, 막상 써보니까 없는 게
                  불편해서 따로 구매해 사용 중입니다(스탠드나 충전기 2개 쓰면
                  멀티탭 필수니까 사실 분은 미리 추가해서 구매하세요;) 화이트
                  톤으로 데스크테리어하기 좋은 것 같아요! 가성비 예쁜 책상으로
                  완전 추천합니다!
                </div>
              </div>
            </div>
            <div className='reviewItem'>
              <div className='reviewUser'>
                <div className='userPhoto'></div>
                <div className='userName'>두루루</div>
                <div className='writingdate'>24.05.06</div>
                <div className='reviewrating'>
                  <Stack spacing={1}>
                    <Rating
                      name='size-small'
                      defaultValue={2}
                      size='small'
                      readOnly
                    />
                  </Stack>
                </div>
              </div>
              <div className='reviewWB'>
                <div className='reviewPhoto'></div>
                <div className='reviewComments'>
                  주문 폭주로 거의 한 달 걸려서 받았지만ㅠ ㅠ 오래 기다릴 수
                  있을만큼 예쁘고 튼튼하고 좋아요! 조립은 성인 2명이서 30분 만에
                  끝냈고, 가방걸이는 숄더백 같이 끈 얇은 가방 3개까지는 걸려서
                  편하고 좋습니다ㅎㅎㅎ 1400으로 했는데 본체 올려놓고 수납함
                  올려두니까 딱 맞고, 카멜 싱글 모니터암도 잘 거치됩니다~ 멀티탭
                  정리함 안 쓸 것 같아서 추가 안 했는데, 막상 써보니까 없는 게
                  불편해서 따로 구매해 사용 중입니다(스탠드나 충전기 2개 쓰면
                  멀티탭 필수니까 사실 분은 미리 추가해서 구매하세요;) 화이트
                  톤으로 데스크테리어하기 좋은 것 같아요! 가성비 예쁜 책상으로
                  완전 추천합니다!
                </div>
              </div>
            </div>
          </OpenPage>
          <OpenPage page={page} index={3}>
            page 3
          </OpenPage>
          <OpenPage page={page} index={4}>
            page 4
          </OpenPage>
          <Pagination count={10} page={page} onChange={handleChange} />
        </Stack>
      </div>
    </div>
  );
}
