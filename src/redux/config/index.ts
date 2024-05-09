import { combineReducers } from 'redux';
import address from '../reducers/address';
import category from '../slices/categorySlice';

const rootReducer = combineReducers({
  address,
  category,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
