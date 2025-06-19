import { X } from 'lucide-react';
import type React from 'react';

type ReviewsModalImageDisplayProps = {
  imageUrl: string;
  isEditing: boolean;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export default function ReviewsModalImageDisplay({
  imageUrl,
  isEditing,
  onDelete,
}: ReviewsModalImageDisplayProps) {
  return (
    <div className='relative min-h-[150px] max-h-[300px] sm:max-h-full aspect-[1/1] rounded-[5px] overflow-hidden transition-all duration-300 group'>
      <img
        src={imageUrl || '/placeholder.svg'}
        alt='리뷰 이미지'
        aria-label='리뷰 이미지'
        className='w-full h-full object-contain transition-transform duration-300 group-hover:scale-105'
      />
      <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
      {isEditing && (
        <button
          onClick={onDelete}
          className='absolute top-1 right-1 bg-black/80 hover:bg-black rounded-full w-6 h-6 flex items-center justify-center cursor-pointer'
          aria-label='이미지 삭제'
        >
          <X
            className='w-4 h-4 hover:scale-110 transition-all duration-100'
            color='white'
          />
        </button>
      )}
    </div>
  );
}
