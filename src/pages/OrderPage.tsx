import React from 'react';
import OrderContainer from '../components/order/OrderContainer';
import OrderInformation from '../components/order/OrderInfo';
import ContentArea from '../styles/ContentArea';
import '../styles/order/orderPage.scss';
import OrderContent from '../styles/OrderCotent';

export default function OrderPage() {
  return (
    <>
      <ContentArea>
        <div className='order-container'>
          <OrderContent>
            <OrderContainer />
          </OrderContent>
          <OrderInformation />
        </div>
      </ContentArea>
    </>
  );
}
