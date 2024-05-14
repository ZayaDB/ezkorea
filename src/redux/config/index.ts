import { combineReducers } from '@reduxjs/toolkit';
import address from '../slices/addressSlice';
import category from '../slices/categorySlice';
import checkout from '../slices/checkoutSlice';
import product from '../slices/productSlice';
import community from '../slices/communitySlice';
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  address,
  category,
  checkout,
  product,
  community,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({ reducer: rootReducer });

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;

export default rootReducer;