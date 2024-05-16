import { useSelector } from 'react-redux';
import '../../styles/mypage/order.scss';
import { RootState } from '../../redux/config';
import { Box, Card, CardContent, CardMedia } from '@mui/material';
import { addCommasToNumber } from '../../hooks/addCommasToNumber';

export default function OrderDetails() {
  const mileage = useSelector(
    (state: RootState) => state.checkout.mileage[0].mileage
  );

  return (
    <div className='orderDetail-wrapper'>
      <div className='coupon-container'>
        <div className='coupon'>
          <span>쿠폰</span>
          <span>{mileage}</span>
        </div>
        <div className='mileage'>
          <span>마일리지</span>
          <span>{mileage}</span>
        </div>
      </div>
      <div className='order-container'>
        <div className='head'>주문배송조회</div>
        <div className='order-container-head'>
          <div className='li1'>상품정보</div>
          <div className='li2'>진행상태</div>
          <div className='li3'>배송비</div>
          <div className='li4'>구매확정 및 리뷰</div>
        </div>
      </div>
      <Products />
    </div>
  );
}

function Products() {
  const selectOption = useSelector(
    (state: RootState) => state.product.selectedOption
  );
  const selectedQuantity = useSelector(
    (state: RootState) => state.product.selectedQuantity
  );

  const productImg = useSelector(
    (state: RootState) => state.product.products[0].product_image
  );

  const brandName = useSelector(
    (state: RootState) => state.product.products[0].brand_name
  );
  const productName = useSelector(
    (state: RootState) => state.product.products[0].product_name
  );
  const productPrice = useSelector(
    (state: RootState) => state.product.products[0].regular_price
  );

  const discountPrice = useSelector(
    (state: RootState) => state.product.products[0].discounted_price
  );

  return (
    <div className='product-container'>
      <Card
        sx={{
          maxWidth: '100%',

          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {selectOption.map((option, index) => (
          <Box
            sx={{
              maxWidth: '100%',
              display: 'flex',
            }}
            key={index}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '48%',
                marginBottom: '10px',
              }}
              key={index}
            >
              <CardMedia
                component='img'
                alt='상품 이미지'
                height='200'
                image={productImg}
              />
              <CardContent sx={{ width: '60%' }}>
                <div>{brandName}</div>
                <div>{productName}</div>
                <div>
                  옵션 :
                  <span id='option' key={index}>
                    {' '}
                    {option[index]}
                  </span>
                </div>
                <div>
                  <span className='regular-price'>
                    {addCommasToNumber(productPrice)}
                  </span>
                  {'  '}
                  {addCommasToNumber(discountPrice)} 원
                  <div>수량 : {selectedQuantity[index]}개</div>
                </div>
              </CardContent>
            </Box>
            <Box sx={{ width: '20%' }}>결제완료</Box>
            <Box sx={{ width: '20%' }}>무료배송</Box>
            <Box sx={{ width: '5%' }}>-</Box>
          </Box>
        ))}
      </Card>
    </div>
  );
}
