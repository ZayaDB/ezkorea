// addressReducer.ts

import { updateAddressInfo } from '../actions/addressActions';
import {
  AddressActionTypes,
  UPDATE_ADDRESS_INFO,
} from '../types/addressActionTypes';

// 초기 상태의 타입 정의
interface AddressState {
  fullAddress: string;
  zonecode: string;
}

// 초기 상태
const initialState: AddressState = {
  fullAddress: '',
  zonecode: '',
};

type AddressActionType = ReturnType<typeof updateAddressInfo>;

// 리듀서 함수
const addressReducer = (
  state: AddressState = initialState, // 초기 상태의 타입으로 지정
  action: AddressActionType
): AddressState => {
  switch (action.type) {
    case UPDATE_ADDRESS_INFO:
      return {
        ...state,
        fullAddress: action.payload.fullAddress,
        zonecode: action.payload.zonecode,
      };
    default:
      return state;
  }
};

export default addressReducer;
