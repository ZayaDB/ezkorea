// export const UPDATE_ADDRESS_INFO = 'UPDATE_ADDRESS_INFO' as const;

import { AddressState } from '../slices/addressSlice';

// interface UpdateAddressInfoAction {
//   type: typeof UPDATE_ADDRESS_INFO;
//   payload: {
//     fullAddress: string;
//     zonecode: string;
//   };
// }

// export type AddressActionTypes = UpdateAddressInfoAction;

export interface AddressInfoSate {
  address: AddressState;
}
