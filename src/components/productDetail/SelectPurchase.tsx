import '../../styles/productDetail/productDetail.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// import { createTheme } from '@mui/material/styles';
// import { purple } from '@mui/material/colors';

export default function SelectPurchase() {
  const [color, setColor] = React.useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setColor(event.target.value as string);
  };
  //   const theme = createTheme({
  //     palette: {
  //       primary: {
  //         main: purple[500],
  //       },
  //       secondary: {
  //         main: '#f44336',
  //       },
  //     },
  //   });

  return (
    <div id='selectPurchase'>
      <h5>VOLINI</h5>
      <h4>LEATHER CHAIR STAINLESS</h4>
      <div>540,000원</div>
      <div className='sale'>
        <span>10%</span>
        <span>486,0000</span>
      </div>
      <div>
        <span>배송</span>
        <span>배송 상품정보 참고</span>
      </div>

      <Box sx={{ maxWidth: 479 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>color</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={color}
            label='color'
            onChange={handleChange}
          >
            <MenuItem value={10}>Cream</MenuItem>
            <MenuItem value={20}>Beige</MenuItem>
            <MenuItem value={30}>Camel</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <div></div>
      <button className='cartBtn'>장바구니 담기</button>
      <button className='purchaseBtn'>주문하기</button>
    </div>
  );
}
