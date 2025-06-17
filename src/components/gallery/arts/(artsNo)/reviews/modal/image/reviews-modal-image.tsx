import { postFile } from '@/apis/common/file';
import ReviewsModalImageDisplay from '@/components/gallery/arts/(artsNo)/reviews/modal/image/reviews-modal-image-display';
import ReviewsModalImageUploader from '@/components/gallery/arts/(artsNo)/reviews/modal/image/reviews-modal-image-uploader';
import ReviewsModalNoImage from '@/components/gallery/arts/(artsNo)/reviews/modal/image/reviews-modal-no-image';
import type { ArtReview } from '@/types/gallery/review';
import type React from 'react';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

type ReviewsModalImageProps = {
  isEditing: boolean;
  imageUrl: string;
  selectedReview: ArtReview;
  setSelectedReview: Dispatch<SetStateAction<ArtReview>>;
};

export default function ReviewsModalImage({
  isEditing,
  imageUrl,
  selectedReview,
  setSelectedReview,
}: ReviewsModalImageProps) {
  const hasImage = selectedReview.files.length > 0;

  const handleReviewImageDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedReview({
      ...selectedReview,
      files: [],
    });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const response = await postFile([file]);
      setSelectedReview({
        ...selectedReview,
        files: [response[0]],
      });
    }
  };

  return (
    <div className='w-full lg:w-[40%] xl:w-[35%] flex flex-col'>
      <div className='flex items-center gap-3 mb-4 h-[28px]'>
        <h3 className='t-b-16'>첨부한 이미지</h3>
      </div>

      <div className='flex-1 min-w-[200px]'>
        {hasImage ? (
          <ReviewsModalImageDisplay
            imageUrl={imageUrl}
            isEditing={isEditing}
            onDelete={handleReviewImageDelete}
          />
        ) : !isEditing ? (
          <ReviewsModalNoImage />
        ) : (
          <ReviewsModalImageUploader onUpload={handleImageUpload} />
        )}
      </div>
    </div>
  );
}
