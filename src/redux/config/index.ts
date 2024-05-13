import { combineReducers } from 'redux';
import address from '../slices/addressSlice';
import category from '../slices/categorySlice';
import checkout from '../slices/checkoutSlice';

const rootReducer = combineReducers({
  address,
  category,
  checkout,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
