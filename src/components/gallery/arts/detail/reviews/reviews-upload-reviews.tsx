// components/gallery/arts/detail/uploaded-comments-list.tsx
import { NO_IMG } from '@/constants/gallery/art-details';

interface UploadedCommentsListProps {
  comments: Comment[];
  onImageClick: (imageUrl: string, comment: Comment) => void;
}

interface Comment {
  text: string;
  image: string | null;
  userName: string;
  reviewText: string;
}

export default function UploadedReviews({
  comments,
  onImageClick,
}: UploadedCommentsListProps) {
  return (
    <>
      {comments.map((comment, index) => (
        <div
          key={index}
          className='flex flex-col items-center gap-2 bg-white rounded-lg shadow-lg'>
          <div className='relative'>
            <img
              src={comment.image || NO_IMG}
              alt='업로드 이미지'
              className='w-[200px] h-[200px] object-cover cursor-pointer'
              onClick={() => onImageClick(comment.image || NO_IMG, comment)}
            />
          </div>
          <h3 className='font-bold text-lg mb-2'>
            {comment.userName || '익명'}
          </h3>
          <p className='text-[var(--black)] text-[16px] p-[10px]'>
            {comment.reviewText.length > 40
              ? `${comment.reviewText.slice(0, 40)}...`
              : comment.reviewText}
          </p>
        </div>
      ))}
    </>
  );
}
