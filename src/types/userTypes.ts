export interface IMyFeeds {
  feedId: number;
  image: string;
  views: number;
  likes: number;
  commentCount: number;
}

export interface IMyComments {
  feedId: number;
  image: string;
  content: string;
  creationDate: string;
}

export interface IMyLikedFeeds {
  feedId: number;
  image: string;
  accountName: string;
  profileImage: string;
  views: number;
  likes: number;
}

export interface User {
  username: string;
  password: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  myFeeds: IMyFeeds[];
  myComments: IMyComments[];
  myLikedFeeds: IMyLikedFeeds[];
}
