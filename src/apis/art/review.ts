import apiInstance from '@/lib/axios';
import type {
  ArtReview,
  PatchReviewRequest,
  PostReviewRequest,
  DeleteReviewRequest,
  UploadFileResponse,
} from '@/types/gallery/review';
import axios from 'axios';

// GET /gallery/arts/:artsNo/reviews
export const getReviews = async (artsNo: number): Promise<ArtReview[]> => {
  const response = await apiInstance.get(`/galleries/arts/${artsNo}/reviews`);

  return response.data.reviews;
};

export const getReviewsMocking = async (
  artsNo: number
): Promise<ArtReview[]> => {
  const response = await axios.get(`/galleries/arts/${artsNo}/reviews`);

  return response.data.reviews;
};

// POST 리뷰 작성 /gallery/arts/:artsNo/reviews
export const postReview = async ({
  artsNo,
  reviewText,
  filesNo,
}: PostReviewRequest) => {
  const response = await apiInstance.post(`/galleries/arts/${artsNo}/reviews`, {
    filesNo,
    reviewText,
  });

  return response.data;
};

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

// POST 첨부파일 업로드 /files
export const postFile = async (file: File): Promise<UploadFileResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiInstance.post('/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const postFileMocking = async (
  file: File
): Promise<UploadFileResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

// PATCH 리뷰 수정 /gallery/arts/:artsNo/reviews/:reviewNo
export const patchReview = async ({
  artsNo,
  reviewNo,
  reviewText,
  filesNo,
}: PatchReviewRequest) => {
  await apiInstance.patch(`/galleries/arts/${artsNo}/reviews/${reviewNo}`, {
    filesNo,
    reviewText,
  });
};

export const patchReviewMocking = async ({
  artsNo,
  reviewNo,
  reviewText,
  filesNo,
}: PatchReviewRequest) => {
  await axios.patch(`/galleries/arts/${artsNo}/reviews/${reviewNo}`, {
    filesNo,
    reviewText,
  });
};

// DELETE 리뷰 삭제 /gallery/arts/:artsNo/reviews/:reviewNo
export const deleteReview = async ({
  artsNo,
  reviewNo,
}: DeleteReviewRequest) => {
  await apiInstance.delete(`/galleries/arts/${artsNo}/reviews/${reviewNo}`);
};

export const deleteReviewMocking = async ({
  artsNo,
  reviewNo,
}: DeleteReviewRequest) => {
  await axios.delete(`/galleries/arts/${artsNo}/reviews/${reviewNo}`);
};
