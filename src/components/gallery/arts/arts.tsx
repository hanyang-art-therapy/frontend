import { getArts } from '@/apis/gallery/art';
import { handleApiError } from '@/components/common/error-handler';
import ArtsList from '@/components/gallery/arts/arts-list';
import ArtListSkeleton from '@/components/gallery/arts/arts-list-skeleton';
import ArtsNoResult from '@/components/gallery/arts/arts-no-result';
import ArtsSearch from '@/components/gallery/arts/arts-search';
import { InfiniteScrollResponse } from '@/types';
import type { Art } from '@/types/gallery/art';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function Arts() {
  const [lastId, setLastId] = useState<number>(0);
  const [arts, setArts] = useState<InfiniteScrollResponse<Art>>({
    content: [],
    lastId: 0,
    hasNext: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const cohort = searchParams.get('cohort') ?? undefined;
  const year = searchParams.get('year') ?? undefined;
  const observerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchArts = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await getArts({
        lastId,
        year: year ? Number(year) : undefined,
        cohort: cohort ? Number(cohort) : undefined,
      });

      setArts(response);
      setLastId(response.lastId);
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const loadMoreArts = useCallback(async () => {
    if (!arts.hasNext) return;

    try {
      const response = await getArts({
        lastId,
      });

      setArts((prev) => ({
        ...prev,
        content: [...prev.content, ...response.content],
        lastId: response.lastId,
        hasNext: response.hasNext,
      }));
      setLastId(response.lastId);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  }, [arts.hasNext, lastId]);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      const observerTarget = observerRef.current;

      if (!observerTarget) return;

      observer.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && arts.hasNext) loadMoreArts();
        },
        {
          root: null,
          rootMargin: '20px',
          threshold: 0.1,
        }
      );

      observer.current.observe(observerTarget);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (observer.current) observer.current.disconnect();
    };
  }, [arts.hasNext, loadMoreArts]);

  useEffect(() => {
    fetchArts();
  }, [year, cohort]);

  if (isLoading) return <ArtListSkeleton />;

  return (
    <div className='flex flex-col justify-center items-center px-5 xl:px-0'>
      <ArtsSearch setLastId={setLastId} />

      {!arts.content.length && <ArtsNoResult />}
      <ul className='grid-cols-1 grid sm:grid-cols-2 lg:grid-cols-3 md:w-full gap-[10vw] sm:gap-[2.5vw] pt-[68px]'>
        {arts.content.map((art) => (
          <ArtsList key={art.artsNo} art={art} />
        ))}
      </ul>

      <div ref={observerRef} className='h-1 w-full' />
    </div>
  );
}
