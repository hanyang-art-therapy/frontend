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
      className='flex flex-row md:flex-col items-center gap-4 bg-white rounded-lg shadow-lg p-4 w-full cursor-pointer'
      onClick={onImageClick}>
      <img
        src={image || NO_IMG}
        alt='리뷰 이미지'
        className='w-[200px] h-[120px] md:w-[260px] md:h-[200px] overflow-hidden rounded pt-[10px]'
      />
      <div className='flex flex-col justify-start text-start'>
        <h3 className='t-b-16 mb-2 text-start'>{userName || '익명'}</h3>
        {/* 모바일(md 미만)에서: 40자 제한 */}
        <p className='t-r-14 md:hidden'>
          {reviewText.length > 40
            ? `${reviewText.slice(0, 40)}...`
            : reviewText}
        </p>

        {/* 데스크탑(md 이상)에서: 높이 160px 변경(확대) */}
        <div className='hidden md:block h-[120px] overflow-hidden'>
          <p className='t-r-16 leading-tight'>{reviewText}</p>
        </div>
      </div>
    </div>
  );
}
