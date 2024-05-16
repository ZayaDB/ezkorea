/* kakao-address */
import { Box, Button, Modal } from '@mui/material';
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

import { useDispatch } from 'react-redux';

import { updateAddressInfo } from '../../redux/slices/addressSlice';

import CloseButton from 'react-bootstrap/CloseButton';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Postcode() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button onClick={handleOpen} variant='contained' size='medium'>
        우편번호 검색
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <ModalContent handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
}

function ModalContent({ handleClose }: { handleClose: () => void }) {
  const dispatch = useDispatch();

  const handlePostCode = (data: any) => {
    console.log('------data', data);

    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    // console.log(data); /* 모든 데이터 */
    console.log(fullAddress); /* 주소 */
    console.log(data.zonecode); /* 우편번호 */

    if (data !== undefined) {
      dispatch(updateAddressInfo({ fullAddress, zonecode: data.zonecode }));
      // console.log('dispatch');
    }

    handleClose();
  };

  return (
    <>
      <div className='right-sort'>
        <CloseButton onClick={handleClose} />
      </div>
      <DaumPostcode autoClose onComplete={handlePostCode} />
    </>
  );
}
