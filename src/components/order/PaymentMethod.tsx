import React, { useState } from 'react';
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
import { Paper } from '@mui/material';

/* 결제수단 */
export default function PaymentMethod() {
  const [selected, setSelected] = useState<number>(0);

  return (
    <div className='payment-contianer'>
      <Head text='결제수단' />
      <div className='payment-contianer-content'>
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
          {selected == 0 ? <PaymentCarousel method='account' /> : ''}
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
          {selected == 1 ? <PaymentCarousel method='card' /> : ''}
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

/* 간편결제 content */
function PaymentCarousel({ method }: { method: string }) {
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
        src: kb_src,
      },
      {
        name: '카카오뱅크',
        src: kakao_src,
      },
      {
        name: 'NH농협',
        src: nh_src,
      },
      {
        name: '신한',
        src: sh_src,
      },
    ];
    imgClassName = 'bank_img';
  } else if (method === 'card') {
    selectedItems = [
      {
        name: 'KB국민 트래블 체크카드',
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
    <div className='carousel-container'>
      <Carousel
        cycleNavigation={false}
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
    </div>
  );
}

interface ItemProps {
  item: {
    name: string;
    src: string;
  };
  imgClass: string;
}

function Item(props: ItemProps) {
  console.log(props);

  const containerClass =
    props.imgClass === 'card_img'
      ? 'card-container'
      : 'account-content-container';

  return (
    <Paper>
      <div id='flex'>
        <div className={containerClass}>
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

function GeneralContent() {
  return <div></div>;
}
