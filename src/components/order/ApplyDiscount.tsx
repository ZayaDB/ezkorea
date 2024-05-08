import React from 'react';
import Head from './Head';
import { TextField } from '@mui/material';
/* 할인 적용
  - 쿠폰 : 쿠폰 적용 시 할인된 가격 표시
  - 포인트 : 1,000P 이상 사용 가능 멘트
*/
export default function ApplyDiscount() {
  return (
    <div>
      <Head text='할인 적용' />
      <div className='caption'>쿠폰</div>
      <TextField fullWidth id='coupon' />
      <div className='caption'>포인트</div>
      <TextField fullWidth id='point' />
    </div>
  );
}
