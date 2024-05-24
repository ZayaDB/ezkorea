import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/productDetail';

export interface ProductState {
  selectedOption: string[];
  selectedQuantity: number[];
  selectedProductId: number;
  products: Product[];
}

const initialState: ProductState = {
  selectedOption: [],
  selectedQuantity: [],
  selectedProductId: 0,
  products: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setSelectedOption: (state, action: PayloadAction<string[]>) => {
      state.selectedOption = action.payload;
    },
    setSelectedQuantity: (state, action: PayloadAction<number[]>) => {
      state.selectedQuantity = action.payload;
    },
    setSelectedProductId: (state, action: PayloadAction<number>) => {
      state.selectedProductId = action.payload;
    },
    setSelectedProduct: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    initializeState: (state, action: PayloadAction<ProductState>) => {
      state = action.payload;
    },
  },
});

export const {
  setSelectedOption,
  setSelectedQuantity,
  setSelectedProductId,
  setSelectedProduct,
  initializeState,
} = productSlice.actions;

export default productSlice.reducer;
