// /* Actions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// initial state
export interface CheckoutState {
  mileage: number;
}

/* 초기값 */
const initialState: CheckoutState = {
  mileage: 1000,
};

// Create a slice
export const CheckouteSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    updateMileage(state, action: PayloadAction<CheckoutState>) {
      const { mileage } = action.payload;
      state.mileage = mileage;
    },
  },
});

// Export the action creator
export const { updateMileage } = CheckouteSlice.actions;

// Export the reducer
export default CheckouteSlice.reducer;
