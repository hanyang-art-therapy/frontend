import MyReviewNoSearched from '@/components/my-page/review/my-review-no-searched';
import MyReviewNoResult from '@/components/my-page/review/my-review-no-result';
import { formatTimeStamp } from '@/lib/utils';
import type { MyReviewPagination } from '@/types';
import type { MyReviewData } from '@/types/my-page';
import { Link } from 'react-router-dom';

type MyReviewListProps = {
  myReviews: MyReviewPagination<MyReviewData> | null;
};

export default function MyReviewList({ myReviews }: MyReviewListProps) {
  if (myReviews === null) {
    return <MyReviewNoResult />;
  }

  if (myReviews.content.length === 0) {
    return <MyReviewNoSearched />;
  }

  const { content: reviews } = myReviews;

  return (
    <ul className='flex flex-col border-y border-gray-9'>
      {reviews.map((review, index) => (
        <li
          key={review.reviewsNo}
          className='border-b border-b-bg-gray-d border-muted last:border-b-0 hover:bg-primary/10 hover:text-bg-primary transition-all duration-300'
        >
          <Link
            to={`/gallery/${review.artsNo}`}
            className='flex items-center gap-4 md:gap-[30px] px-1 md:px-5 py-[13px] cursor-pointer'
          >
            <p className='px-1 t-r-16 md:min-w-[46px] text-center'>
              {index + 1}
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
      ))}
    </ul>
  );
}
