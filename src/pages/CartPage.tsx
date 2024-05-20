import '../styles/order/cart.scss';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { RootState } from '../redux/config';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import { addCommasToNumber } from '../hooks/addCommasToNumber';
import { useNavigate } from 'react-router-dom';

export default function CartPage() {
  const navigate = useNavigate();
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
        label=''
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
    </Box>
  );
  // 계산기
  const calculateTotalPrice = (
    discountedPrice: number,
    count: number
  ): number => {
    return discountedPrice * count;
  };
  // selectedQuantity의 타입을 명시적으로 지정
  const totalQuantity: number[] = selectedQuantity;
  // 각 요소의 타입을 명시적으로 지정하여 reduce 메서드 사용
  const totalSelectedQuantity: number = totalQuantity.reduce(
    (acc: number, curr: number) => acc + curr,
    0
  );
  const handleOrder = () => {
    navigate('/order');
  };

  return (
    <Grid container direction='row' justifyContent='center' alignItems='center'>
      <div id='cartBox'>
        <div id='cartList'>
          <div className='cartTitle'>
            <div className='titleCheckbox'>
              <FormControlLabel
                label=''
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
            <div className='titleCountBtn'>옵션/수량</div>
            <div className='titleTotal'>주문금액</div>
            <div className='titleDelivery'>배송비</div>
            <div className='titleModify'></div>
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
                <div className='purchaseOriginal'>
                  {addCommasToNumber(
                    calculateTotalPrice(
                      productPrice ?? 0,
                      totalSelectedQuantity
                    )
                  )}
                  원
                </div>
                <div className='saleZone'>
                  <div className='saleRate'>{discountRate}%</div>
                  <div className='salePrice'>
                    {addCommasToNumber(
                      calculateTotalPrice(
                        discountPrice ?? 0,
                        totalSelectedQuantity
                      )
                    )}
                    원
                  </div>
                </div>
              </div>
            </div>

            <div className='colorCount'>
              <div className='selectedColor'>{selectOption}</div>
              <div className='countBtn'>{totalSelectedQuantity}</div>
            </div>
            <div className='total'>
              {addCommasToNumber(
                calculateTotalPrice(discountPrice ?? 0, totalSelectedQuantity)
              )}
              원
            </div>
            <div className='deliveryInfo'>
              <div className='deliveryCharge'>3500원</div>
              <div className='deliveryContent'>5만원 이상 구매시 무료배송</div>
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
            <div className='bpProdTotal'>
              {addCommasToNumber(
                calculateTotalPrice(discountPrice ?? 0, totalSelectedQuantity)
              )}
              원
            </div>
            <div className='bpplus'>+</div>
            <div className='bpDeTotal'>3500원</div>
            <div className='bpEqual'>=</div>
            <div className='bpTotal'>
              {addCommasToNumber(
                calculateTotalPrice(discountPrice ?? 0, totalSelectedQuantity)
              )}
              원
            </div>
          </div>
        </div>
        <div id='Btns'>
          <button className='goPay' onClick={handleOrder}>
            주문하기
          </button>
        </div>
      </div>
    </Grid>
  );
}
