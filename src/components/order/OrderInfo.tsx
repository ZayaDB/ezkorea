import React from 'react';
import '../../styles/order/orderInfoPage.scss';

/* 주문정보 */
export default function OrderInfo() {
  return (
    <div className='order-info'>
      <div className='title'>결제 금액</div>
      <div className='line'></div>

      <div className='order-summary'>
        <div className=''>총 상품 금액</div>
        <div className=''>쿠폰 할인 금액</div>
        <div className=''>마일리지 사용</div>
        <div className=''>배송비</div>

        <div className=''>총 결제 금액</div>

        <button type='button'>결제</button>
      </div>
    </div>
  );
}
