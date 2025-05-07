import { Skeleton } from '@/components/ui/skeleton';

export default function LazySkeleton() {
  return (
    <div className='flex flex-col md:max-w-[1080px] min-h-screen-vh w-full mx-auto '>
      <Skeleton className='m-16 h-[500px] rounded-xl' />
    </div>
  );
}
