import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import '../../styles/category/brandFilter.scss';
import { styled } from '@mui/system';


export default function BrandFilter() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const BlackCheckbox = styled(Checkbox)({
    color: 'black', // 체크박스 아이콘 컬러 지정
    '&.Mui-checked': {
      color: 'black', // 체크된 상태에서의 아이콘 컬러 지정
    },
  });
  
  return (
    <div className='element-brand'>
      <BlackCheckbox {...label} />
      <div>brand_name</div>
    </div>
  );
}
