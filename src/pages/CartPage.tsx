import '../styles/order/cart.scss';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { RootState } from '../redux/config';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function CartPage() {
  const selectOption = useSelector(
    (state: RootState) => state.product.selectedOption
  );
  const selectedQuantity = useSelector(
    (state: RootState) => state.product.selectedQuantity
  );

  const productImg = useSelector(
    (state: RootState) => state.product.products[0].product_image
  );

  const brandName = useSelector(
    (state: RootState) => state.product.products[0].brand_name
  );
  const productName = useSelector(
    (state: RootState) => state.product.products[0].product_name
  );
  const productPrice = useSelector(
    (state: RootState) => state.product.products[0].regular_price
  );
  const discountRate = useSelector(
    (state: RootState) => state.product.products[0].discount_rate
  );
  const discountPrice = useSelector(
    (state: RootState) => state.product.products[0].discounted_price
  );

  // 체크 박스
  const [checked, setChecked] = useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label='Child 1'
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
    </Box>
  );

  // 수량버튼
  const [counts, setCounts] = useState<number>(1);

  const handleIncrease = () => {
    setCounts(counts + 1);
  };

  const handleDecrease = () => {
    if (counts > 1) {
      setCounts(counts - 1);
    }
  };

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <div id='cartBox'>
        <div id='cartList'>
          <div className='cartTitle'>
            <div className='titleCheckbox'>
              <FormControlLabel
                label='Parent'
                control={
                  <Checkbox
                    checked={checked[0] && checked[1]}
                    indeterminate={checked[0] !== checked[1]}
                    onChange={handleChange1}
                  />
                }
              />
            </div>
            <div className='titleDetail'>상품정보</div>
            <div className='titleCountBtn'>수량</div>
            <div className='titleTotal'>주문금액</div>
            <div className='titleDelivery'>배송비</div>
          </div>
          <div className='purchaseInfo'>
            <div className='purchasecheckbox'>{children}</div>
            <div className='purchasePD'>
              <div className='purchaseProduct'>
                <img src={productImg} alt='상품정보' />
              </div>
              <div className='purchaseDetail'>
                <div className='purchaseBrand'>{brandName}</div>
                <div className='purchaseName'>{productName}</div>
                <div className='purchaseOriginal'>{productPrice}원</div>
                <div className='saleZone'>
                  <div className='saleRate'>{discountRate}%</div>
                  <div className='salePrice'>{discountPrice}원</div>
                </div>
              </div>
            </div>

            <div className='deleteBtn'>x</div>
            <div className='colorCount'>
              <div className='selectedColor'>{selectOption}</div>
              <div className='countBtn'>
                <ButtonGroup
                  size='small'
                  variant='contained'
                  aria-label='Basic button group'
                >
                  <Button
                    onClick={() => handleDecrease()}
                    disabled={counts === 1}
                    color='primary'
                  >
                    -
                  </Button>
                  <Button color='primary'>{selectedQuantity}</Button>
                  <Button onClick={() => handleIncrease()} color='primary'>
                    +
                  </Button>
                </ButtonGroup>
              </div>
            </div>
            <div className='total'>금액</div>
            <div className='deliveryInfo'>
              <div className='deliveryCharge'>3500원</div>
              <div>5만원 이상 구매시 무료배송</div>
            </div>
          </div>
        </div>

        <div id='beforePay'>
          <div className='bpTitle'>
            <div className='bpTitleProdTotal'>총 주문금액</div>
            <div className='bpTitleDeTotal'>총 배송비</div>
            <div className='bpTitleTotal'>총 결제금액</div>
          </div>
          <div className='bpInfo'>
            <div className='bpProdTotal'>총금액</div>
            <div className='bpplus'>+</div>
            <div className='bpDeTotal'>총배송비</div>
            <div className='bpEqual'>=</div>
            <div className='bpTotal'>총결제금액</div>
          </div>
        </div>
        <div id='Btns'>
          <button className='againBtn'>CONTINUE SHOPPING</button>
          <button className='goPay'>CHECk OUT</button>
        </div>
      </div>
    </Grid>
  );
}
