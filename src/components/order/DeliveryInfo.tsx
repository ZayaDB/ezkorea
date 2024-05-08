import React from 'react';
import { useSelector } from 'react-redux';

import { useState } from 'react';
import Head from './Head';
import { FormControl, MenuItem, TextField } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Postcode from './Postcode';

/* 수령자 정보 
  - 1. 주문자 정보와 동일 : 정보 가져오기(CustomerInformation에서 내려받기)
  - 2. 새로운 배송지 : 배송지 정보 새로 넣기
*/
export default function DeliveryInfo() {
  const [selected, setSelected] = useState<boolean>(true);
  return (
    <div className='order-recipitent-info'>
      <Head text='배송 정보' />
      <label>
        <input
          type='radio'
          name='method'
          id='default'
          defaultChecked={true}
          onClick={() => {
            setSelected(true);
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
            setSelected(false);
          }}
        />
        새로운 배송지
      </label>
      <DeliveryInfoContent />
    </div>
  );
}

function DeliveryInfoContent() {
  /* address 불러오기 */
  const address = useSelector(state => (state as any).address);
  const zonecode = useSelector(state => (state as any).zonecode);

  const [firstNum, setFirstNum] = useState<string>('010');

  const handleChange = (event: SelectChangeEvent) => {
    setFirstNum(event.target.value);
  };
  return (
    <>
      <TextField fullWidth placeholder='받으시는 분' />
      <TextField placeholder='우편번호' value={zonecode} />
      <Postcode />
      <TextField fullWidth placeholder='기본주소' value={address} />
      <TextField fullWidth placeholder='나머지주소' />

      <div className='orderer-num-container'>
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
    </>
  );
}
