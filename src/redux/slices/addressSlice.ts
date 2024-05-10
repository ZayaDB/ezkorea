// /* Actions */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// interface UpdateAddressInfoType {
//   fullAddress: string;
//   zonecode: string;
// }

// export const updateAddressInfo = (addressInfo: UpdateAddressInfoType) => ({
//   type: UPDATE_ADDRESS_INFO,
//   payload: {
//     fullAddress: addressInfo.fullAddress,
//     zonecode: addressInfo.zonecode,
//   },
// });

// /* Reducer */
// // 초기 상태의 타입 정의
// interface AddressState {
//   fullAddress: string;
//   zonecode: string;
// }

// // 초기 상태
// const initialState: AddressState = {
//   fullAddress: '',
//   zonecode: '',
// };

// type AddressActionType = ReturnType<typeof updateAddressInfo>;

// // 리듀서 함수
// const addressReducer = (
//   state: AddressState = initialState, // 초기 상태의 타입으로 지정
//   action: AddressActionType
// ): AddressState => {
//   switch (action.type) {
//     case UPDATE_ADDRESS_INFO:
//       return {
//         ...state,
//         fullAddress: action.payload.fullAddress,
//         zonecode: action.payload.zonecode,
//       };
//     default:
//       return state;
//   }
// };

// export default addressReducer;

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
  },
});

// Export the action creator
export const { updateAddressInfo } = addressSlice.actions;

// Export the reducer
export default addressSlice.reducer;
