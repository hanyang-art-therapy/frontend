import { Skeleton } from '@/components/ui/skeleton';

export default function MyPageSkeleton() {
  return (
    <>
      {/* Hero Section Skeleton */}
      <section className='w-1/3 h-24 pt-15'>
        <Skeleton className='w-full h-full' />
      </section>

      <section className='w-full pt-6 h-[300px] sm:h-[500px]'>
        <Skeleton className='w-full h-full' />
      </section>
    </>
  );
}
