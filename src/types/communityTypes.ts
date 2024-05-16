// types.ts 파일
export interface Comment {
  id: string;
  profileImage: string;
  accountName: string;
  content: string;
  parentId?: string;
  creationDate: string;
  replies?: Comment[];
}

export interface SelectedProducts {
  productId: number;
  productName: string;
  thumbnail: string;
  price: string;
}

export interface FeedData {
  feedId: number;
  accountName: string;
  profileImage: string;
  images: string[];
  title: string;
  description: string;
  selectedProducts?: SelectedProducts[];
  concepts: string[];
  colors: string[];
  views: number;
  likes: number;
  commentCount: number;
  comments?: Comment[];
  creationDate: string;
}

export interface IFormInput {
  files: File[];
  title: string;
  description: string;
  products: string[];
  concepts: string[];
  colors: string[];
  submissionConcepts?: string;
  submissionColors?: string;
  feedId: number;
  accountName: string;
  profileImage: string;
  images: string[];
  selectedProducts?: SelectedProducts[];
  views: number;
  likes: number;
  commentCount: number;
  comments?: Comment[];
  creationDate: string;
}

export interface IFeedPreview {
  feedId: number;
  image: string;
}
