import type { Review, User, Files } from '@/types';

export type FilesResponse = Pick<
  Files,
  'filesNo' | 'name' | 'url' | 'filesSize' | 'extension' | 'filesType'
>;

export type ArtReview = Pick<
  Review,
  'reviewsNo' | 'createdAt' | 'reviewText' | 'userNo'
> &
  Pick<User, 'userName'> & {
    files: FilesResponse[];
  };

export type PostReviewRequest = Pick<Review, 'artsNo' | 'reviewText'> & {
  filesNo: number[];
  userNo: number;
};

export type PostReviewResponse = {
  data: Pick<Review, 'reviewsNo' | 'reviewText' | 'createdAt' | 'userNo'> &
    Pick<User, 'userName'> & {
      files: FilesResponse[];
    };
  message: string;
};

export type UploadFileResponse = Pick<
  Files,
  'filesNo' | 'name' | 'url' | 'filesSize' | 'extension' | 'filesType'
>[];

export type PatchReviewRequest = Pick<
  Review,
  'reviewsNo' | 'artsNo' | 'reviewText'
> & {
  filesNo: number[] | null;
};

export type DeleteReviewRequest = Pick<Review, 'artsNo' | 'reviewsNo'>;

export type GetReviewsRequest = {
  artsNo: number;
  page?: number;
  size?: number;
};

export type BanReviewRequest = Pick<Review, 'artsNo' | 'reviewsNo'>;
