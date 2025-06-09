import { formatTimeStamp } from '@/lib/utils';
import type { PaginationResponse } from '@/types';
import type { MyReviewData } from '@/types/my-page';
import { Link } from 'react-router-dom';

type MyReviewListProps = {
  myReviews: PaginationResponse<MyReviewData>;
};

export default function MyReviewList({ myReviews }: MyReviewListProps) {
  const { content: reviews, page, totalElements, size } = myReviews;

  return (
    <ul className='flex flex-col border-t border-b'>
      {reviews.map(
        (review, index) => (
          console.log(review),
          (
            <li
              key={review.reviewsNo}
              className='border-b border-b-black border-muted last:border-b-0 hover:bg-primary/10 hover:text-bg-primary transition-all duration-300'
            >
              <Link
                to={`/gallery/${review.artsNo}`}
                className='flex items-center gap-4 md:gap-[30px] px-1 md:px-5 py-[13px] cursor-pointer'
              >
                <p className='px-1 t-r-16 md:min-w-[46px] text-center'>
                  {totalElements - (page - 1) * size - index}
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
          )
        )
      )}
    </ul>
  );
}
