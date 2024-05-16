import { useEffect, useState } from 'react';
import Head from './Head';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Modal,
  TextField,
} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { addCommasToNumber } from '../../hooks/addCommasToNumber';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/config';
import { setDiscount, setMileage } from '../../redux/slices/checkoutSlice';

/* 
  할인 적용
  - 쿠폰 : 쿠폰 적용 시 할인된 가격 표시
  - 포인트 : 1,000P 이상 사용 가능 멘트
*/

export default function ApplyDiscount() {
  const dispatch = useDispatch();

  const handleMileageDispatch = () => {
    dispatch(
      setMileage([
        {
          mileage: inputMileage,
        },
      ])
    );
  };

  const [mileage] = useState<number>(1000);

  const [inputMileage, setInputMileage] = useState<number>(0);
  const [isError, setIsError] = useState<boolean>(false);

  const handleMileageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    if (!isNaN(value)) {
      setInputMileage(value);
    }
  };

  const applyAllMileage = () => {
    setInputMileage(mileage);
  };

  useEffect(() => {
    // inputMileage가 변경될 때마다 실행될 코드
    if (inputMileage <= 1000) handleMileageDispatch();
    setIsError(inputMileage !== undefined && !isValidMileage(inputMileage));
  }, [inputMileage]);

  // 마일리지 입력이 유효한지 검증하는 함수
  const isValidMileage = (input: number | undefined) => {
    return input !== undefined && input <= mileage;
  };

  // onBlur 이벤트로 유효성 검사를 수행합니다.
  const handleMileageBlur = () => {
    setIsError(inputMileage !== undefined && !isValidMileage(inputMileage));
  };

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
              // onBlur 이벤트로 유효성 검사 수행
              error={isError}
              onBlur={handleMileageBlur}
              onChange={handleMileageChange}
            />
            <Button
              className='mileage-button'
              size='medium'
              variant='contained'
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
  const dispatch = useDispatch();

  const handleDiscountDispatch = () => {
    dispatch(
      setDiscount([
        {
          discountChecked: checked,
        },
      ])
    );
  };

  const [checked, setChecked] = useState<boolean>(true);

  const handleChange = (event: any) => {
    setChecked(event.target.checked);
    handleDiscountDispatch();
  };

  /* 상품 정보 */
  const selectedOption = useSelector(
    (state: RootState) => state.product.selectedOption
  );
  const selectedQuantity = useSelector(
    (state: RootState) => state.product.selectedQuantity
  );
  const productName = useSelector(
    (state: RootState) => state.product.products[0].product_name
  );
  const brandName = useSelector(
    (state: RootState) => state.product.products[0].brand_name
  );
  const productImg = useSelector(
    (state: RootState) => state.product.products[0].product_image
  );
  const discountedPrice = useSelector(
    (state: RootState) => state.product.products[0].discounted_price
  );
  const productPrice = useSelector(
    (state: RootState) => state.product.products[0].regular_price
  );

  /* 쿠폰 */
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

  const [showModal, setShowModal] = useState<boolean>(false);

  // const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <div>
      <FormControlLabel
        control={
          <Switch defaultChecked checked={checked} onChange={handleChange} />
        }
        label={checked ? '최대 할인이 적용됐어요' : '최대 할인을 적용하세요'}
      />

      <div>
        <Card sx={{ maxWidth: '100%' }}>
          <Box sx={{ display: 'flex' }}>
            <CardMedia
              component='img'
              alt='상품 이미지'
              height='200'
              image={productImg}
            />
            <CardContent sx={{ width: '150%' }}>
              <div>{brandName}</div>
              <div>{productName}</div>
              <div>옵션 : {selectedOption}</div>
              <div>
                {addCommasToNumber(productPrice)} 원/수량 {selectedQuantity}개
              </div>
              <div className='space-between'>
                <span>상품 쿠폰</span>
                <span className=''>
                  {checked
                    ? `-${addCommasToNumber(productPrice - discountedPrice)}원`
                    : '선택 안함'}
                </span>
              </div>
            </CardContent>
          </Box>
        </Card>
      </div>

      {/* <Button
        className='mileage-button'
        fullWidth
        variant='outlined'
        color='primary'
        onClick={handleOpen}
      >
        쿠폰 변경
      </Button> */}

      {showModal ? (
        <>
          <Modal open={showModal} onClose={handleClose}>
            <Box sx={style}>
              <FormControlLabel
                control={
                  <Switch
                    defaultChecked
                    checked={checked}
                    onChange={handleChange}
                  />
                }
                label={
                  checked ? '최대 할인이 적용됐어요' : '최대 할인을 적용하세요'
                }
              />
              {/* 상품 */}
              <Card sx={{ maxWidth: '100%' }}>
                <Box sx={{ display: 'flex' }}>
                  <CardContent sx={{ width: '150%' }}>
                    <div>{brandName}</div>
                    <div>{productName}</div>
                    <div>옵션 : {selectedOption}</div>
                    <div>
                      {addCommasToNumber(productPrice)} 원/수량{' '}
                      {selectedQuantity}개
                    </div>
                    <div>
                      <span>상품 쿠폰</span>
                      <span>
                        {checked
                          ? `-${productPrice - discountedPrice}원`
                          : '사용 가능한 쿠폰 없음'}
                      </span>
                    </div>
                  </CardContent>
                </Box>
              </Card>
            </Box>
          </Modal>
        </>
      ) : (
        ''
      )}
    </div>
  );
}
