import { getMyPosts } from '@/apis/my-page/posts';

export const myPostsLoader = async () => {
  const response = await getMyPosts({});

  return response;
};
