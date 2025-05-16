import { getArtDetail } from '@/apis/art/art';
import { handleApiError } from '@/components/common/error-handler';
import LazySkeleton from '@/components/common/lazy-skeleton';
import ArtDetail from '@/components/gallery/arts/(artsNo)/art-detail';
import NotFound from '@/components/not-found/not-found';
import type { ArtDetail as ArtDetailType } from '@/types/gallery/art';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function ArtPage() {
  const { artsNo } = useParams();
  const [artDetail, setArtDetail] = useState<ArtDetailType | null>(null);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const artDetail = await getArtDetail(Number(artsNo));
        setArtDetail(artDetail);
      } catch (error) {
        const errorMessage = handleApiError(error);

        toast.error(errorMessage);
      }
    };

    fetchArt();
  }, [artsNo]);

  if (!artsNo) return <NotFound />;
  if (!artDetail) return <LazySkeleton />;

  return <ArtDetail artDetail={artDetail} artsNo={artsNo} />;
}
