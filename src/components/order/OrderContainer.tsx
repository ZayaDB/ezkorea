import { Container, ToggleButton, ToggleButtonGroup } from '@mui/material';
import TextField from '@mui/material/TextField';

import { useState } from 'react';

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

      <div>주문자</div>
      <TextField fullWidth id='fullWidth' value={ordererName} disabled />
      <div>휴대폰번호</div>
      <div className='orderer-num-container'>
        <TextField className='num' disabled />
        <span>-</span>
        <TextField className='num' disabled />
        <span>-</span>
        <TextField className='num' disabled />
      </div>
      <div></div>
    </div>
  );
}

/* 수령자 정보 
  - 1. 주문자 정보와 동일 : 정보 가져오기(CustomerInformation에서 내려받기)
  - 2. 새로운 배송지 : 배송지 정보 새로 넣기
*/
function RecipientInformation() {
  const [alignment, setAlignment] = useState('web');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  return (
    <div className='order-recipitent-info'>
      <Head text='수령자 정보' />
      <ToggleButtonGroup
        color={'primary'}
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label='Platform'
      >
        <ToggleButton value='web'>최근 배송지</ToggleButton>
        <ToggleButton value='android'>직접입력</ToggleButton>
      </ToggleButtonGroup>
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
      <div>쿠폰</div>
      <TextField fullWidth id='fullWidth' />
      <div>포인트</div>
      <TextField fullWidth id='fullWidth' />
    </div>
  );
}

/* 결제수단 */
function PaymentMethod() {
  return (
    <div>
      <Head text='결제수단' />
      <label>
        <input type='radio' name='payment' id='account' /> 계좌 간편결제
      </label>
      <label>
        <input type='radio' name='payment' id='card' /> 카드 간편결제
      </label>
      <label>
        <input type='radio' name='payment' id='general' /> 일반결제
      </label>
    </div>
  );
}

/* 각 컴포넌트의 제목 부분 */
function Head({ text }: { text: string }) {
  return (
    <div className='order-head'>
      <div className='order-head-text'>{text}</div>
      <div className='line'></div>
    </div>
  );
}

export default function OrderContainer() {
  return (
    /* container 부분 50%만 차지하게 해야함 */
    <Container maxWidth='xs' className='order-container'>
      <CustomerInformation />
      <RecipientInformation />
      <ApplyDiscount />
      <PaymentMethod />
    </Container>
  );
}
