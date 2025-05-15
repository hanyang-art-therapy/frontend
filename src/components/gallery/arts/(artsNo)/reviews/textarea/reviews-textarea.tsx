import type {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  RefObject,
  SetStateAction,
} from 'react';

type ReviewsTextareaProps = {
  comment: string;
  imageInputRef: RefObject<HTMLInputElement | null>;
  setComment: Dispatch<SetStateAction<string>>;
  handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePostReview: () => void;
};

export default function ReviewsTextarea({
  comment,
  setComment,
  imageInputRef,
  handleImageChange,
  handlePostReview,
}: ReviewsTextareaProps) {
  const handleEnterKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter' || e.shiftKey) return;

    handlePostReview();
  };

  return (
    <div className='md:flex-1 flex flex-col gap-4 w-[70%] md:w-[90%]'>
      <input
        ref={imageInputRef}
        id='imageInput'
        type='file'
        hidden
        accept='image/*'
        onChange={handleImageChange}
      />

      <textarea
        name='reviewText'
        id='reviewText'
        placeholder='감상평을 작성해주세요.'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onKeyDown={handleEnterKeyDown}
        className='h-[100px] md:w-full md:h-[150px] border border-bg-gray-d rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-0'
      />
    </div>
  );
}
