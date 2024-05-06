import { useRef } from 'react';
import '../../styles/productDetail/productDetail.scss';
import Review from './Review';
import Inquire from './Inquire';

// import React, { useRef, useState } from 'react';

// const styling = useRef();
// const info = useRef();
// const review = useRef();
// const sellerInfo = useRef();
// const deliveryRefund = useRef();
// const inquire = useRef();
// const similar = useRef();

export default function ProductTabs() {
  const content1Ref = useRef<HTMLDivElement>(null);
  const content2Ref = useRef<HTMLDivElement>(null);
  const content3Ref = useRef<HTMLDivElement>(null);
  const content4Ref = useRef<HTMLDivElement>(null);

  const onContent1Click = () => {
    content1Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const onContent2Click = () => {
    content2Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const onContent3Click = () => {
    content3Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const onContent4Click = () => {
    content4Ref.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div>
      <nav>
        <div onClick={onContent1Click} role='none'>
          상품정보
        </div>
        <div onClick={onContent2Click} role='none'>
          리뷰
        </div>
        <div onClick={onContent3Click} role='none'>
          배송/환불
        </div>
        <div onClick={onContent4Click} role='none'>
          문의하기
        </div>
      </nav>

      <div
        ref={content1Ref}
        style={{ height: '500px', border: '3px solid salmon' }}
      >
        상품정보
      </div>
      <div
        ref={content2Ref}
        style={{ height: '80vh', border: '3px solid pink' }}
      >
        <Review />
      </div>
      <div
        ref={content3Ref}
        style={{ height: '500px', border: '3px solid green' }}
      >
        배송/환불
      </div>
      <div
        ref={content4Ref}
        style={{ height: '500px', border: '3px solid lightgray' }}
      >
        <Inquire />
      </div>
    </div>
  );
}
