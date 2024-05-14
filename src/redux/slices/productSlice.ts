import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/productDetail';

export interface ProductState {
  selectedOption: string;
  selectedQuantity: number;
  selectedProductId: number;
  products: Product[];
}

const initialState: ProductState = {
  selectedOption: '화이트',
  selectedQuantity: 1,
  selectedProductId: 1 /* 수정 필요 */,
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
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedOption = action.payload;
    },
    setSelectedSubCategory: (state, action: PayloadAction<number>) => {
      state.selectedQuantity = action.payload;
    },
    setSelectedProductId: (state, action: PayloadAction<number>) => {
      state.selectedProductId = action.payload;
    },
  },
});

export const {
  setSelectedCategory,
  setSelectedSubCategory,
  setSelectedProductId,
} = productSlice.actions;

export default productSlice.reducer;
