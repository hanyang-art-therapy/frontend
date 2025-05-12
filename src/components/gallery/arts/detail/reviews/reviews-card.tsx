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
    <div
      className='flex flex-row md:flex-col items-start gap-4 bg-white rounded-lg shadow-lg p-4 w-full cursor-pointer'
      onClick={onImageClick}>
      <img
        src={image || NO_IMG}
        alt='리뷰 이미지'
        className='w-[100px] h-[100px] md:w-[200px] md:h-[200px] object-cover'
      />
      <div className='flex flex-col justify-start text-start'>
        <h3 className='font-bold md:text-lg mb-2 text-start'>
          {userName || '익명'}
        </h3>
        {/* 모바일(md 미만)에서: 40자 제한 */}
        <p className='text-[var(--black)] text-[14px] md:hidden'>
          {reviewText.length > 40
            ? `${reviewText.slice(0, 40)}...`
            : reviewText}
        </p>

        {/* 데스크탑(md 이상)에서: 높이 160px 변경(확대) */}
        <div className='hidden md:block h-[160px] overflow-hidden'>
          <p className='text-[var(--black)] md:text-[16px] leading-tight'>
            {reviewText}
          </p>
        </div>
      </div>
    </div>
  );
}
