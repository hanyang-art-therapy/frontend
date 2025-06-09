import { ArtArtistRel, Arts, Review, User } from '@/types';

export type MyProfileData = Pick<
  User,
  'userId' | 'userName' | 'email' | 'role' | 'studentNo'
>;

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

export type getMyReviewsRequest = {
  page?: number;
  keyword?: string;
};

export type getMyPostsRequest = {
  page?: number;
};

export type PatchMyProfileRequest = Partial<
  Pick<User, 'userName' | 'email' | 'studentNo'> & {
    verificationCode: string;
  }
>;

export type PostEmailVerificationRequest = Pick<User, 'email'>;

export type PostResetPasswordRequest = Pick<User, 'userId'> & {
  currentPassword: string;
  newPassword: string;
};
