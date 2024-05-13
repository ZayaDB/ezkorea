import React, { ChangeEvent, useState } from 'react';
import Head from './Head';
import { Button, TextField } from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { addCommasToNumber } from '../../hooks/addCommasToNumber';
// import { updateMileage } from '../../redux/slices/mileageSlice';
// import { useDispatch } from 'react-redux';

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

interface Coupon {
  name: string;
  discount: number;
}

function CouponContent() {
  const [checked, setChecked] = useState<boolean>(true);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);

    /* 쿠폰 제거 */
    removeCoupon();
  };

  /* 쿠폰 */

  const price = 40000;

  const [currentPrice, setCurrentPrice] = useState<number>(price);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  const coupons: Coupon[] = [
    { name: '10% 할인 쿠폰', discount: 0.1 },
    { name: '20% 할인 쿠폰', discount: 0.2 },
    // 적용할 수 있는 쿠폰들을 배열에 넣어주세요
  ];

  const applyCoupon = (coupon: Coupon) => {
    const discountedPrice = price * (1 - coupon.discount);
    setCurrentPrice(discountedPrice);
    setSelectedCoupon(coupon);
  };

  const removeCoupon = () => {
    setCurrentPrice(price);
    setSelectedCoupon(null);
  };

  return (
    <div>
      <FormControlLabel
        control={
          <Switch defaultChecked checked={checked} onChange={handleChange} />
        }
        label={checked ? '최대 할인이 적용됐어요' : '최대 할인을 적용하세요'}
      />

      <h2>상품 가격: {currentPrice}원</h2>
      {selectedCoupon ? (
        <p>적용된 쿠폰: {selectedCoupon.name}</p>
      ) : (
        <p>적용된 쿠폰이 없습니다.</p>
      )}
      <h3>쿠폰 선택</h3>
      <ul>
        {coupons.map((coupon, index) => (
          <li key={index}>
            <button onClick={() => applyCoupon(coupon)}>{coupon.name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
