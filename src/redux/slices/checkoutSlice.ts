// /* Actions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  OrdererInfo,
  OrderInfo,
  DeliveryInfoType,
  PhoneNum,
  Discount,
  Mileage,
  PaymentMethod,
} from '../../types/checkoutTypes';

// initial state
export interface CheckoutState {
  ordererInfo: OrdererInfo[];
  orderInfo: OrderInfo[];
  deliveryInfoType: DeliveryInfoType[];
  phoneNum: PhoneNum[];
  discount: Discount[];
  mileage: Mileage[];
  paymentMethod: PaymentMethod[];
}

/* 초기값 */
const initialState: CheckoutState = {
  ordererInfo: [],
  orderInfo: [],
  deliveryInfoType: [],
  phoneNum: [],
  discount: [
    {
      discountChecked: false,
      productCoupon: true,
    },
  ],
  mileage: [
    {
      mileage: 0,
    },
  ],
  paymentMethod: [],
};

// Create a slice
export const CheckouteSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setOrdererInfo: (state, action: PayloadAction<OrdererInfo[]>) => {
      state.ordererInfo = action.payload;
    },
    setOrderInfo: (state, action: PayloadAction<OrderInfo[]>) => {
      state.orderInfo = action.payload;
    },
    setDeliveryInfoType: (state, action: PayloadAction<DeliveryInfoType[]>) => {
      state.deliveryInfoType = action.payload;
    },
    setPhoneNum: (state, action: PayloadAction<PhoneNum[]>) => {
      state.phoneNum = action.payload;
    },
    setDiscount: (state, action: PayloadAction<Discount[]>) => {
      state.discount = action.payload;
    },
    setMileage: (state, action: PayloadAction<Mileage[]>) => {
      state.mileage = action.payload;
    },
    setPaymentMethod: (state, action: PayloadAction<PaymentMethod[]>) => {
      state.paymentMethod = action.payload;
    },
  },
});

// Export the action creator
export const {
  setOrdererInfo,
  setOrderInfo,
  setDeliveryInfoType,
  setPhoneNum,
  setDiscount,
  setMileage,
  setPaymentMethod,
} = CheckouteSlice.actions;

// Export the reducer
export default CheckouteSlice.reducer;
