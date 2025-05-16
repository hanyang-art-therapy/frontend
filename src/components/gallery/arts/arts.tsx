import { getArts } from '@/apis/art/art';
import { handleApiError } from '@/components/common/error-handler';
import ArtsList from '@/components/gallery/arts/arts-list';
import ArtListSkeleton from '@/components/gallery/arts/arts-list-skeleton';
import ArtsSearch from '@/components/gallery/arts/arts-search';
import type { Art } from '@/types/gallery/art';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useEffect, useState, useMemo } from 'react';

export default function Arts() {
  const [arts, setArts] = useState<Art[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const cohort = searchParams.get('cohort')
    ? Number(searchParams.get('cohort'))
    : undefined;

  const fetchArts = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await getArts();
      setArts(response);
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArts();
  }, []);

  const filteredArts = useMemo(() => {
    if (!cohort) return arts;
    return arts.filter((art) => art.artists[0].cohort === cohort);
  }, [arts, cohort]);

  return (
    <div className='flex flex-col justify-center items-center px-5 xl:px-0'>
      <ArtsSearch />

      {isLoading ? (
        <ArtListSkeleton />
      ) : (
        <ul className='grid-cols-1 grid md:grid-cols-3 md:w-full gap-[5vw] pt-[68px]'>
          {filteredArts.map((art) => (
            <ArtsList key={art.artsNo} art={art} />
          ))}
        </ul>
      )}
    </div>
  );
}
