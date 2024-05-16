// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Button from '@mui/material/Button';
// import ButtonGroup from '@mui/material/ButtonGroup';
// import { useState } from 'react';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Typography from '@mui/material/Typography';
// import Snackbar from '@mui/material/Snackbar';
// import Container from '@mui/material/Container';
// import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../styles/theme';
import '../../styles/productDetail/inquire.scss';
import { useState, useEffect } from 'react';
import { Inquiry } from '../../types/productDetail';
// // Modal
// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 500,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };

export default function Inquire() {
  // // Modal
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // // Snackbar
  // const [openSnack, setOpenSnack] = useState(false);
  // const snackClick = () => {
  //   setOpenSnack(true);
  // };
  // const snackClose = (
  //   event?: React.SyntheticEvent | Event,
  //   reason?: string
  // ) => {
  //   if (reason === 'clickaway') {
  //     return;
  //   }

  //   setOpenSnack(false);
  // };

  // 선택
  // const [color, setColor] = React.useState('');
  // const handleChange = (event: SelectChangeEvent) => {
  //   setColor(event.target.value as string);
  // };

  const [page, setPage] = useState(1);
  const [inquiryData, setInquiryData] = useState<Inquiry[]>([]);
  const inquiryPerPage = 5;

  // 리뷰 개수
  const [iqTotal, setIqTotal] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/prodInquiry.json');
        const data = await response.json();
        const inquiry = data[0].inquiry;
        const inquiryTo = data[0].inquiryTotal;
        setInquiryData(inquiry);
        setIqTotal(inquiryTo);
      } catch (error) {
        console.error('Error fetching review data:', error);
      }
    };

    fetchData();
  }, []);
  // 페이지네이션
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  // 현재 페이지에 해당하는 문의 목록 계산
  const startIndex = (page - 1) * inquiryPerPage;
  const endIndex = page * inquiryPerPage;
  const currentPageInquiries = inquiryData.slice(startIndex, endIndex);
  console.log(currentPageInquiries);

  return (
    <ThemeProvider theme={theme}>
      <div id='inquiryZone'>
        <div id='inquireTop'>
          <div id='inquireSubTop'>
            <div className='inquiryTitle'>문의</div>
            <div className='inquiryTotal'>{iqTotal}</div>
          </div>
          {/* <div>
            <Button onClick={handleOpen}>문의하기</Button>
          </div> */}
        </div>
        <div>
          {/* <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                상품 문의하기
              </Typography>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                <div>
                  <div className='inquiryTitle'>문의유형</div>
                  <ButtonGroup
                    variant='contained'
                    aria-label='Basic button group'
                  >
                    <Button>상품</Button>
                    <Button>배송</Button>
                    <Button>반품</Button>
                    <Button>교환</Button>
                    <Button>환불</Button>
                    <Button>기타</Button>
                  </ButtonGroup>
                </div>
                <div>
                  <div className='inquiryTitle'>상품 및 옵션</div>
                  <Box sx={{ maxWidth: 479 }}>
                    <FormControl sx={{ width: 400 }}>
                      <InputLabel id='demo-simple-select-label'>
                        color
                      </InputLabel>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={color}
                        label='color'
                        onChange={handleChange}
                      >
                        <MenuItem value={10}>Cream</MenuItem>
                        <MenuItem value={20}>Beige</MenuItem>
                        <MenuItem value={30}>Camel</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </div>
                <div>
                  <div className='inquiryTitle'>문의 내용</div>
                  <TextField
                    sx={{ width: 400 }}
                    id='outlined-multiline-static'
                    multiline
                    rows={4}
                    defaultValue='Default Value'
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label='비밀글로 문의하기'
                  />
                  <div>
                    - 문의내용에 대한 답변은 ‘마이페이지 {'>'} 나의 문의내역’
                    또는 ‘상품 상세페이지’에서 확인 가능합니다. <br />
                    - 배송,결제,교환/반품 문의는 고객센터로 문의 바랍니다.
                    <br />- 상품과 관련 없거나 부적합한 내용을 기재하시는 경우,
                    사전 고지 없이 삭제 또는 차단될 수 있습니다.
                  </div>
                </div>
              </Typography>
              <Container>
                <Button onClick={snackClick}>문의하기</Button>
              </Container>
            </Box>
          </Modal> */}
        </div>
        {/* <div>
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
              문의가 등록되었습니다.
            </Alert>
          </Snackbar>
        </div> */}
        <div id='writingInquiry'>
          {currentPageInquiries.map((inquiry, index) => (
            <div className='inquiryItem' key={index}>
              <div>
                <span>{inquiry.inquiryType} | </span>
                <span>{inquiry.answer}</span>
                <div className='writingInfo'>
                  <div className='type'>Q</div>
                  <div className='writingUser'>{inquiry.inUserName}</div>
                  <div className='writingDate'>{inquiry.inDate}</div>
                </div>
                <div className='reviewedContent'>{inquiry.inBrText}</div>
              </div>
            </div>
          ))}
          {/* <div className='inquiryItem'>
            <div>
              <span>배송 | </span>
              <span>답변완료</span>
              <div className='writingInfo'>
                <div className='type'>Q</div>
                <div className='writingUser'>작성자</div>
                <div className='writingDate'>2024.5.8</div>
              </div>
              <div className='reviewedContent'>
                5월 8일에 주문했는데 언제 발송될까요?
              </div>
            </div>
            <div>
              <div className='writingInfo'>
                <div className='type'>A</div>
                <div className='writingUser'>209애비뉴</div>
                <div className='writingDate'>2024.5.8</div>
              </div>
              <div className='reviewedContent'>
                안녕하세요. 고객님. 가구의 본질에 집중하는 209 애비뉴 입니다.
                이번주 금~토요일 배송 예정입니다. 주문일 기준 1~3일 내
                출고되어(주말 및 공휴일 불가) - 수도권은 영업일 기준 약 3~10일,
                - 경기외곽 및 지방은 영업일 기준 약 5~15일 소요됩니다. *별도
                지정일 배송은 불가한 점 양해 부탁드립니다* *별도 예약 배송
                불가합니다*
              </div>
            </div>
          </div> */}
        </div>
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
        >
          <Pagination
            count={Math.ceil(inquiryData.length / inquiryPerPage)}
            page={page}
            onChange={handleChangePage}
          />
        </Grid>
      </div>
    </ThemeProvider>
  );
}
