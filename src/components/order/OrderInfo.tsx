import React from 'react';
import '../../styles/order/orderInfoPage.scss';

/* 주문정보 */
export default function OrderInfo() {
  return (
    <div className='order-info'>
      <div>주문정보</div>
      <img src='' alt='product-img' />
      <div className='product-detail'>
        <div className='name'>상품명</div>
        <div className='option gray'>옵션</div>
        <div className='text gray'>수량</div>
        <div className='text gray'>금액</div>
        <div className='text gray'>배송비</div>
      </div>
      <div className='order-summary'>
        <div className='line'></div>
        <div className=''></div>
        <div>주문상품</div>
        <div className='line'></div>
        <div className='line'></div>
      </div>
    </div>
  );
}
