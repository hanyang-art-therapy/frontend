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
    <div className='w-full flex flex-col gap-4 md:flex-1 h-full md:max-h-[700px] md:min-w-[400px] object-contain'>
      <span className='t-b-16'>첨부한 이미지</span>

      {/* 이미지 있음 */}
      {hasImage ? (
        <div className='relative'>
          <img
            src={imageUrl}
            alt='리뷰 이미지'
            aria-label='리뷰 이미지'
            className='w-full h-full  object-cover'
          />

          {isEditing && (
            <button
              onClick={handleReviewImageDelete}
              className='absolute top-1 right-1 bg-black/80 hover:bg-black rounded-full w-6 h-6 flex items-center justify-center cursor-pointer'
              aria-label='이미지 삭제'>
              <X
                className='w-4 h-4 hover:scale-110 transition-all duration-100'
                color='white'
              />
            </button>
          )}
        </div>
      ) : (
        !isEditing && '없음'
      )}

      {/* 수정 중 이미지 업로드 */}
      {isEditing && !hasImage && (
        <div className='relative border-2 border-dashed border-gray-9 rounded-[5px] p-4 h-[400px] flex items-center justify-center'>
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
