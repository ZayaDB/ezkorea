declare module '*.jpg';
declare module '*.PNG';

export interface Review {
  reviews: [];
  reUserId: number;
  reUserPhoto: string;
  reUserName: string;
  reDate: string;
  rating: number;
  contentPhoto: string;
  contentText: string;
}

export interface Inquiry {
  inquiry: [];
  inUserId: number;
  inUserName: string;
  inDate: string;
  inUserText: string;
  inquiryType:
    | 'product'
    | 'refund'
    | 'return'
    | 'shipping'
    | 'exchange'
    | 'others';
  answer: 'yes' | 'yet';
  inBrDate: string;
  inBrText: string;
}

export interface Product {
  productId: string;
  product_image: string;
  brand_name: string;
  product_name: string;
  regular_price: string;
  discount_rate: number;
  discounted_price: string;
  benefit: number;
  commentCount: number;
  colorOption: string[];
  community_feed: string;
  product_info_image: string;
  reviews: Review[][];
  delivery_refund: string;
  inquiryTotal: number;
  inquiry: Inquiry[];
  related_products: string[];
}
