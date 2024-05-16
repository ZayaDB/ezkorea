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
          <div className='li1'>
            상품정보
            <Products />
          </div>
          <div className='li2'>진행상태</div>
          <div className='li3'>배송비</div>
          <div className='li4'>구매확정 및 리뷰</div>
        </div>
      </div>
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

  if (selectOption.length > 0) {
    const Product = useSelector(
      (state: RootState) => state.product.products[0]
    );
    console.log(Product);
  }

  return (
    <div className='product-container'>
      <Card sx={{ maxWidth: '100%' }}>
        <Box sx={{ display: 'flex' }}>
          {/* <CardMedia
            component='img'
            alt='상품 이미지'
            height='200'
            image={Product.product_image}
          />
          <CardContent sx={{ width: '150%' }}>
            <div>{Product.brand_name}</div>
            <div>{Product.product_name}</div>
            <div>옵션 : {selectOption}</div>
            <div>
              {addCommasToNumber(Product.regular_price)} 원/수량{' '}
              {selectedQuantity}개
            </div>
          </CardContent> */}
        </Box>
      </Card>
    </div>
  );
}
