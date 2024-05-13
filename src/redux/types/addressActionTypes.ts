// export const UPDATE_ADDRESS_INFO = 'UPDATE_ADDRESS_INFO' as const;

import { AddressState } from '../slices/addressSlice';

export interface AddressInfoSate {
  address: AddressState;
}
