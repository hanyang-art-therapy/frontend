import { refresh } from '@/apis/auth/refresh';
import { getMyPosts } from '@/apis/my-page/posts';
import { getMyProfile } from '@/apis/my-page/profile';
import { getMyReviews } from '@/apis/my-page/reviews';

import { redirect } from 'react-router-dom';

export const myPageLoader = async () => {
  const response = await refresh();

  if (response.status === 403) {
    throw redirect('/auth/sign-in');
  }

  return response;
};

export const myReviewsLoader = async () => {
  const response = await getMyReviews({});

  return response;
};

export const myProfileLoader = async () => {
  const response = await getMyProfile();

  return response;
};

export const myPostsLoader = async () => {
  const response = await getMyPosts({});

  return response;
};
