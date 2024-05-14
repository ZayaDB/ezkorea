// /* Actions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  OrdererInfo,
  OrderInfo,
  DeliveryInfo,
  PhoneNum,
  Discount,
  PaymentMethod,
} from '../../types/checkoutTypes';

// initial state
export interface CheckoutState {
  ordererInfo: OrdererInfo[];
  orderInfo: OrderInfo[];
  deliveryInfo: DeliveryInfo[];
  phoneNum: PhoneNum[];
  discount: Discount[];
  paymentMethod: PaymentMethod[];
}

/* 초기값 */
const initialState: CheckoutState = {
  ordererInfo: [],
  orderInfo: [],
  deliveryInfo: [],
  phoneNum: [],
  discount: [],
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
    setDeliveryInfo: (state, action: PayloadAction<DeliveryInfo[]>) => {
      state.deliveryInfo = action.payload;
    },
    setPhoneNum: (state, action: PayloadAction<PhoneNum[]>) => {
      state.phoneNum = action.payload;
    },
    setDiscount: (state, action: PayloadAction<Discount[]>) => {
      state.discount = action.payload;
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
  setDeliveryInfo,
  setPhoneNum,
  setDiscount,
  setPaymentMethod,
} = CheckouteSlice.actions;

// Export the reducer
export default CheckouteSlice.reducer;
