import React from 'react';
import TextField from '@mui/material/TextField';

import { useState } from 'react';
import DeliveryInfo from './DeliveryInfo';
import Head from './Head';
import PaymentMethod from './PaymentMethod';
import { Container } from '@mui/material';

/* 주문자 정보 
  - 회원가입할 때 입력한 정보 가져오기
  - session에 담긴 user_id 확인 후 휴대폰 번호, 배송지 주소 불러오기
*/
function CustomerInformation() {
  const [ordererName] = useState<string>('');
  const [ordererPhoneNum] = useState<number>();

  return (
    <div className='order-customer-info'>
      <Head text='주문자 정보' />

      <div className='caption'>주문자</div>
      <TextField fullWidth id='fullWidth' value={ordererName} disabled />
      <div className='caption'>휴대폰번호</div>
      <div className='orderer-num-container'>
        <TextField className='num' fullWidth disabled />
        <span>-</span>
        <TextField className='num' fullWidth disabled />
        <span>-</span>
        <TextField className='num' fullWidth disabled />
      </div>
      <div></div>
    </div>
  );
}

/* 할인 적용
  - 쿠폰 : 쿠폰 적용 시 할인된 가격 표시
  - 포인트 : 1,000P 이상 사용 가능 멘트
*/
function ApplyDiscount() {
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

export default function OrderContainer() {
  return (
    /* container 부분 50%만 차지하게 해야함 */
    <div className='order-content'>
      <CustomerInformation />
      <DeliveryInfo />
      <ApplyDiscount />
      <PaymentMethod />
    </div>
  );
}
