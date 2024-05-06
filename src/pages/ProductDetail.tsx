import React from 'react';
import ContentArea from '../styles/ContentArea';
import '../styles/productDetail/productDetail.scss';
import SelectPurchase from '../components/productDetail/SelectPurchase';
import ProductTabs from '../components/productDetail/ProductTabs';
import SimilarProducts from '../components/productDetail/SimilarProducts';

export default function ProductDetail() {
  return (
    <div className='App'>
      <ContentArea>
        <div className='detailPage'>
          <div className='detailMain'>
            <div className='contents'>
              {/* <ProductInfo /> */}
              <ProductTabs />
              <SimilarProducts />
            </div>
          </div>
          <div className='detailSide'>
            <SelectPurchase />
          </div>
        </div>
      </ContentArea>
    </div>
  );
}
