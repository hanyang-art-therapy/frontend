import { Button } from '@/components/ui/button';
import { LoaderCircle, Navigation } from 'lucide-react';

type ReviewsTextareaActionsProps = {
  isLoading: boolean;
  handlePostReview: () => void;
  comment: string;
};

export default function ReviewsTextareaActions({
  isLoading,
  handlePostReview,
  comment,
}: ReviewsTextareaActionsProps) {
  return (
    <div className='w-full flex justify-end items-center gap-2 flex-nowrap'>
      <Button
        type='button'
        disabled={isLoading || !comment}
        onClick={handlePostReview}
        className='gap-[5px] t-m-18 px-5 w-auto flex-none bg-primary rounded-[5px] whitespace-nowrap'
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
