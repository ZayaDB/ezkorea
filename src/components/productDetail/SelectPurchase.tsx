import '../../styles/productDetail/productDetail.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { lightGreen } from '@mui/material/colors';

// import { createTheme } from '@mui/material/styles';
// import { purple } from '@mui/material/colors';

export default function SelectPurchase() {
  const [color, setColor] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setColor(event.target.value as string);
  };

  return (
    <div id='selectPurchase'>
      <div id='purchaseInfo'>
        <div id='brandShare'>
          <div className='productBrand'>209애비뉴</div>
          <div id='shIcon'>
            <div className='shareIcon'>
              <ShareIcon />
            </div>
            <div id='heartZone'>
              <div className='heartIcon'>
                <FavoriteBorderIcon />
              </div>
              <div className='heartTotal'>28,742</div>
            </div>
          </div>
        </div>
        <div className='productName'>
          제로데스크 에보 테이블 컴퓨터 책상 2Colors
        </div>
        <div id='priceZone'>
          <div className='sellingPrice'>190,000원</div>
          <div id='sale'>
            <div className='discountRate'>23%</div>
            <div className='discountedPrice'>145,000원</div>
          </div>
        </div>
      </div>
      <div id='savingDelivery'>
        <div className='saving'>
          <div className='subtitle'>혜택</div>
          <div id='savingPoint'>145P 적립</div>
        </div>
        <div className='delivery'>
          <div id='deliveryZone'>
            <div className='subtitle'>배송</div>
            <div className='deliveryPrice'>무료 배송</div>
          </div>
          <div className='deliveryDetailInfo'>5/17(금) 도착 예정</div>
        </div>
      </div>
      <div id='selectProduct'>
        <Box sx={{ maxWidth: 479 }}>
          <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>color</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={color}
              label='color*'
              onChange={handleChange}
            >
              <MenuItem value={10}>White</MenuItem>
              <MenuItem value={20}>Black</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <div id='selectedPurchase'>
          <div className='selectedColor'>White</div>
          <div id='countZone'>
            <div className='selectedCount'></div>
            <div className='sellingPrice'>190,000원</div>
            <div className='selectedClose'>X</div>
          </div>
        </div>
      </div>
      <div id='purchaseZone'>
        <div className='PurchaseTitle'>주문금액</div>
        <div className='purChaseTotal'>145,000원</div>
      </div>
      <div id='buttons'>
        <div className='cartBtn'>
          <AddShoppingCartIcon />
        </div>
        <div className='purchaseBtn'>주문하기</div>
      </div>
    </div>
  );
}
