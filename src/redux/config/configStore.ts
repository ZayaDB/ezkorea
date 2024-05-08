import { createStore } from 'redux';
import { combineReducers } from 'redux';
import address from '../modules/address';

const rootReducer = combineReducers({
  address: address, // <-- 새롭게 추가한 부분
});

const store = createStore(rootReducer);

export default store;
