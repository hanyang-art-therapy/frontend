import LazySkeleton from '@/components/common/lazy-skeleton';
import ArtDetail from '@/components/gallery/arts/(artsNo)/art-detail';
import NotFound from '@/components/not-found/not-found';
import { artLoader } from '@/routes/loaders/art/art-loader';
import { useLoaderData, useParams } from 'react-router-dom';

export default function ArtPage() {
  const { artsNo } = useParams();
  const { artDetailResponse, reviewsResponse } =
    useLoaderData<typeof artLoader>();

  if (!artsNo) return <NotFound />;
  if (!artDetailResponse) return <LazySkeleton />;

  return (
    <ArtDetail
      artDetail={artDetailResponse}
      reviews={reviewsResponse}
      artsNo={artsNo}
    />
  );
}
