import ReviewsSkeleton from '@/components/gallery/arts/(artsNo)/reviews/ui/reviews-skeleton';
import { NO_IMG } from '@/constants/gallery/art-details';
import { formatTimeStamp } from '@/lib/utils';
import type { ArtReview } from '@/types/gallery/review';
import type { Dispatch, SetStateAction } from 'react';

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
  if (!reviews.length) return null;
  if (isLoading) return <ReviewsSkeleton />;

  const handleButtonClick = (review: ArtReview) => {
    setIsDialogOpen(true);
    setSelectedReview(review);
  };

  return (
    <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mt-6 md:mt-8'>
      {reviews.map((review, index) => (
        <div
          key={index}
          className='flex flex-col sm:flex-col rounded-[5px] shadow-lg p-3 sm:p-4 w-full cursor-pointer'
          onClick={() => handleButtonClick(review)}>
          <div className='flex flex-row sm:flex-col gap-3 sm:gap-0'>
            <div className='w-[120px] sm:w-full aspect-square sm:mb-4 rounded flex justify-center items-center flex-shrink-0'>
              <img
                src={review.files?.[0]?.url || NO_IMG}
                alt='업로드 이미지'
                className='w-full h-full max-w-[120px] sm:max-w-[200px] max-h-[120px] sm:max-h-[200px] object-cover'
              />
            </div>

            <div className='flex flex-col justify-start text-start gap-2 sm:gap-3 flex-1'>
              <div className='flex justify-between items-center'>
                <h3 className='t-m-18 truncate max-w-[65%]'>
                  {review.userName || '익명'}
                </h3>

                <p className='text-gray-9 t-r-14'>
                  {formatTimeStamp(review.createdAt)}
                </p>
              </div>

              <div className='h-[72px] sm:h-[100px] md:h-[120px]'>
                <p className='t-r-14 line-clamp-3 sm:line-clamp-4 md:line-clamp-5'>
                  {review.reviewText}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
