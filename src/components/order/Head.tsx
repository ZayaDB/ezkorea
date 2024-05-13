import React from 'react';
/* 각 컴포넌트의 제목 부분 */
export default function Head({ text }: { text: string }) {
  return (
    <div className='order-head'>
      <div className='line'></div>
      <div className='order-head-text'>{text}</div>
    </div>
  );
}
