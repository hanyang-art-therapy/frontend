import { Artist, Arts, Review, User } from '@/types';

export type MyPage = Pick<User, 'userId' | 'userName' | 'email' | 'studentNo'> &
  Pick<Artist, 'cohort'>;

export type MyReview = Pick<Review, 'artsNo' | 'reviewText' | 'createdAt'> &
  Pick<Arts, 'artName'>;

export type MyPost = Pick<Review, 'artsNo' | 'createdAt'> &
  Pick<Arts, 'artName'>;
