import { ArtArtistRel, Artist, Arts, Review, User } from '@/types';

export type MyProfileData = Pick<
  User,
  'userId' | 'userName' | 'email' | 'studentNo'
> &
  Pick<Artist, 'cohort'>;

export type MyReviewData = Pick<
  Review,
  'reviewsNo' | 'artsNo' | 'reviewText' | 'createdAt'
> &
  Pick<Arts, 'artName'>;

export type MyPostData = Pick<Review, 'artsNo' | 'createdAt'> &
  Pick<Arts, 'artName' | 'artType'> &
  Pick<ArtArtistRel, 'description'>;

export type ResetPwFieldKey =
  | 'currentPassword'
  | 'newPassword'
  | 'confirmPassword';
