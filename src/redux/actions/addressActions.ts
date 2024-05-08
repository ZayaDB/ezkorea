// addressActions.ts
import { UPDATE_ADDRESS_INFO } from '../types/addressActionTypes';

interface UpdateAddressInfoType {
  fullAddress: string;
  zonecode: string;
}

export const updateAddressInfo = (addressInfo: UpdateAddressInfoType) => ({
  type: UPDATE_ADDRESS_INFO,
  payload: {
    fullAddress: addressInfo.fullAddress,
    zonecode: addressInfo.zonecode,
  },
});
