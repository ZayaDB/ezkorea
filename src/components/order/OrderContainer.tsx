import React from 'react';
import TextField from '@mui/material/TextField';

import { useState } from 'react';
import DeliveryInfo from './DeliveryInfo';
import Head from './Head';
import PaymentMethod from './PaymentMethod';
import ApplyDiscount from './ApplyDiscount';

/* 주문자 정보 
  - 회원가입할 때 입력한 정보 가져오기
  - session에 담긴 user_id 확인 후 휴대폰 번호, 배송지 주소 불러오기
*/
function CustomerInformation() {
  const [ordererName] = useState<string>('');
  // const [ordererPhoneNum] = useState<number>();

  return (
    <div className='order-customer-info'>
      <Head text='주문자 정보' />

      <div className='caption'>주문자</div>
      <TextField
        fullWidth
        className='text-field'
        value={ordererName}
        InputProps={{
          readOnly: true,
        }}
      />
      <div className='caption'>휴대폰번호</div>
      <div className='orderer-num-container'>
        <TextField
          className='num'
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        <span>-</span>
        <TextField
          className='num'
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
        <span>-</span>
        <TextField
          className='num'
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
      <div></div>
    </div>
  );
}

export default function OrderContainer() {
  return (
    /* container 부분 50%만 차지하게 해야함 */
    <div className='order-content'>
      <div className='margin-bottom'>
        <CustomerInformation />
      </div>
      <div className='margin-bottom'>
        <DeliveryInfo />
      </div>
      <div className='margin-bottom'>
        <ApplyDiscount />
      </div>
      <div className='margin-bottom'>
        <PaymentMethod />
      </div>
    </div>
  );
}
