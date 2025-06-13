import apiInstance from '@/lib/axios';
import type { MyReviewPagination } from '@/types';
import type { getMyPostsRequest, MyPostData } from '@/types/my-page';

// GET 내가 쓴 게시글 목록 조회 /my-page/my-posts
// GET 내가 쓴 게시글 목록 조회 /my-page/my-posts
export const getMyPosts = async ({
  page,
}: getMyPostsRequest): Promise<MyReviewPagination<MyPostData>> => {
  const response = await apiInstance.get('/my-page/my-posts', {
    params: {
      page,
    },
  });

  return response.data;
};
