import { Skeleton } from '@/components/ui/skeleton';

export default function ArtListSkeleton() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[10vw] sm:gap-[4vw] pt-[68px] w-full px-5'>
      {Array.from({ length: 3 }).map((_, index) => (
        <Skeleton
          key={index}
          className='aspect-[1/1] md:min-w-[230px] h-auto'
        />
      ))}
    </div>
  );
}
