import { Skeleton } from '@/components/ui/skeleton';

export default function LazySkeleton() {
  return (
    <div className='w-full max-w-[1260px] h-full flex flex-col mx-auto px-[20px] xl:px-0 mt-[80px] mb-[]'>
      <Skeleton className='m-full h-[80vh] rounded-xl' />
    </div>
  );
}
