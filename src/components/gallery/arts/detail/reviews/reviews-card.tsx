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
    <div className='flex flex-row items-start gap-4 bg-white rounded-lg shadow-lg p-4 w-full'>
      <img
        src={image || NO_IMG}
        alt='리뷰 이미지'
        className='w-[100px] h-[100px] md:w-[200px] md:h-[200px] object-cover cursor-pointer'
        onClick={onImageClick}
      />
      <div className='flex flex-col justify-start'>
        <h3 className='font-bold md:text-lg mb-2 text-start'>
          {userName || '익명'}
        </h3>
        <p className='text-[var(--black)] md:text-[16px]'>
          {reviewText.length > 40
            ? `${reviewText.slice(0, 40)}...`
            : reviewText}
        </p>
      </div>
    </div>
  );
}
