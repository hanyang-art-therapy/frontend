import { ImageIcon } from 'lucide-react';

export default function ReviewsModalNoImage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[150px] border-bg-gray-d rounded-[5px] border-2 border-dashed transition-all duration-300'>
      <div className='flex flex-col items-center justify-center p-4 sm:p-8'>
        <div className='w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-bg-gray-d flex items-center justify-center mb-4'>
          <ImageIcon className='w-6 h-6 sm:w-8 sm:h-8 text-gray-6' />
        </div>
        <span className='t-m-16'>이미지 없음</span>
        <span className='t-r-14 text-gray-6 mt-1 text-center px-2'>
          이 리뷰에는 첨부된 이미지가 없습니다
        </span>
      </div>
    </div>
  );
}
