import { LoaderCircle, Plus, X } from 'lucide-react';

type PreviewImage = {
  url: string;
  fileNo: number;
};

type ReviewsImageProps = {
  previewImages: PreviewImage[];
  handleRemoveImage: (index: number) => void;
  handleAddImage: () => void;
  isLoading: boolean;
};

export default function ReviewsImage({
  previewImages,
  handleRemoveImage,
  handleAddImage,
  isLoading,
}: ReviewsImageProps) {
  const maxImages = 5;

  return (
    <div className='flex flex-wrap gap-2 ml-auto'>
      {/* 기존 이미지들 */}
      {previewImages.map((image, imageIndex) => (
        <div
          key={`${image.fileNo}-${imageIndex}`}
          className='w-[100px] h-[100px] md:w-[150px] md:h-[150px] relative bg-btn-gray-fa flex items-center justify-center'
        >
          <img
            src={image.url}
            alt={`미리보기 ${imageIndex + 1}`}
            className='w-full h-full object-cover rounded'
          />
          <button
            onClick={() => handleRemoveImage(imageIndex)}
            className='absolute top-1 right-1 bg-black/80 hover:bg-black rounded-full w-6 h-6 flex items-center justify-center cursor-pointer'
            aria-label='이미지 삭제'
          >
            <X
              className='w-4 h-4 hover:scale-110 transition-all duration-100'
              color='white'
            />
          </button>
        </div>
      ))}

      {/* 이미지 추가 버튼 (5장 미만일 때만 표시) */}
      {previewImages.length < maxImages && (
        <div className='w-[100px] h-[100px] md:w-[150px] md:h-[150px] relative bg-btn-gray-fa flex items-center justify-center'>
          {isLoading ? (
            <LoaderCircle className='w-8 h-8 animate-spin' strokeWidth={1} />
          ) : (
            <button
              onClick={handleAddImage}
              className='w-full h-full cursor-pointer flex flex-col items-center justify-center gap-2  transition-colors duration-200 rounded border-2 border-dashed border-bg-gray-d hover:border-gray-6'
              aria-label='이미지 추가'
            >
              <Plus className='w-6 h-6 text-gray-6' />
              <span className='t-r-12 text-gray-6 hover:underline'>
                이미지 추가
              </span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
