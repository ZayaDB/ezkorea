// reducer
const initialState = {
  address: '',
  zonecode: '',
};

export default function addressReducer(
  state = initialState,
  action: AddressActionTypes
) {
  switch (action.type) {
    case UPDATE_ADDRESS:
      return {
        ...state,
        address: action.payload.address,
        zonecode: action.payload.zonecode,
      };
    default:
      return state;
  }
}
