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
    <div className='discount-container'>
      <div className='margin-bottom'>
        <Head text='쿠폰 사용 및 상품 정보 / 총 1개' />

        <div className='applycoupon'>
          <span>쿠폰 할인 금액</span>
          <span>-{discount}원</span>
        </div>
      </div>
      <div className='discount-container-mileage-container'>
        <Head text='마일리지' />
        <div className='discount-container-mileage-container-content'>
          <div className='mileage-left'>
            <TextField
              id='mileage'
              fullWidth
              placeholder='사용 금액 입력'
              value={inputMileage}
              size='small'
            />
            <Button
              className='mileage-button'
              size='medium'
              variant='contained'
              color='secondary'
              onClick={() => {
                setInputMileage(mileage);
              }}
            >
              모두 사용
            </Button>
          </div>
          <div className='mileage-right'>
            <span className='lightgray'>보유 {mileage}P</span>
          </div>
        </div>
      </div>
    </div>
  );
}
