// /* Actions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// initial state
export interface MileageState {
  mileage: number;
}

/* 초기값 */
const initialState: MileageState = {
  mileage: 1000,
};

// Create a slice
export const MileageSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    updateMileage(state, action: PayloadAction<MileageState>) {
      const { mileage } = action.payload;
      state.mileage = mileage;
    },
  },
});

// Export the action creator
export const { updateMileage } = MileageSlice.actions;

// Export the reducer
export default MileageSlice.reducer;
