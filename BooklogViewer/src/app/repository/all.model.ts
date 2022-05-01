export interface User {
  user_id: string;
  account: string;
  nickname: string;
}

export interface Review {
  description: string;
  create_on: string;
}

export interface Book {
  id: string;
  status: string;
  create_on: string;
  read_at: string;
  title: string;
  image: string;
  image_2x: string;
  review: Review;
}

export interface AllModel {
  user: User;
  books: Book[];
}
