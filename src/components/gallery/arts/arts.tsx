import { getArtsMocking } from '@/apis/art/art';
import { handleApiError } from '@/components/common/error-handler';
import ArtsList from '@/components/gallery/arts/arts-list';
import ArtListSkeleton from '@/components/gallery/arts/arts-list-skeleton';
import ArtsSearch from '@/components/gallery/arts/arts-search';
import type { Art } from '@/types/gallery/art';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function Arts() {
  const [arts, setArts] = useState<Art[]>([]);
  const [hasNext, setHasNext] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [lastId, setLastId] = useState<number | undefined>(undefined);
  const [searchParams] = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLLIElement>(null);

  const cohort = searchParams.get('cohort')
    ? Number(searchParams.get('cohort'))
    : undefined;

  const fetchArts = async (init = false) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await getArtsMocking({
        lastId: init ? undefined : lastId,
        cohort,
      });

      setArts((prev) =>
        init ? response.content : [...prev, ...response.content]
      );
      setHasNext(response.hasNext);
      setLastId(response.lastId);
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    observerRef.current?.disconnect();

    startTransition(() => {
      fetchArts(true);
    });
  }, [cohort]);

  useEffect(() => {
    if (!hasNext || isLoading) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchArts();
      },
      { threshold: 0.5 }
    );

    const current = lastItemRef.current;
    if (current) observerRef.current.observe(current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [arts, hasNext, isLoading]);

  return (
    <div className='flex flex-col justify-center items-center px-5 md:px-0'>
      <ArtsSearch />

      {isPending || isLoading ? (
        <ArtListSkeleton />
      ) : (
        <ul className='grid-cols-1 grid md:grid-cols-3 md:w-full md:gap-x-[90px] gap-y-[50px] pt-[68px]'>
          {arts.map((art, index) => (
            <ArtsList
              key={art.artsNo + index}
              art={art}
              lastItemRef={index === arts.length - 1 ? lastItemRef : null}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
