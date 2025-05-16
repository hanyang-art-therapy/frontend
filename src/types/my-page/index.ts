import { ArtArtistRel, Arts, Review, User } from '@/types';

// TODO: userId 추가
export type MyProfileData = Pick<User, 'userName' | 'email' | 'studentNo'>;
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
