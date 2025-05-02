import { formatTimeStamp } from '@/lib/utils';
import type { MyReview } from '@/types/my-page';

export default function MyReviewList({ review }: { review: MyReview }) {
  return (
    <li
      key={review.artsNo}
      className='border-b border-muted last:border-b-0 hover:bg-orange-100 hover:text-bg-primary  transition-all duration-300'>
      <a
        href={`/gallery/${review.artsNo}`}
        className='flex items-center gap-[30px] px-[20px] py-[13px] cursor-pointer '>
        <p className='px-1 text-gray font-normal min-w-20'>갤러리</p>

        <span className='flex-1 flex flex-col gap-[10px]'>
          <p className='text-black font-medium '>{review.artName}</p>
          <p className='text-gray text-[14px]'>{review.reviewText}</p>
        </span>
        <p className='text-muted font-normal'>
          {formatTimeStamp(review.createdAt)}
        </p>
      </a>
    </li>
  );
}
