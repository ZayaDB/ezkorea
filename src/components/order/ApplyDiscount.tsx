import React, { ChangeEvent, useState } from 'react';
import Head from './Head';
import { Button, TextField } from '@mui/material';
import { addCommasToNumber } from '../../hooks/addCommasToNumber';
import { updateMileage } from '../../redux/slices/mileageSlice';
import { useDispatch } from 'react-redux';

/* 할인 적용
  - 쿠폰 : 쿠폰 적용 시 할인된 가격 표시
  - 포인트 : 1,000P 이상 사용 가능 멘트
*/
export default function ApplyDiscount() {
  const [mileage] = useState<number>(1000);

  const [inputMileage, setInputMileage] = useState<number>();

  const handleMileageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value)) {
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

  // 입력값이 있고 유효하지 않은 경우 에러 표시
  const isError = inputMileage !== undefined && !isValidMileage(inputMileage);

  return (
    <div className='discount-container'>
      <div className='margin-bottom'>
        <Head text='쿠폰 사용 및 상품 정보' />
        <CouponContent />
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
              error={isError}
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
            <span className='gray'>보유 {addCommasToNumber(mileage)}P</span>
          </div>
        </div>
        {/* 입력값이 있고 유효하지 않은 경우 에러 메시지 표시 */}
        {isError && (
          <span className='error-message red'>
            입력된 마일리지가 보유한 마일리지를 초과합니다.
          </span>
        )}
      </div>
    </div>
  );
}

function CouponContent() {
  const [discount] = useState<number>(42000);
  return (
    <>
      <div className='applycoupon'>
        <span>쿠폰 할인 금액</span>
        <span>-{discount}원</span>
      </div>
    </>
  );
}
