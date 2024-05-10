import React from 'react';
import '../styles/productDetail/productDetail.scss';
import SelectPurchase from '../components/productDetail/SelectPurchase';
import ProductTabs from '../components/productDetail/ProductTabs';
import SimilarProducts from '../components/productDetail/SimilarProducts';
import ProductCarousel from '../components/productDetail/ProductCarousel';
import { Container } from '@mui/material';

export default function ProductDetail() {
  return (
    <div className='App'>
      <Container>
        <div className='detailPage'>
          <div className='detailMain'>
            <ProductCarousel />
            <div className='contents'>
              <ProductTabs />
              <SimilarProducts />
            </div>
          </div>
          <div className='detailSide'>
            <SelectPurchase />
          </div>
        </div>
      </Container>
    </div>
  );
}
