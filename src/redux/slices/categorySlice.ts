import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryData, Products, Filters } from '../../types/productTypes';

export interface CategoryState {
  selectedCategory: string;
  selectedSubCategory: string;
  categoryData: CategoryData[];
  products: Products[];
  isLiked: { [productId: number]: boolean };
  selectedFilters: Filters;
  renderingStart: boolean;
}

const initialState: CategoryState = {
  selectedCategory: '가구',
  selectedSubCategory: 'ALL',
  categoryData: [],
  products: [],
  isLiked: {},
  selectedFilters: {
    brands: [],
    colors: [],
    prices: [],
    themes: [],
  },
  renderingStart: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
    setSelectedSubCategory: (state, action: PayloadAction<string>) => {
      state.selectedSubCategory = action.payload;
    },
    setCategoryData: (state, action: PayloadAction<CategoryData[]>) => {
      state.categoryData = action.payload;
    },
    setProducts: (state, action: PayloadAction<Products[]>) => {
      state.products = action.payload;
    },
    clearFilters: state => {
      state.selectedFilters = {
        brands: [],
        colors: [],
        prices: [],
        themes: [],
      };
    },
    removeSelectedFilter: (
      state,
      action: PayloadAction<{
        filterType: string | number | number[] | unknown | unknown[];
        value: string | number | number[];
      }>
    ) => {
      const { filterType, value } = action.payload;
      switch (filterType) {
        case 'brands':
          state.selectedFilters.brands = state.selectedFilters.brands.filter(
            brand => brand !== value
          );
          break;
        case 'prices':
          state.selectedFilters.prices = [];
          break;
        case 'colors':
          state.selectedFilters.colors = state.selectedFilters.colors.filter(
            color => color !== value
          );
          break;
        case 'themes':
          state.selectedFilters.themes = state.selectedFilters.themes.filter(
            theme => theme !== value
          );
          break;
        default:
          break;
      }
    },
    setIsLiked: (
      state,
      action: PayloadAction<{ productId: number; isLiked: boolean }>
    ) => {
      const { productId, isLiked } = action.payload;
      state.isLiked[productId] = isLiked;
    },
    
    setFilters: (state, action: PayloadAction<Filters>) => {
      state.selectedFilters = action.payload;
    },
    setRendering: (state, action: PayloadAction<boolean>) => {
      state.renderingStart = action.payload;
    },
  },
});

export const {
  setSelectedCategory,
  setSelectedSubCategory,
  setCategoryData,
  setProducts,
  clearFilters,
  removeSelectedFilter,
  setIsLiked,
  setFilters,
  setRendering, // setRendering 액션 추가
} = categorySlice.actions;

export default categorySlice.reducer;
