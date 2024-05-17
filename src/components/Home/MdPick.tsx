import { useState } from 'react';
import '../../styles/home/mdspick.scss';
import { Typography } from '@mui/material';
import '../../styles/home/cardCarousel.scss';
import { NavLink } from 'react-router-dom';

import newItem from '../../assets/images/new_item.jpeg';
import newItem1 from '../../assets/images/new_item1.jpeg';
import newItem2 from '../../assets/images/new_item2.jpeg';
import newItem4 from '../../assets/images/new_item4.jpeg';
import newItem5 from '../../assets/images/new_item5.jpeg';
import newItem6 from '../../assets/images/new_item6.jpeg';
import newItem7 from '../../assets/images/new_item7.jpeg';
import newItem8 from '../../assets/images/new_item8.jpeg';

const slides = [
  { id: 1, image: newItem },
  { id: 2, image: newItem1 },
  { id: 3, image: newItem2 },
  { id: 4, image: newItem4 },
  { id: 5, image: newItem5 },
  { id: 6, image: newItem6 },
  { id: 7, image: newItem7 },
  { id: 8, image: newItem8 },
  { id: 9, image: newItem },
  { id: 10, image: newItem2 },
  { id: 11, image: newItem1 },
  { id: 12, image: newItem4 },
  { id: 13, image: newItem5 },
];

export default function Homepage() {
  const [animate, setAnimate] = useState(true);
  const onStop = () => setAnimate(false);
  const onRun = () => setAnimate(true);

  return (
    <div className='wrapper' style={{ paddingBottom: '30px' }}>
      <div className='TitleArea'>
        <Typography sx={{ fontSize: '30px', fontWeight: '700' }}>
          MD&apos;s PICK
        </Typography>
        {/* <Typography
          sx={{
            fontSize: '16px',
            fontWeight: '400',
            color: '#999999',
            letterSpacing: '0.2px',
          }}
        >
        </Typography> */}
      </div>
      <div className='slide_container'>
        <NavLink to='/shop/4'>
        <ul
          className='slide_wrapper'
          onMouseEnter={onStop}
          onMouseLeave={onRun}
        >
          <div className={'slide original'.concat(animate ? '' : ' stop')}>
            {slides.map((s, i) => (
              <li key={i} className={'small'}>
                <div className='item'>
                  <img
                    src={s.image}
                    alt={`Product ${i + 1}`}
                    style={{ width: '100%', height: 'auto' }} // 이미지 크기 조정
                  />
                </div>
              </li>
            ))}
          </div>
          <div className={'slide clone'.concat(animate ? '' : ' stop')}>
            {slides.map((s, i) => (
              <li key={i} className={'small'}>
                <div className='item'>
                  <img
                    src={s.image}
                    alt={`Product ${i + 1}`}
                    style={{ width: '100%', height: 'auto' }} // 이미지 크기 조정
                  />
                </div>
              </li>
            ))}
          </div>
        </ul>
        </NavLink>
      </div>
    </div>
  );
}
