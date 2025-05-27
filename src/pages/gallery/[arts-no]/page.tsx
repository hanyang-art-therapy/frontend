import LazySkeleton from '@/components/common/lazy-skeleton';
import ArtDetail from '@/components/gallery/arts/(artsNo)/art-detail';
import NotFound from '@/components/not-found/not-found';
import type { ArtDetail as ArtDetailType } from '@/types/gallery/art';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { getArtDetail } from '@/apis/gallery/art';
import { handleApiError } from '@/components/common/error-handler';

export default function ArtPage() {
  const { artsNo } = useParams();
  const [artDetail, setArtDetail] = useState<ArtDetailType | null>(null);
  // const loaderData = useLoaderData<ArtDetailType>();

  useEffect(() => {
    const fetchArtDetail = async () => {
      try {
        const response = await getArtDetail(Number(artsNo));
        setArtDetail(response);
      } catch (error) {
        toast.error(handleApiError(error));
      }
    };

    fetchArtDetail();
  }, []);

  if (!artsNo) return <NotFound />;
  if (!artDetail) return <LazySkeleton />;

  return <ArtDetail artDetail={artDetail} artsNo={artsNo} />;
}
