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
