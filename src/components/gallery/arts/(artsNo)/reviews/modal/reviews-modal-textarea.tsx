import type { ArtReview } from '@/types/gallery/review';
import type { ChangeEvent, KeyboardEvent } from 'react';

type ReviewsModalTextAreaProps = {
  isEditing: boolean;
  editedText: string;
  handleTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
  selectedReview: ArtReview;
};

export default function ReviewsModalTextArea({
  isEditing,
  editedText,
  handleTextChange,
  handleKeyDown,
  selectedReview,
}: ReviewsModalTextAreaProps) {
  return (
    <div className='flex flex-col md:text-start md:flex-2 w-full gap-4'>
      <span className='t-b-16'>리뷰 내용</span>

      {isEditing ? (
        <textarea
          className='min-w-[30vw] min-h-[400px] h-full rounded-[5px] w-full border resize border-gray-9 px-3 py-2 text-sm focus:outline-primary t-r-16 overflow-y-auto'
          value={editedText}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <p className='min-w-[30vw] max-h-[400px] md:max-h-[700px] overflow-auto t-r-16 md:pb-[20px] text-start overflow-y-auto'>
          {selectedReview.reviewText}
        </p>
      )}
    </div>
  );
}
