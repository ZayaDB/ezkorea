import { combineReducers } from 'redux';
import address from '../slices/addressSlice';
import category from '../slices/categorySlice';
import mileage from '../slices/mileageSlice';

const rootReducer = combineReducers({
  address,
  category,
  mileage,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
