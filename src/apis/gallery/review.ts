import axiosInstance from '@/lib/axios';
import type { ArtReviewsPagination, MessageResponse } from '@/types';
import type {
  ArtReview,
  DeleteReviewRequest,
  GetReviewsRequest,
  PatchReviewRequest,
  PostReviewRequest,
  PostReviewResponse,
  BanReviewRequest,
} from '@/types/gallery/review';

// GET /gallery/arts/:artsNo/reviews
export const getReviews = async ({
  artsNo,
  page,
  size,
}: GetReviewsRequest): Promise<ArtReviewsPagination<ArtReview>> => {
  const response = await axiosInstance.get(
    `/galleries/arts/${artsNo}/reviews`,
    {
      params: { page, size },
    }
  );
  return response.data;
};

export const postReview = async ({
  artsNo,
  reviewText,
  filesNo,
}: PostReviewRequest): Promise<PostReviewResponse> => {
  const response = await axiosInstance.post(
    `/galleries/arts/${artsNo}/reviews`,
    {
      filesNo,
      reviewText,
    }
  );

  return response.data;
};

export const patchReview = async ({
  artsNo,
  reviewsNo,
  reviewText,
  filesNo,
}: PatchReviewRequest) => {
  await axiosInstance.patch(`/galleries/arts/${artsNo}/reviews/${reviewsNo}`, {
    filesNo,
    reviewText,
  });
};

export const deleteReview = async ({
  artsNo,
  reviewsNo,
}: DeleteReviewRequest) => {
  await axiosInstance.delete(`/galleries/arts/${artsNo}/reviews/${reviewsNo}`);
};

export const banReview = async ({
  artsNo,
  reviewsNo,
}: BanReviewRequest): Promise<MessageResponse> => {
  const response = await axiosInstance.patch(
    `/galleries/arts/${artsNo}/reviews/${reviewsNo}/ban`
  );

  return response.data;
};
