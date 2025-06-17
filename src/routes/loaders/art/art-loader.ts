import { getArtDetail } from '@/apis/gallery/art';
import { getReviews } from '@/apis/gallery/review';
import { LoaderFunctionArgs } from 'react-router-dom';

export const artLoader = async ({ params }: LoaderFunctionArgs) => {
  const [artDetailResponse, reviewsResponse] = await Promise.all([
    getArtDetail(Number(params.artsNo)),
    getReviews(Number(params.artsNo)),
  ]);

  return { artDetailResponse, reviewsResponse };
};
