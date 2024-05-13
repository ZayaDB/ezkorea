export interface Products {
  productId: number;
  name: string;
  brand: string;
  colors: string[];
  concepts: string[];
  price: number;
  discount: number;
  prevPrice:number;
  category1: string;
  category2: string;
  heart: boolean;
  thumbnail: string;
  hoverImage: string;
  views: number;
  commentCount: number;
  themes: string[];
}

export interface SubCategory {
  name: string;
  imagePath: string;
}

export interface CategoryData {
  name: string;
  imagePath: string; // 카테고리 이미지 경로 추가
  subCategories: SubCategory[];
}

export interface CategoryMapping {
  [key: string]: string;
}

export interface FilterVisibility {
  brand: boolean;
  price: boolean;
  color: boolean;
  theme: boolean;
}

export interface SideNavProps {
  categoryData: CategoryData[];
  prodData: Products[];
}



export interface ProductListProps {
  categoryData: CategoryData[];
  selectedCategory: string;
  prodData: Products[];
  selectedSubCategory: string; // selectedSubCategory를 추가
}
export interface Filters {
  brands: string[];
  colors: string[];
  prices: number[];
  themes: string[];
}


export type SortOption = '인기순' | '리뷰많은순' | '낮은가격순' | '높은가격순' | '할인율높은순';
