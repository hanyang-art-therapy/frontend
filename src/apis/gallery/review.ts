import axiosInstance from '@/lib/axios';
import type { ArtReviewsPagination } from '@/types';
import type {
  ArtReview,
  DeleteReviewRequest,
  PatchReviewRequest,
  PostReviewRequest,
  PostReviewResponse,
} from '@/types/gallery/review';

// GET /gallery/arts/:artsNo/reviews
export const getReviews = async (
  artsNo: number
): Promise<ArtReviewsPagination<ArtReview>> => {
  const response = await axiosInstance.get(`/galleries/arts/${artsNo}/reviews`);

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

// DELETE 리뷰 삭제 /gallery/arts/:artsNo/reviews/:reviewNo
// export const deleteReview = async ({
//   artsNo,
//   reviewsNo,
// }: DeleteReviewRequest) => {
//   await apiInstance.delete(`/galleries/arts/${artsNo}/reviews/${reviewsNo}`);
// };

export const deleteReview = async ({
  artsNo,
  reviewsNo,
}: DeleteReviewRequest) => {
  await axiosInstance.delete(`/galleries/arts/${artsNo}/reviews/${reviewsNo}`);
};
