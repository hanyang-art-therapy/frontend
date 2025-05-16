import { postFile } from '@/apis/art/file';
import type { ArtReview } from '@/types/gallery/review';
import { X } from 'lucide-react';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';

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
      const response = await postFile(file);

      setSelectedReview({
        ...selectedReview,
        files: [response[0]],
      });
    }
  };

  return (
    <div className='w-full flex flex-col gap-4 md:flex-1 min-w-[100px] md:min-w-[320px] xl:min-w-[400px] h-auto'>
      <span className='t-b-16'>첨부한 이미지</span>

      {/* 이미지 있음 */}
      {hasImage ? (
        <div className='relative w-full aspect-[4/3] max-h-[50vh] rounded overflow-hidden'>
          <img
            src={imageUrl}
            alt='리뷰 이미지'
            aria-label='리뷰 이미지'
            className='w-full h-full object-cover'
          />

          {isEditing && (
            <button
              onClick={handleReviewImageDelete}
              className='absolute top-2 right-2 bg-black rounded-full w-7 h-7 flex items-center justify-center'
              aria-label='이미지 삭제'>
              <X className='w-4 h-4 text-white hover:scale-110 transition-transform duration-150' />
            </button>
          )}
        </div>
      ) : (
        !isEditing && <span className='text-sm text-gray-500'>없음</span>
      )}

      {/* 이미지 업로드 영역 */}
      {isEditing && !hasImage && (
        <div className='relative w-full aspect-[4/3] border-2 border-dashed border-gray-300 rounded-md p-4 flex items-center justify-center'>
          <input
            type='file'
            accept='image/*'
            onChange={handleImageUpload}
            className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
          />

          <div className='text-center'>
            <span className='t-r-16 text-gray-6 block mb-2'>
              이미지를 업로드하려면 클릭하세요
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
