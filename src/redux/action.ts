import { Action } from 'redux';

export const UPDATE_ADDRESS = 'UPDATE_ADDRESS';

export function updateAddress(address: string, zonecode: string) {
  return {
    type: UPDATE_ADDRESS,
    payload: {
      address: address,
      zonecode: zonecode,
    },
  };
}

export interface UpdateAddressAction extends Action {
  type: typeof UPDATE_ADDRESS;
  payload: {
    address: string;
    zonecode: string;
  };
}

export type AddressActionTypes = UpdateAddressAction;
