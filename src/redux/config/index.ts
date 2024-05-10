import { combineReducers } from 'redux';
import address from '../slices/addressSlice';
import category from '../slices/categorySlice';

const rootReducer = combineReducers({
  address,
  category,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
