import ReviewsSkeleton from '@/components/gallery/arts/(artsNo)/reviews/ui/reviews-skeleton';
import { NO_IMG } from '@/constants/gallery/art-details';
import { formatTimeStamp } from '@/lib/utils';
import type { ArtReview } from '@/types/gallery/review';
import { Dispatch, SetStateAction } from 'react';

type UploadedReviewsProps = {
  isLoading: boolean;
  reviews: ArtReview[];
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedReview: Dispatch<SetStateAction<ArtReview>>;
};

export default function UploadedReviews({
  isLoading,
  reviews,
  setIsDialogOpen,
  setSelectedReview,
}: UploadedReviewsProps) {
  if (reviews.length === 0) return null;
  if (isLoading) return <ReviewsSkeleton />;

  const handleButtonClick = (review: ArtReview) => {
    setIsDialogOpen(true);
    setSelectedReview(review);
  };

  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 justify-center items-center gap-4 md:gap-8 mt-[30px]'>
      {reviews.map((review, index) => (
        <div
          key={index}
          className='flex flex-row md:flex-col items-center gap-4 bg-white rounded-lg shadow-lg p-4 w-full cursor-pointer'
          onClick={() => handleButtonClick(review)}>
          <div className='w-[200px] h-[120px] md:w-[260px] md:h-[200px] overflow-hidden pt-[10px]'>
            <img
              src={review.files?.[0]?.url || NO_IMG}
              alt='업로드 이미지'
              className='w-full h-full object-cover'
            />
          </div>

          <div className='flex flex-col justify-start text-start w-full p-1 gap-4'>
            <div className='flex justify-between items-center w-full '>
              <h3 className='t-b-18 text-start flex-grow'>
                {review.userName || '익명'}
              </h3>

              <p className='text-gray-9 text-end t-r-16'>
                {formatTimeStamp(review.createdAt)}
              </p>
            </div>

            <p className='t-r-14 md:hidden line-clamp-4'>{review.reviewText}</p>

            <div className='hidden md:block h-[120px] '>
              <p className='t-r-16 leading-tight line-clamp-6'>
                {review.reviewText}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
