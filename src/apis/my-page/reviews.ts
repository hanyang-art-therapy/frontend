import apiInstance from '@/lib/axios';
import { PaginationResponse } from '@/types';
import type { getMyReviewsRequest, MyReviewData } from '@/types/my-page';

// GET 내가 작성한 댓글 목록조회 /my-page/my-reviews
// GET 내가 작성한 댓글 목록조회 /my-page/my-reviews
export const getMyReviews = async ({
  page,
  keyword,
}: getMyReviewsRequest): Promise<PaginationResponse<MyReviewData>> => {
  const response = await apiInstance.get('/my-page/my-reviews', {
    params: {
      page,
      keyword,
    },
  });

  return response.data;
};
