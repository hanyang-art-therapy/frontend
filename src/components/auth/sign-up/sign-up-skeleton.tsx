import { Skeleton } from '@/components/ui/skeleton';

export default function SignUpSkeleton() {
  return (
    <div className='flex flex-col space-y-8 w-full'>
      <Skeleton className='md:h-[90px] md:max-w-[1080px] rounded-xl' />
      <div className='space-y-10'>
        <Skeleton className='md:h-[74px] md:max-w-[240px]' />
        <Skeleton className='md:h-[74px] md:max-w-[200px]' />
        <div className='flex flex-row space-x-4 md:h-[74px] md:max-w-[416px]'>
          <Skeleton className='w-full' />
          <Skeleton className='w-full' />
        </div>
        <Skeleton className='md:h-[74px] md:max-w-[200px]' />
        <div className='flex flex-row space-x-4 md:h-[74px] md:max-w-[648px]'>
          <Skeleton className='w-full' />
          <Skeleton className='w-full' />
          <Skeleton className='w-full' />
        </div>
        <Skeleton className='md:h-[74px] md:max-w-[200px]' />
        <Skeleton className='md:h-[74px] md:max-w-[200px]' />
      </div>
    </div>
  );
}
