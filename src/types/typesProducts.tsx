export interface Products {
  productId: number;
  name: string;
  brand: string;
  colors: string[];
  concepts: string[];
  price: string;
  discount: number;
  prevPrice: string;
  category1: string;
  category2: string;
  heart: boolean;
  thumbnail: string;
  hoverImage: string;
  views: number;
  commentCount: number;
}

export interface CategoryData {
  name: string;
  subCategories: string[];
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
  onSelectCategory: (categoryName: string) => void;
}

export interface ProductListProps {
  categoryData: CategoryData[];
  selectedCategory: string;
  prodData: Products[];
}
