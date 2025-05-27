import { Link } from 'react-router-dom';
import { formatTimeStamp } from '@/lib/utils';
import type { MyReviewData } from '@/types/my-page';

type MyReviewProps = {
  index: number;
  reviewLength: number;
  review: MyReviewData;
};

export default function MyReview({
  index,
  reviewLength,
  review,
}: MyReviewProps) {
  const { artsNo, artName, reviewText, createdAt } = review;

  return (
    <li
      key={artsNo}
      className='border-b border-b-black border-muted last:border-b-0 hover:bg-primary/10 hover:text-bg-primary transition-all duration-300'>
      <Link
        to={`/gallery/${artsNo}`}
        className='flex items-center gap-4 md:gap-[30px] px-1 md:px-5 py-[13px] cursor-pointer'>
        <p className='px-1 t-r-16 md:min-w-[46px] text-center'>
          {reviewLength - index}
        </p>

        <div className='flex-1 min-w-0'>
          <p className='t-m-18 truncate'>{artName}</p>
          <p className='text-gray-6 t-r-14 truncate mt-[10px]'>{reviewText}</p>
        </div>
        <p className='text-gray-9 t-r-14'>{formatTimeStamp(createdAt)}</p>
      </Link>
    </li>
  );
}
