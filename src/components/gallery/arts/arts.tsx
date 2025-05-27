import { getArts } from '@/apis/gallery/art';
import { handleApiError } from '@/components/common/error-handler';
import ArtsList from '@/components/gallery/arts/arts-list';
import ArtListSkeleton from '@/components/gallery/arts/arts-list-skeleton';
import ArtsSearch from '@/components/gallery/arts/arts-search';
import type { Art } from '@/types/gallery/art';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import ArtsNoResult from './arts-no-result';

export default function Arts() {
  const [lastId, setLastId] = useState<number>(0);
  const [arts, setArts] = useState<Art[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [cohorts, setCohorts] = useState<number[]>([]);

  const cohort = searchParams.get('cohort') ?? undefined;
  const year = searchParams.get('year') ?? undefined;

  const fetchArts = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await getArts({
        lastId,
        year: year ? Number(year) : undefined,
        cohort: cohort ? Number(cohort) : undefined,
      });

      setArts(response.content);
      setLastId(response.lastId);

      if (!cohorts.length) {
        const cohortsSet = new Set(
          response.content.flatMap((art) =>
            art.artists.map((artist) => artist.cohort)
          )
        );
        setCohorts(Array.from(cohortsSet).sort((a, b) => a - b));
      }
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArts();
  }, [year, cohort]);

  return (
    <div className='flex flex-col justify-center items-center px-5 xl:px-0'>
      <ArtsSearch cohorts={cohorts} setLastId={setLastId} />

      {isLoading ? (
        <ArtListSkeleton />
      ) : !arts.length ? (
        <ArtsNoResult />
      ) : (
        <ul className='grid-cols-1 grid sm:grid-cols-2 lg:grid-cols-3 md:w-full gap-[10vw] sm:gap-[4vw] pt-[68px]'>
          {arts.map((art) => (
            <ArtsList key={art.artsNo} art={art} />
          ))}
        </ul>
      )}
    </div>
  );
}
