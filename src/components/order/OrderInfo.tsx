import React, { useState } from 'react';
import '../../styles/order/orderInfo.scss';
import CloseButton from 'react-bootstrap/CloseButton';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Modal,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/config';
import { addCommasToNumber } from '../../hooks/addCommasToNumber';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

/* 주문정보 */
export default function OrderInfo() {
  const productPrice = useSelector(
    (state: RootState) => state.product.products[0].regular_price
  );
  const discountedPrice = useSelector(
    (state: RootState) => state.product.products[0].discounted_price
  );
  // const mileage = useSelector(
  //   (state: RootState) => state.checkout.discount[0].mileage
  // );

  /* 체크박스 */
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => setOpenModal(false);

  const handleCheckAll = (isChecked: boolean) => {
    // 인자의 타입 명시
    setIsAllChecked(isChecked);
  };

  return (
    <div className='order-info'>
      <div className='title'>결제 금액</div>
      <div className='line'></div>

      <div className='order-summary'>
        <div className='space-between'>
          <span>총 상품 금액</span>
          <span>{addCommasToNumber(productPrice)} 원</span>
        </div>
        <div className='coupon'>
          <div className='red space-between'>
            <span>쿠폰 할인 금액</span>
            <span>
              - {addCommasToNumber(productPrice - discountedPrice)} 원
            </span>
          </div>
          {/* <div className='space-between'>
            <span>
              <span className='lightgray'>↳</span> 상품 쿠폰
            </span>
            <span>- {productPrice} 원</span>
          </div> */}
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
            <span className='lightgray'>↳</span>장바구니 쿠폰
          </span>
          <span>- 5000 원</span>
        </div>

        <div className='space-between'>
          <span>총 결제 금액</span>
          <span className='total-amount red'>
            {addCommasToNumber(discountedPrice)} 원
          </span>
        </div>

        <div className='line'></div>

        <CheckboxesGroup onCheckAll={handleCheckAll} />

        <Modal open={openModal} onClose={handleClose}>
          <Box sx={style}>
            <div className='right-sort'>
              <CloseButton onClick={handleClose} />
            </div>
            주문 내용에 모두 동의해주세요.
          </Box>
        </Modal>

        <Button
          color='inherit'
          fullWidth
          variant='contained'
          type='button'
          onClick={() => {
            if (!isAllChecked) {
              setOpenModal(true);
              return;
            }
          }}
        >
          결제
        </Button>
      </div>
    </div>
  );
}

interface Props {
  onCheckAll: (isChecked: boolean) => void; // onCheckAll 함수의 타입 명시
}

function CheckboxesGroup({ onCheckAll }: Props) {
  const [checked, setChecked] = useState([false, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
    onCheckAll(event.target.checked);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
    onCheckAll(event.target.checked && checked[1]); // 첫번째 체크박스와 두번째 체크박스가 모두 체크되었을 때만 true 전달
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
    onCheckAll(checked[0] && event.target.checked); // 첫번째 체크박스와 두번째 체크박스가 모두 체크되었을 때만 true 전달
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
