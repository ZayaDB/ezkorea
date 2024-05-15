import '../../styles/productDetail/selectPurchase.scss';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ShareIcon from '@mui/icons-material/Share';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../styles/theme';
import { useDispatch } from 'react-redux';
import {
  setSelectedOption,
  setSelectedQuantity,
  setSelectedProductId,
} from '../../redux/slices/productSlice'; // Redux slice의 액션 import
import { useNavigate } from 'react-router-dom';

// const useStyles = makeStyle(theme => ({
//   tablet: {
//     width: '768px',
//   },
//   mobile: {
//     width: '375px',
//   },
// }));
// const matches = useMediaQuery('(max-width:768px)');
export interface Product {
  prodId: number;
  product_image: string;
  brand_name: string;
  product_name: string;
  regular_price: number;
  discount_rate: number;
  discounted_price: number;
  benefit?: number;
  commentCount?: number;
  colorOption?: string[];
  community_feed?: string;
  product_info_image?: string;
  delivery_refund?: string;
  inquiryTotal?: number;
  related_products?: string[];
}

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
  const [spInfo, setSpInfo] = useState<Product>();
  const navigate = useNavigate();
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [counts, setCounts] = useState<number[]>([]);
  const dispatch = useDispatch();
  
  // fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/prodDetail.json');
        const data = await response.json();
        const purchase = data[0];

        setSpInfo(purchase);
      } catch (error) {
        console.error('Error fetching review data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedColor = event.target.value;
    const index = selectedColors.indexOf(selectedColor);

    if (index === -1) {
      setSelectedColors([...selectedColors, selectedColor]);
      setCounts([...counts, 1]);
    } else {
      const updatedCounts = [...counts];
      updatedCounts[index]++;
      setCounts(updatedCounts);
    }
  };

  const handleIncrease = (index: number) => {
    const updatedCounts = [...counts];
    updatedCounts[index]++;
    setCounts(updatedCounts);
  };

  const handleDecrease = (index: number) => {
    if (counts[index] > 1) {
      const updatedCounts = [...counts];
      updatedCounts[index]--;
      setCounts(updatedCounts);
    }
  };

  const onRemove = (index: number) => {
    setSelectedColors(selectedColors.filter((_, i) => i !== index));
    setCounts(counts.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const selectedProductId = spInfo?.prodId || 0;
    dispatch(setSelectedOption(selectedColors));
    dispatch(setSelectedQuantity(counts));
    dispatch(setSelectedProductId(selectedProductId));

    navigate('/cart');
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
      >
        <div id='selectBox'>
          <div id='selectPurchase'>
            <div id='purchaseInfo'>
              <div id='brandShare'>
                <div className='productBrand'>{spInfo?.brand_name}</div>
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
                    value=''
                    label='color*'
                    onChange={handleChange}
                  >
                    <MenuItem value={'White'}>White</MenuItem>
                    <MenuItem value={'Black'}>Black</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
            <div id='selectedPurchase'>
              {/* 추가된 선택 옵션들을 렌더링함 */}
              {selectedColors.map((selectedColor, index) => (
                <div key={selectedColor}>
                  <div id='optionBox'>
                    <div className='selectedColor'>{selectedColor}</div>
                    <div id='countZone'>
                      <div className='selectedCount'>
                        <ButtonGroup
                          size='small'
                          variant='contained'
                          aria-label='Basic button group'
                        >
                          <Button
                            onClick={() => handleIncrease(index)}
                            color='secondary'
                          >
                            +
                          </Button>
                          <Button color='secondary'>{counts[index]}</Button>
                          <Button
                            onClick={() => handleDecrease(index)}
                            disabled={counts[index] === 1}
                            color='secondary'
                          >
                            -
                          </Button>
                        </ButtonGroup>
                      </div>
                      <div className='sellingPrice'>190,000원</div>
                      <button
                        className='selectedClose'
                        onClick={() => onRemove(index)}
                      >
                        x
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div id='purchaseZone'>
              <div className='PurchaseTitle'>주문금액</div>
              <div className='purChaseTotal'>145,000원</div>
            </div>
            <div id='buttons'>
              <Box className='cartBtn' onClick={handleSubmit}>
                <AddShoppingCartIcon />
              </Box>
              <Box className='purchaseBtn' >
                주문하기
              </Box>
            </div>
          </div>
        </div>
      </Grid>
    </ThemeProvider>
  );
}

