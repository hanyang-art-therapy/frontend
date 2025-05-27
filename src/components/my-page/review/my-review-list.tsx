import MyReviewNoResult from '@/components/my-page/review/my-review-no-result';
import type { MyReviewData } from '@/types/my-page';
import { formatTimeStamp } from '@/lib/utils';
import { Link } from 'react-router-dom';

export default function MyReviewList({
  myReviews,
  isLoading,
}: {
  myReviews: MyReviewData[];
  isLoading: boolean;
}) {
  if (isLoading) return null;

  return (
    <ul className='flex flex-col border-t border-b'>
      {myReviews.length ? (
        myReviews.map((review, index) => (
          <li
            key={review.artsNo}
            className='border-b border-b-black border-muted last:border-b-0 hover:bg-primary/10 hover:text-bg-primary transition-all duration-300'>
            <Link
              to={`/gallery/${review.artsNo}`}
              className='flex items-center gap-4 md:gap-[30px] px-1 md:px-5 py-[13px] cursor-pointer'>
              <p className='px-1 t-r-16 md:min-w-[46px] text-center'>
                {myReviews.length - index}
              </p>

              <div className='flex-1 min-w-0'>
                <p className='t-m-18 truncate'>{review.artName}</p>
                <p className='text-gray-6 t-r-14 truncate mt-[10px]'>
                  {review.reviewText}
                </p>
              </div>
              <p className='text-gray-9 t-r-14'>
                {formatTimeStamp(review.createdAt)}
              </p>
            </Link>
          </li>
        ))
      ) : (
        <MyReviewNoResult />
      )}
    </ul>
  );
}
