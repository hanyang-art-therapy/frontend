import { getMyReviews } from '@/apis/my-page/reviews';

export const myReviewsLoader = async () => {
  const response = await getMyReviews({});

  return response;
};
