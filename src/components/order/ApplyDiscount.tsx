import React, { ChangeEvent, useState } from 'react';
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

  const handleMileageChange = (event: ChangeEvent<HTMLInputElement>) => {
    // 입력값이 숫자인지 확인
    const value = Number(event.target.value);
    if (!isNaN(value)) {
      // 숫자만 입력되도록 함
      setInputMileage(value);
    }
  };

  const applyAllMileage = () => {
    setInputMileage(mileage);
  };

  // 마일리지 입력이 유효한지 검증하는 함수
  const isValidMileage = (input: number | undefined) => {
    return input !== undefined && input <= mileage;
  };

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
              // 입력값이 변경될 때 유효성 검사 함수 호출
              error={!isValidMileage(inputMileage)}
              onChange={handleMileageChange}
            />
            <Button
              className='mileage-button'
              size='medium'
              variant='contained'
              color='secondary'
              onClick={applyAllMileage}
            >
              모두 사용
            </Button>
          </div>
          <div className='mileage-right'>
            <span className='lightgray'>보유 {mileage}P</span>
          </div>
        </div>
        {!isValidMileage(inputMileage) && (
          <span className='error-message red'>
            입력된 마일리지가 보유한 마일리지를 초과합니다.
          </span>
        )}
      </div>
    </div>
  );
}
