import ReviewImageHeicSupport from '@/components/gallery/arts/(artsNo)/reviews/image/review-image-heic-support';
import { X } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

type ReviewsImageProps = {
  previewImage: string | null;
  setPreviewUploadImage: Dispatch<SetStateAction<string | null>>;
};

export default function ReviewsImage({
  previewImage,
  setPreviewUploadImage,
}: ReviewsImageProps) {
  return (
    <div className='w-[100px] h-[100px] md:w-[150px] md:h-[150px] relative bg-btn-gray-fa flex items-center justify-center'>
      {previewImage ? (
        <>
          <ReviewImageHeicSupport
            src={previewImage}
            alt='미리보기'
            className='w-full h-full object-cover rounded'
          />
          <button
            onClick={() => setPreviewUploadImage(null)}
            className='absolute top-1 right-1 bg-black/80 hover:bg-black rounded-full w-6 h-6 flex items-center justify-center cursor-pointer'
            aria-label='이미지 삭제'>
            <X
              className='w-4 h-4 hover:scale-110 transition-all duration-100'
              color='white'
            />
          </button>
        </>
      ) : (
        <span className='t-r-14 text-gray-9 rounded-sm'>이미지 미리보기</span>
      )}
    </div>
  );
}
