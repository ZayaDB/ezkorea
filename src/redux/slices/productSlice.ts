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
  selectedProductId: 0 /* 수정 필요 */,
  products: [
    {
      prodId: 3,
      product_image:
        'https://img.29cm.co.kr/item/202307/11ee2c37d76ecbf5bdfadf5067f409c4.jpg?width=700',
      brand_name: '일광전구',
      product_name: 'SNOWMAN15 Portable Stand 3Colors',
      regular_price: 110000,
      discount_rate: 12,
      discounted_price: 96800,
    },
  ],
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
  },
});

export const {
  setSelectedOption,
  setSelectedQuantity,
  setSelectedProductId,
  setSelectedProduct,
} = productSlice.actions;

export default productSlice.reducer;
