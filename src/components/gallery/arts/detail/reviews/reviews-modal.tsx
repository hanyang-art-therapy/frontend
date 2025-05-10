// components/gallery/arts/detail/ImageModal.tsx
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { NO_IMG } from '@/constants/gallery/art-details';
interface ImageModalProps {
  modalImage: string | null;
  selectedComment: {
    userName: string;
    reviewText: string;
    image: string | null;
  };

  image: string | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function ImageModal({
  modalImage,
  selectedComment,
  onClose,
  onPrev,
  onNext,
  isFirst,
  isLast,
}: ImageModalProps) {
  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 mt-[100px]'
      onClick={onClose}>
      <div
        className='bg-white rounded-lg shadow-lg p-5 w-[80%] max-w-[1080px] flex items-center relative'
        onClick={(e) => e.stopPropagation()}>
        <div className='absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2'>
          <button onClick={onPrev} disabled={isFirst}>
            <ChevronLeft size={40} strokeWidth={3} />
          </button>
          <button onClick={onNext} disabled={isLast}>
            <ChevronRight size={40} strokeWidth={3} />
          </button>
        </div>
        <div className='flex flex-col items-center w-full'>
          {/* 이미지가 없을 경우 모달창에서 이미지 숨김 */}
          {modalImage && modalImage !== NO_IMG ? (
            <img
              src={modalImage}
              alt='확대 이미지'
              className='w-full max-h-[450px] object-contain mb-4'
            />
          ) : null}
          <h3 className='font-bold text-lg mb-2'>
            {selectedComment?.userName ?? '익명'}
          </h3>
          <p className='text-sm'>{selectedComment.reviewText}</p>
          <button
            onClick={onClose}
            className='mt-4 text-white bg-black px-4 py-2 rounded-full'>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
