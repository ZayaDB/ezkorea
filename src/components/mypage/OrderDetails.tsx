import '../../styles/mypage/order.scss';

export default function OrderDetails() {
  return (
    <div className='orderDetail-wrapper'>
      <div className='coupon-container'>
        <div className='coupon'>쿠폰</div>
        <div className='mile'>마일리지</div>
      </div>
      <div className='order-container'>
        <div className='li1'>입금대기</div>
        <div className='li2'>상품준비중</div>
        <div className='li3'>배송중</div>

        <div className='li4'>배송완료</div>
      </div>
    </div>
  );
}
