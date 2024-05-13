import React, { useState } from 'react';
import '../../styles/order/orderInfo.scss';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';

/* 주문정보 */
export default function OrderInfo() {
  const [productPrice] = useState(10000);

  return (
    <div className='order-info'>
      <div className='title'>결제 금액</div>
      <div className='line'></div>

      <div className='order-summary'>
        <div className='space-between'>
          <span>총 상품 금액</span>
          <span>{productPrice} 원</span>
        </div>
        <div className='coupon'>
          <div className='red space-between'>
            <span>쿠폰 할인 금액</span>
            <span>- {productPrice} 원</span>
          </div>
          <div className='space-between'>
            <span>
              <span className='lightgray'>↳</span> 상품 쿠폰
            </span>
            <span>- {productPrice} 원</span>
          </div>
        </div>
        <div className='space-between'>
          <span>마일리지 사용</span>
          <span>- {productPrice} P</span>
        </div>
        <div className='space-between'>
          <span>배송비</span>
          <span>+ 5,000 원</span>
        </div>
        <div className='space-between'>
          <span>
            <span className='lightgray'>↳</span> 상품 쿠폰 장바구니 쿠폰
          </span>
          <span>- 5000 원</span>
        </div>

        <div className='space-between'>
          <span>총 결제 금액</span>
          <span className='total-amount red'>{productPrice} 원</span>
        </div>

        <div className='line'></div>

        <CheckboxesGroup />

        <Button color='inherit' fullWidth variant='contained' type='button'>
          결제
        </Button>
      </div>
    </div>
  );
}

function CheckboxesGroup() {
  const [checked, setChecked] = useState([false, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <FormControlLabel
        label={
          <Typography variant='body2' color='textSecondary'>
            (필수) 개인정보 수집/이용 동의
          </Typography>
        }
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label={
          <Typography variant='body2' color='textSecondary'>
            (필수) 개인정보 제3자 제공 동의
          </Typography>
        }
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
    </Box>
  );

  return (
    <div>
      <FormControlLabel
        label={
          <Typography variant='body1'>
            주문 내용을 확인했으며, 아래 내용에 모두 동의합니다
          </Typography>
        }
        control={
          <Checkbox
            checked={checked[0] && checked[1]}
            onChange={handleChange1}
          />
        }
      />
      {children}
    </div>
  );
}
