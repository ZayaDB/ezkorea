import React from 'react';
import OrderContainer from '../components/order/OrderContainer';
import OrderInformation from '../components/order/OrderInfo';

import '../styles/order/orderPage.scss';
import OrderContent, { ContentArea } from '../styles/OrderCotent';

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
