import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from 'react';
import '../../styles/productDetail/productDetail.scss';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
// Modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Inquire() {
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

  // 선택
  const [color, setColor] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setColor(event.target.value as string);
  };
  return (
    <div>
      <div id='inquireTop'>
        <div id='inquireSubTop'>
          <div>문의</div>
          <div>문의 수</div>
        </div>
        <div>
          <Button onClick={handleOpen}>문의하기</Button>
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
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>color</InputLabel>
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
                  - 문의내용에 대한 답변은 ‘마이페이지 {'>'} 나의 문의내역’ 또는
                  ‘상품 상세페이지’에서 확인 가능합니다. <br />
                  - 배송,결제,교환/반품 문의는 고객센터로 문의 바랍니다.
                  <br />- 상품과 관련 없거나 부적합한 내용을 기재하시는 경우,
                  사전 고지 없이 삭제 또는 차단될 수 있습니다.
                </div>
              </div>
            </Typography>
            <Button onClick={snackClick}>문의하기</Button>
          </Box>
        </Modal>
      </div>
      <div>
        <Snackbar open={openSnack} autoHideDuration={6000} onClose={snackClose}>
          <Alert
            onClose={snackClose}
            severity='success'
            variant='filled'
            sx={{ width: '100%' }}
          >
            문의가 등록되었습니다.
          </Alert>
        </Snackbar>
      </div>

      <div>
        <div>Q</div>
      </div>
    </div>
  );
}
