import React from 'react';
import { useSelector } from 'react-redux';

import { useState } from 'react';
import Head from './Head';
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Modal,
  TextField,
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import CloseButton from 'react-bootstrap/CloseButton';
import Postcode from './Postcode';
import { RootState } from '../../redux/config';
import { useAddressBook } from '../../hooks/useAddressBook';

/* 수령자 정보 
  - 1. 주문자 정보와 동일 : 정보 가져오기(CustomerInformation에서 내려받기)
  - 2. 새로운 배송지 : 배송지 정보 새로 넣기
*/
export default function DeliveryInfo() {
  // const [selected, setSelected] = useState<boolean>(true);
  return (
    <div className='order-recipitent-info'>
      <Head text='배송 정보' />
      <div className='order-recipitent-info-top'>
        <div>
          <label>
            <input
              type='radio'
              name='method'
              id='default'
              defaultChecked={true}
              onClick={() => {
                // setSelected(true);
              }}
            />
            주문자 정보와 동일
          </label>
          <label>
            <input
              type='radio'
              name='method'
              id='new'
              onClick={() => {
                // setSelected(false);
              }}
            />
            새로운 배송지
          </label>
        </div>
        <AddressBook />
      </div>
      <DeliveryInfoContent />
    </div>
  );
}

function DeliveryInfoContent() {
  /* address 불러오기 */
  const address = useSelector((state: RootState) => state.address.fullAddress);
  const zonecode = useSelector((state: RootState) => state.address.zonecode);

  console.log(address, zonecode);

  const [firstNum, setFirstNum] = useState<string>('010');

  const handleChange = (event: SelectChangeEvent) => {
    setFirstNum(event.target.value);
  };
  return (
    <div className='deliveryinfo-container'>
      <TextField fullWidth placeholder='받으시는 분' className='text-field' />
      <div className='text-field postcode'>
        <TextField placeholder='우편번호' value={zonecode} disabled />
        <Postcode />
      </div>
      <TextField
        fullWidth
        placeholder='기본주소'
        value={address}
        disabled
        className='text-field'
      />
      <TextField fullWidth placeholder='나머지주소' className='text-field' />

      <div className='orderer-num-container text-field'>
        <FormControl fullWidth={true}>
          <Select
            value={firstNum}
            defaultValue={firstNum}
            onChange={handleChange}
            autoWidth
          >
            <MenuItem value={'010'}>010</MenuItem>
            <MenuItem value={'011'}>011</MenuItem>
            <MenuItem value={'016'}>016</MenuItem>
            <MenuItem value={'017'}>017</MenuItem>
          </Select>
        </FormControl>
        <span>-</span>
        <TextField className='num' fullWidth />
        <span>-</span>
        <TextField className='num' fullWidth />
      </div>
      <TextField fullWidth placeholder='배송 메시지' />
    </div>
  );
}

/* address 타입 지정 */
interface Address {
  name: string;
  nickname: string;
  address: string;
  zipcode: string;
  phoneNumber: string;
}

/* 주소록 기능 */
function AddressBook() {
  /* 주소록 클릭 시 모달창 */
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

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /* 주소록 추가 시 모달창 */

  return (
    <>
      <Button
        onClick={handleOpen}
        variant='contained'
        size='medium'
        color='secondary'
      >
        주소록
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CloseButton onClick={handleClose} />
          <div className='address-caption'>배송지 목록</div>
          <AddAddress />
          <button>주소록 추가</button>
        </Box>
      </Modal>
    </>
  );
}

function AddAddress() {
  return <></>;
}
