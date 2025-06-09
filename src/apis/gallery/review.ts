import { supabase } from '@/lib/supabase';
import axiosInstance from '@/lib/axios';
import type {
  ArtReview,
  DeleteReviewRequest,
  PatchReviewRequest,
  PostReviewRequest,
} from '@/types/gallery/review';
import axios from 'axios';

// GET /gallery/arts/:artsNo/reviews
export const getReviews = async (artsNo: number): Promise<ArtReview[]> => {
  const response = await axiosInstance.get(`/galleries/arts/${artsNo}/reviews`);

  return response.data.content;
};

export const getReviewsMocking = async (
  artsNo: number
): Promise<ArtReview[]> => {
  const response = await axios.get(`/galleries/arts/${artsNo}/reviews`);

  return response.data.reviews;
};

// POST 리뷰 작성 /gallery/arts/:artsNo/reviews
// export const postReview = async ({
//   artsNo,
//   reviewText,
//   filesNo,
// }: PostReviewRequest) => {
//   const response = await apiInstance.post(`/galleries/arts/${artsNo}/reviews`, {
//     filesNo,
//     reviewText,
//   });

//   return response.data;
// };

export const postReviewMocking = async ({
  artsNo,
  reviewText,
  filesNo,
}: PostReviewRequest) => {
  const response = await axios.post(`/galleries/arts/${artsNo}/reviews`, {
    filesNo,
    reviewText,
  });

  return response.data;
};

export const postReview = async ({
  artsNo,
  reviewText,
  filesNo,
}: PostReviewRequest & { userNo: number }) => {
  const response = await axiosInstance.post(
    `/galleries/arts/${artsNo}/reviews`,
    {
      filesNo,
      reviewText,
    }
  );

  return response.data;
};

// POST 첨부파일 업로드 /files
// export const postFile = async (file: File): Promise<UploadFileResponse> => {
//   const formData = new FormData();
//   formData.append('file', file);

//   const response = await apiInstance.post('/files', formData, {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   });

//   return response.data;
// };

// PATCH 리뷰 수정 /gallery/arts/:artsNo/reviews/:reviewNo
// export const patchReview = async ({
//   artsNo,
//   reviewNo,
//   reviewText,
//   filesNo,
// }: PatchReviewRequest) => {
//   await apiInstance.patch(`/galleries/arts/${artsNo}/reviews/${reviewNo}`, {
//     filesNo,
//     reviewText,
//   });
// };

export const patchReviewMocking = async ({
  artsNo,
  reviewsNo,
  reviewText,
  filesNo,
}: PatchReviewRequest) => {
  await axios.patch(`/galleries/arts/${artsNo}/reviews/${reviewsNo}`, {
    filesNo,
    reviewText,
  });
};

export const patchReview = async ({
  artsNo,
  reviewsNo,
  reviewText,
  filesNo,
}: PatchReviewRequest) => {
  const response = await supabase
    .from('reviews')
    .update({
      reviewText,
      filesNo: filesNo ? filesNo[0] : null,
    })
    .eq('artsNo', artsNo)
    .eq('reviewsNo', reviewsNo);

  if (response.error) {
    throw new Error('리뷰 수정에 실패했습니다. 잠시 후 다시 시도해주세요');
  }

  return response.data;
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
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('artsNo', artsNo)
    .eq('reviewsNo', reviewsNo);

  if (error) {
    throw new Error('리뷰 삭제에 실패했습니다. 잠시 후 다시 시도해주세요');
  }
};

export const deleteReviewMocking = async ({
  artsNo,
  reviewsNo,
}: DeleteReviewRequest) => {
  await axios.delete(`/galleries/arts/${artsNo}/reviews/${reviewsNo}`);
};
