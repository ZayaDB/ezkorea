import '../../styles/productDetail/selectPurchase.scss';
import { Box } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ShareIcon from '@mui/icons-material/Share';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../../styles/theme';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSelectedOption,
  setSelectedQuantity,
  setSelectedProductId,
  setSelectedProduct,
} from '../../redux/slices/productSlice'; // Redux slice의 액션 import
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types/productDetail';
import { addCommasToNumber } from '../../hooks/addCommasToNumber';
import HandleClickHeart from '../category/product/HandleClickHeart';
import { RootState } from '../../redux/config';
import { setIsLiked } from '../../redux/slices/categorySlice';
import { Products } from '../../types/productTypes';

export default function SelectPurchase() {
  const [spInfo, setSpInfo] = useState<Product>();
  const navigate = useNavigate();
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [counts, setCounts] = useState<number[]>([]);
  const dispatch = useDispatch();

  // const [prod, setProd] = useState<Products>();
  // const [newLiked, setNewLiked] = useState<boolean>(false);
  const defaultProduct: Products = {
    productId: 4,
    name: '', // 이름 설정
    brand: '', // 브랜드 설정
    colors: [], // 색상 설정
    concepts: [], // 컨셉 설정
    price: 0, // 가격 설정
    discount: 0, // 할인 설정
    prevPrice: 0, // 이전 가격 설정
    category1: '', // 카테고리 1 설정
    category2: '', // 카테고리 2 설정
    heart: false, // 하트 설정
    thumbnail: '', // 썸네일 설정
    hoverImage: '', // 호버 이미지 설정
    views: 0, // 조회수 설정
    commentCount: 0, // 댓글 수 설정
    themes: [], // 테마 설정
  };

  const [prod, setProd] = useState<Products>(defaultProduct);

  const rdxLiked = useSelector(
    (state: RootState) => state.category.isLiked[prod.productId]
  );
  console.log('리덕스 하트상태', rdxLiked);

  // fetch
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/prodDetail.json');
        const getProdData = await fetch('/data/prodData.json');
        const getProd = await getProdData.json();
        const data = await response.json();
        const prod = getProd[3];
        const purchase = data[0];
        setSpInfo(purchase);
        setProd(prod);
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
    console.log(selectedProductId);
    if (spInfo !== undefined) {
      dispatch(
        setSelectedProduct([
          {
            prodId: spInfo.prodId,
            product_image: spInfo.product_image,
            brand_name: spInfo.brand_name,
            product_name: spInfo.product_name,
            regular_price: spInfo.regular_price,
            discount_rate: spInfo.discount_rate,
            discounted_price: spInfo.discounted_price,
          },
        ])
      );
    }

    navigate('/cart');
  };

  const handleOrder = () => {
    if (sessionStorage.getItem('isLoggedIn') === null) {
      sessionStorage.setItem('prevUrl', `/shop/${spInfo?.prodId}`);
      window.location.href = '/login';
      return;
    } else {
      sessionStorage.setItem('prevUrl', '');
    }
    const selectedProductId = spInfo?.prodId || 0;
    dispatch(setSelectedOption(selectedColors));
    dispatch(setSelectedQuantity(counts));
    dispatch(setSelectedProductId(selectedProductId));
    console.log(selectedProductId);
    if (spInfo !== undefined) {
      dispatch(
        setSelectedProduct([
          {
            prodId: spInfo.prodId,
            product_image: spInfo.product_image,
            brand_name: spInfo.brand_name,
            product_name: spInfo.product_name,
            regular_price: spInfo.regular_price,
            discount_rate: spInfo.discount_rate,
            discounted_price: spInfo.discounted_price,
          },
        ])
      );
    }

    navigate('/order');
  };

  // 계산기
  const calculateTotalPrice = (
    discountedPrice: number,
    count: number
  ): number => {
    return discountedPrice * count;
  };

  // 좋아요 토글 핸들러
  const handleLikeToggle = () => {
    const updatedIsLiked = !rdxLiked;
    dispatch(setIsLiked({ productId: 4, isLiked: updatedIsLiked }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container justifyContent='center' alignItems='center'>
        <div id='selectPurchase'>
          <div id='purchaseInfo'>
            <div id='brandShare'>
              <div className='productBrand'>{spInfo?.brand_name}</div>
              <div id='shIcon'>
                <div className='shareIcon'>
                  <ShareIcon />
                </div>
                <div id='heartZone'>
                  {prod && (
                    <div className='heartIcon'>
                      <HandleClickHeart
                        productName={spInfo?.product_name}
                        isLiked={rdxLiked}
                        onLikeToggle={handleLikeToggle}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='productName'>{spInfo?.product_name}</div>
            <div id='priceZone'>
              <div className='sellingPrice'>
                {addCommasToNumber(spInfo?.regular_price ?? 0)}
              </div>
              <div id='sale'>
                <div className='discountRate'>{spInfo?.discount_rate}%</div>
                <div className='discountedPrice'>
                  {addCommasToNumber(spInfo?.discounted_price ?? 0)}원
                </div>
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
                <div className='deliveryPrice'>
                  <div>50000원 이상 구매시</div>
                  <div className='free'>무료배송</div>
                </div>
              </div>
            </div>
          </div>
          <div id='selectProduct'>
            <Box sx={{ maxWidth: 760 }}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>color</InputLabel>
                {spInfo && spInfo.colorOption && (
                  <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={
                      selectedColors.length > 0
                        ? selectedColors[selectedColors.length - 1]
                        : ''
                    }
                    label='color*'
                    onChange={handleChange}
                  >
                    {spInfo.colorOption.map((color, index) => (
                      <MenuItem key={index} value={color}>
                        {color}
                      </MenuItem>
                    ))}
                  </Select>
                )}
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
                          onClick={() => handleDecrease(index)}
                          disabled={counts[index] === 1}
                          color='secondary'
                        >
                          -
                        </Button>
                        <Button color='secondary'>{counts[index]}</Button>
                        <Button
                          onClick={() => handleIncrease(index)}
                          color='secondary'
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </div>
                    <div className='sellingPrice'>
                      {addCommasToNumber(spInfo?.regular_price ?? 0)}원
                    </div>
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
            <div className='purChaseTotal'>
              {addCommasToNumber(
                calculateTotalPrice(
                  spInfo?.discounted_price ?? 0,
                  counts.reduce((acc, curr) => acc + curr, 0)
                )
              )}
              원
            </div>
          </div>
          <div id='buttons'>
            <Box className='cartBtn' onClick={handleSubmit}>
              <AddShoppingCartIcon />
            </Box>
            <Box className='purchaseBtn'>
              <Button onClick={handleOrder}>주문하기</Button>
            </Box>
          </div>
        </div>
      </Grid>
    </ThemeProvider>
  );
}
