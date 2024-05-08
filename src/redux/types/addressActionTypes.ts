export const UPDATE_ADDRESS_INFO = 'UPDATE_ADDRESS_INFO' as const;

interface UpdateAddressInfoAction {
  type: typeof UPDATE_ADDRESS_INFO;
  payload: {
    fullAddress: string;
    zonecode: string;
  };
}

export type AddressActionTypes = UpdateAddressInfoAction;
