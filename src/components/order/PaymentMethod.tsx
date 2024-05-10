import React, { SyntheticEvent, useState } from 'react';
import Carousel from 'react-material-ui-carousel';

import Head from './Head';

/* 이미지 */
import kakao_src from '../../assets/images/bank_kakao.png';
import kb_src from '../../assets/images/bank_kb.png';
import nh_src from '../../assets/images/bank_nh.png';
import sh_src from '../../assets/images/bank_sh.png';
import kakao_card_src from '../../assets/images/card_kakao.png';
import kb_card_src from '../../assets/images/card_kb.png';
import ss_card_src from '../../assets/images/card_samsung.png';
import sh_card_src from '../../assets/images/card_sh.png';
import { Box, Card, Paper, Tab, Tabs, Typography } from '@mui/material';

/* 결제수단 */
export default function PaymentMethod() {
  const [selected, setSelected] = useState<number>(0);

  return (
    <div>
      <Head text='결제수단' />
      <div className='payment-contianer'>
        <label>
          <input
            type='radio'
            name='payment'
            id='account'
            defaultChecked={true}
            onClick={() => {
              setSelected(0);
            }}
          />
          계좌 간편결제
          {selected == 0 ? <AccountCarousel method='account' /> : ''}
        </label>
        <label>
          <input
            type='radio'
            name='payment'
            id='card'
            onClick={() => {
              setSelected(1);
            }}
          />
          카드 간편결제
          {selected == 1 ? <AccountCarousel method='card' /> : ''}
        </label>
        <label>
          <input
            type='radio'
            name='payment'
            id='general'
            onClick={() => {
              setSelected(2);
            }}
          />
          일반결제
          {selected == 2 ? <GeneralContent /> : ''}
        </label>
      </div>
    </div>
  );
}

/* 계좌 결제 */
// function AccountContent() {
//   return (
// <div className='account-contianer'>
//   <div className='account-content-container'>
//     <img src={kakao_src} alt='bank img' className='bank_img' />
//     <div>
//       <div>카카오뱅크</div>
//       <div>3333*******</div>
//     </div>
//   </div>
//       <div className='account-content-container'>
//         <img src={kb_src} alt='bank img' className='bank_img' />
//         <div>
//           <div>국민</div>
//           <div>3333*******</div>
//         </div>
//       </div>
//       <div className='account-content-container'>
//         <img src={nh_src} alt='bank img' className='bank_img' />
//         <div>
//           <div>농협</div>
//           <div>3333*******</div>
//         </div>
//       </div>
//       <div className='account-content-container'>
//         <img src={sh_src} alt='bank img' className='bank_img' />
//         <div>
//           <div>신한</div>
//           <div>3333*******</div>
//         </div>
//       </div>
//     </div>
//   );
// }

function AccountCarousel({ method }: { method: string }) {
  let selectedItems: Array<{
    name: string;
    description?: string;
    src: string;
  }> = [];

  let imgClassName = '';

  if (method === 'account') {
    selectedItems = [
      {
        name: 'KB국민',
        description: 'Probably the most random thing you have ever seen!',
        src: kb_src,
      },
      {
        name: '카카오뱅크',
        description: 'Hello World!',
        src: kakao_src,
      },
      {
        name: 'NH농협',
        description: 'Hello World!',
        src: nh_src,
      },
      {
        name: '신한',
        description: 'Hello World!',
        src: sh_src,
      },
    ];
    imgClassName = 'bank_img';
  } else if (method === 'card') {
    selectedItems = [
      {
        name: 'KB국민 트래블러스 체크카드(토심이)',
        src: kb_card_src,
      },
      {
        name: '카카오 체크카드',
        src: kakao_card_src,
      },
      {
        name: '삼성 taptap',
        src: ss_card_src,
      },
      {
        name: '신한카드 Deep Dream',
        src: sh_card_src,
      },
    ];
    imgClassName = 'card_img';
  }

  return (
    <Carousel
      autoPlay={false}
      indicators={false}
      navButtonsAlwaysVisible={true}
      animation='slide'
      fullHeightHover={true}
      navButtonsProps={{
        style: {
          backgroundColor: '#E5E5E5',
        },
      }}
      navButtonsWrapperProps={{
        style: {
          bottom: '0',
          top: 'unset',
        },
      }}
    >
      {selectedItems.map((item, i) => (
        <Item key={i} item={item} imgClass={imgClassName} />
      ))}
    </Carousel>
  );
}

function Item(props: any) {
  return (
    <Paper>
      <div id='flex'>
        <div className='account-content-container'>
          <img src={props.item.src} alt='bank img' className={props.imgClass} />
          <div>
            <div>{props.item.name}</div>
            <div>3333*******</div>
          </div>
        </div>
      </div>
    </Paper>
  );
}

/* 카드 결제 */
function CardContent() {
  return (
    <div className='account-contianer'>
      <div className='account-content-container first'>
        <img src={sh_card_src} alt='card img' className='card_img' />
        <div>
          <div>카카오뱅크</div>
          <div>3333*******</div>
        </div>
      </div>
      <div className='account-content-container'>
        <img src={kb_card_src} alt='card img' className='card_img' />
        <div>
          <div>카카오뱅크</div>
          <div>3333*******</div>
        </div>
      </div>
      <div className='account-content-container'>
        <img src={ss_card_src} alt='card img' className='card_img' />
        <div>
          <div>카카오뱅크</div>
          <div>3333*******</div>
        </div>
      </div>
      <div className='account-content-container'>
        <img src={kakao_card_src} alt='card img' className='card_img' />
        <div>
          <div>카카오뱅크</div>
          <div>3333*******</div>
        </div>
      </div>
    </div>
  );
}

function GeneralContent() {
  return <div></div>;
}
