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
        className='gap-[5px] t-b-16 bg-primary px-5 flex-1 md:flex-none w-auto rounded-[40px] whitespace-nowrap'>
        이미지 첨부
        <Image size={12} className='w-3 h-3 md:w-5 md:h-5' color='#fff' />
      </Button>

      <Button
        type='button'
        disabled={isLoading}
        onClick={handlePostReview}
        className='gap-[5px] t-b-16 px-5 w-auto flex-1 md:flex-none bg-primary rounded-[40px]'>
        댓글 업로드
        {isLoading ? (
          <LoaderCircle
            size={12}
            className='w-3 h-3 md:w-5 md:h-5 animate-spin'
            color='white'
          />
        ) : (
          <Navigation
            size={12}
            className='w-3 h-3 md:w-5 md:h-5'
            color='white'
            fill='white'
          />
        )}
      </Button>
    </div>
  );
}
