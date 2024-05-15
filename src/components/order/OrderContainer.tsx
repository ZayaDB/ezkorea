import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

import DeliveryInfo from './DeliveryInfo';
import Head from './Head';
import PaymentMethod from './PaymentMethod';
import ApplyDiscount from './ApplyDiscount';

/* 주문자 정보 
  - 회원가입할 때 입력한 정보 가져오기
  - session에 담긴 user_id 확인 후 휴대폰 번호, 배송지 주소 불러오기
*/
function CustomerInformation() {
  const [ordererName, setOrdererName] = useState<string>('');
  const [phoneNumFirst, setPhoneNumFist] = useState<string>();
  const [phoneNumSecond, setPhoneNumSecond] = useState<number>();
  const [phoneNumThird, setPhoneNumThird] = useState<number>();

  const userDataString = sessionStorage.getItem('UserData');
  useEffect(() => {
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setOrdererName(userData[0].username);
      const phoneNumber = userData[0].phone;
      const phoneNumberParts = phoneNumber.split('-');
      setPhoneNumFist(phoneNumberParts[0]);
      setPhoneNumSecond(phoneNumberParts[1]);
      setPhoneNumThird(phoneNumberParts[2]);
    }
  }, [userDataString]);

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
          value={phoneNumFirst}
        />
        <span>-</span>
        <TextField
          className='num'
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          value={phoneNumSecond}
        />
        <span>-</span>
        <TextField
          className='num'
          fullWidth
          InputProps={{
            readOnly: true,
          }}
          value={phoneNumThird}
        />
      </div>
      <div></div>
    </div>
  );
}

export default function OrderContainer() {
  return (
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
