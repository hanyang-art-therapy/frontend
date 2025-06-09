import { Button } from '@/components/ui/button';
import { Image, LoaderCircle, Navigation } from 'lucide-react';
import type { RefObject } from 'react';

type ReviewsTextareaActionsProps = {
  isLoading: boolean;
  imageInputRef: RefObject<HTMLInputElement | null>;
  handlePostReview: () => void;
};

export default function ReviewsTextareaActions({
  isLoading,
  imageInputRef,
  handlePostReview,
}: ReviewsTextareaActionsProps) {
  return (
    <div className='w-full flex md:justify-end items-center gap-2 flex-nowrap'>
      <Button
        type='button'
        onClick={() => imageInputRef.current?.click()}
        aria-label='이미지 첨부'
        className='gap-[5px] t-m-18 bg-primary px-5 flex-1 md:flex-none w-auto rounded-[40px] whitespace-nowrap'
      >
        이미지 첨부
        <Image size={20} className='!w-5 !h-5' color='#fff' />
      </Button>

      <Button
        type='button'
        disabled={isLoading}
        onClick={handlePostReview}
        className='gap-[5px] t-m-18 px-5 w-auto flex-1 md:flex-none bg-primary rounded-[40px] whitespace-nowrap'
      >
        댓글 업로드
        {isLoading ? (
          <LoaderCircle
            size={20}
            className='!w-5 !h-5 animate-spin'
            color='white'
          />
        ) : (
          <Navigation
            size={20}
            className='!w-5 !h-5'
            color='white'
            fill='white'
          />
        )}
      </Button>
    </div>
  );
}
