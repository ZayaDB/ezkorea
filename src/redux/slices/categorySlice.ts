// slices/categorySlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CategoryData, Products } from '../../types/typesProducts';

export interface CategoryState {
  selectedCategory: string;
  selectedSubCategory: string;
  categoryData: CategoryData[];
  products: Products[];
  brands: string[];
  colors: string[];
  prices: number;
  themes: string[];
}

const initialState: CategoryState = {
  selectedCategory: '가구',
  selectedSubCategory: 'ALL',
  categoryData: [],
  products: [],
  brands: [],
  colors: [],
  prices: 0,
  themes: [],
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
    setBrands: (state, action: PayloadAction<string[]>) => {
      state.brands = action.payload;
    },
    setColors: (state, action: PayloadAction<string[]>) => {
      state.colors = action.payload;
    },
    setPrices: (state, action: PayloadAction<number>) => {
      state.prices = action.payload;
    },
    setThemes: (state, action: PayloadAction<string[]>) => {
      state.themes = action.payload;
    },
    clearFilters: state => {
      // Reset filter-related state to initial values
      state.brands = [];
      state.colors = [];
      state.prices = 0;
      state.themes = [];
    },
    removeSelectedFilter: (
      state,
      action: PayloadAction<{ filterType: string; value: string | number }>
    ) => {
      const { filterType, value } = action.payload;
      switch (filterType) {
        case 'brands':
          state.brands = state.brands.filter(brand => brand !== value);
          break;
        case 'prices':
          // Handle removing price filter (adjust logic based on how prices are stored)
          // For example:
          // state.prices = state.prices.filter(price => price !== value);
          break;
        case 'colors':
          state.colors = state.colors.filter(color => color !== value);
          break;
        case 'themes':
          state.themes = state.themes.filter(theme => theme !== value);
          break;
        default:
          break;
      }
    },
  },
});

export const {
  setSelectedCategory,
  setSelectedSubCategory,
  setCategoryData,
  setProducts,
  setBrands,
  setColors,
  setPrices,
  setThemes,
  clearFilters,
  removeSelectedFilter,
} = categorySlice.actions;

export default categorySlice.reducer;
