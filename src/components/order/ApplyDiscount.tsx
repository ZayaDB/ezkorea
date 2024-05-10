import React, { useState } from 'react';
import Head from './Head';
import { Button, TextField } from '@mui/material';
/* 할인 적용
  - 쿠폰 : 쿠폰 적용 시 할인된 가격 표시
  - 포인트 : 1,000P 이상 사용 가능 멘트
*/
export default function ApplyDiscount() {
  const [discount] = useState<string>('42,000');

  const [mileage] = useState<number>(1000);
  const [inputMileage, setInputMileage] = useState<number>();

  return (
    <div>
      <Head text='쿠폰 사용 및 상품 정보 / 총 1개' />

      <div className='applycoupon'>
        <span>쿠폰 할인 금액</span>
        <span>-{discount}원</span>
      </div>
      <Head text='마일리지' />
      <TextField
        id='mileage'
        placeholder='사용 금액 입력'
        value={inputMileage}
      />
      <Button
        variant='contained'
        onClick={() => {
          setInputMileage(mileage);
        }}
      >
        모두 사용
      </Button>
      <span className='mileage-container'>
        <span className='lightgray'>보유 {mileage}P</span>
      </span>
    </div>
  );
}
