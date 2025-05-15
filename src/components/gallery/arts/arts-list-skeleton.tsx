import { Skeleton } from '@/components/ui/skeleton';

export default function ArtListSkeleton() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
      <Skeleton className='w-full h-[400px]' />
      <Skeleton className='w-full h-[400px]' />
      <Skeleton className='w-full h-[400px]' />
    </div>
  );
}
