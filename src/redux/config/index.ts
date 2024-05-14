import { combineReducers } from 'redux';
import address from '../slices/addressSlice';
import category from '../slices/categorySlice';
import checkout from '../slices/checkoutSlice';
import product from '../slices/productSlice';

const rootReducer = combineReducers({
  address,
  category,
  checkout,
  product,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
