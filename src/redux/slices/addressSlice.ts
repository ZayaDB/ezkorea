// /* Actions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// initial state
export interface AddressState {
  fullAddress: string;
  zonecode: string;
}

/* 초기값 */
const initialState: AddressState = {
  fullAddress: '',
  zonecode: '',
};

// Create a slice
export const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    updateAddressInfo(state, action: PayloadAction<AddressState>) {
      const { fullAddress, zonecode } = action.payload;
      state.fullAddress = fullAddress;
      state.zonecode = zonecode;
    },
    resetAddress(state) {
      state.fullAddress = '';
      state.zonecode = '';
    },
  },
});

// Export the action creator
export const { updateAddressInfo, resetAddress } = addressSlice.actions;

// Export the reducer
export default addressSlice.reducer;
