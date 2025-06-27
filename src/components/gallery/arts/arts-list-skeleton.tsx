import { Skeleton } from '@/components/ui/skeleton';

export default function ArtListSkeleton() {
  return (
    <div>
      <div className='flex gap-4'>
        <Skeleton className='w-[120px] h-[45px] mt-[30px]' />
        <Skeleton className='w-[120px] h-[45px] mt-[30px]' />
      </div>
      <ul className='grid-cols-1 grid sm:grid-cols-2 lg:grid-cols-3 md:w-full gap-[10vw] sm:gap-[2.5vw] pt-[68px]'>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton
            key={index}
            className='aspect-[1/1] md:min-w-[230px] h-auto'
          />
        ))}
      </ul>
    </div>
  );
}
