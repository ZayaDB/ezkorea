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
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState } from 'react';

// import { createTheme, styled } from '@mui/material/styles';
// import SaleProduct from './../category/SaleProduct';
// const cancelRef = useRef(null);

interface OptionProps {
  color: string;
}

const Option = ({ color }: OptionProps) => {
  const [count, setCount] = useState(0);

  return (
    <div key={color}>
      <div id='optionBox'>
        <div className='selectedColor'>{color}</div>
        <div id='countZone'>
          <div className='selectedCount'>
            <ButtonGroup
              size='small'
              variant='contained'
              aria-label='Basic button group'
            >
              <Button onClick={() => setCount(count + 1)} color='secondary'>
                +
              </Button>
              <Button color='secondary' aria-readonly>
                {count}
              </Button>
              <Button
                onClick={() => setCount(count - 1)}
                disabled={count < 1}
                color='secondary'
              >
                -
              </Button>
            </ButtonGroup>
          </div>
          <div className='sellingPrice'>190,000원</div>
          <div className='selectedClose'>X</div>
        </div>
      </div>
    </div>
  );
};

export default function SelectPurchase() {
  // // 드롭다운
  // const [color, setColor] = useState('');
  // const handleChange = (event: SelectChangeEvent) => {
  //   setColor(event.target.value as string);
  // };
  // // 드롭다운 선택하면 요소 보이게
  // const [options, setOptions] = useState<JSX.Element[]>([]);
  // const [selectedColors, setSelectedColors] = useState<string[]>([]);

  // const handleAddOption = (color: string) => {
  //   // 이미 선택된 색상인지 확인
  //   if (!selectedColors.includes(color)) {
  //     setSelectedColors([...selectedColors, color]);
  //     setOptions(prevOptions => [...prevOptions, generateOption(color)]);
  //   }
  // };
  const [color, setColor] = useState('');
  const [options, setOptions] = useState<JSX.Element[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const handleAddOption = (color: string) => {
    if (!selectedColors.includes(color)) {
      setSelectedColors([...selectedColors, color]);
      setOptions(prevOptions => [
        ...prevOptions,
        <Option key={color} color={color} />,
      ]);
    }
  };

  const handleChange = (event: SelectChangeEvent<string>) => {
    setColor(event.target.value as string);
  };
  return (
    <div id='selectBox'>
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
                <MenuItem value={'White'}>
                  {/* White div 클릭 시, 선택 옵션을 추가함 */}
                  <button
                    className='options'
                    onClick={() => handleAddOption('white')}
                  >
                    White
                  </button>
                </MenuItem>

                <MenuItem value={'Black'}>
                  {/* 다른 색상을 추가할 경우 */}
                  <button
                    className='options'
                    onClick={() => handleAddOption('black')}
                  >
                    black
                  </button>
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
        <div id='selectedPurchase'>
          {/* 추가된 선택 옵션들을 렌더링함 */}
          {options}
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
    </div>
  );
}
