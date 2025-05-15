import { Skeleton } from '@/components/ui/skeleton';

export default function ReviewsSkeleton() {
  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-center items-center gap-4 md:gap-8'>
      <Skeleton className='w-full h-[120px] md:h-[411px] xl:w-[292px] xl:h-[400px]' />
      <Skeleton className='w-full h-[120px] md:h-[411px] xl:w-[292px] xl:h-[400px]' />
      <Skeleton className='w-full h-[120px] md:h-[411px] xl:w-[292px] xl:h-[400px]' />
      <Skeleton className='w-full h-[120px] md:h-[411px] xl:w-[292px] xl:h-[400px]' />
    </div>
  );
}
