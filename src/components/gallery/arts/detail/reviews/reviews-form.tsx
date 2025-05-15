// components/gallery/arts/detail/comment-form.tsx
import DetailTextarea from '../detail-textarea';

interface CommentFormProps {
  imagePreview: string | null;
  comment: string;
  onImageDelete: () => void;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onCommentSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export default function ReviewsForm({
  imagePreview,
  comment,
  onImageDelete,
  onImageChange,
  onCommentChange,
  onCommentSubmit,
}: CommentFormProps) {
  return (
    <div className='flex w-full border border-[var(--gray)] p-[20px] gap-[20px] pb-[22px]'>
      <div className='w-[150px] h-[150px] relative border border-gray-300 rounded bg-[#f9f9f9] flex items-center justify-center'>
        {imagePreview ? (
          <>
            <img
              src={imagePreview}
              alt='미리보기'
              className='w-full h-full object-cover rounded'
            />
            <button
              onClick={onImageDelete}
              className='absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-opacity-70'
              aria-label='이미지 삭제'>
              ×
            </button>
          </>
        ) : (
          <span className='text-sm text-gray-400'>이미지 미리보기</span>
        )}
      </div>
      <DetailTextarea
        comment={comment}
        onCommentChange={onCommentChange}
        onImageChange={onImageChange}
        onCommentSubmit={onCommentSubmit}
      />
    </div>
  );
}
