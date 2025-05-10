// components/gallery/arts/detail/ReviewCard.tsx
import { NO_IMG } from '@/constants/gallery/art-details';

interface ReviewCardProps {
  userName: string;
  reviewText: string;
  image: string | null;
  onImageClick: () => void;
}

export default function ReviewCard({
  userName,
  reviewText,
  image,
  onImageClick,
}: ReviewCardProps) {
  return (
    <div className='flex flex-col items-center gap-2 bg-white rounded-lg shadow-lg'>
      <div className='relative'>
        <img
          src={image || NO_IMG}
          alt='리뷰 이미지'
          className='w-[200px] h-[200px] object-cover cursor-pointer'
          onClick={onImageClick}
        />
      </div>
      <h3 className='font-bold text-lg mb-2'>{userName || '익명'}</h3>
      <p className='text-[var(--black)] text-[16px] p-[10px]'>
        {reviewText.length > 40 ? `${reviewText.slice(0, 40)}...` : reviewText}
      </p>
    </div>
  );
}
