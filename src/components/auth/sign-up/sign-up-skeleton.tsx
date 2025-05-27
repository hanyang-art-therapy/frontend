import { Skeleton } from '@/components/ui/skeleton';

export default function SignUpSkeleton() {
  return (
    <div className='w-full flex justify-center md:max-w-[1260px] mx-auto px-5 xl:px-0'>
      <div className='flex flex-col space-y-2.5 w-full mt-10 sm:mt-15'>
        <div className='md:space-y-[30px] sm:space-y-[15px] space-y-2'>
          <Skeleton className='md:h-[36px] md:max-w-[250px] rounded-xl' />
          <Skeleton className='md:h-[27px] md:max-w-[300px] rounded-xl' />
          <Skeleton className='md:h-[24px] md:max-w-[200px] ml-auto rounded-xl' />
        </div>

        <div className='space-y-10'>
          <Skeleton className='md:h-[80px] md:max-w-[300px]' />
          <Skeleton className='md:h-[80px] md:max-w-[640px]' />
        </div>

        <Skeleton className='md:h-[60px] md:w-[220px] mx-auto mt-[50px]' />
      </div>
    </div>
  );
}
