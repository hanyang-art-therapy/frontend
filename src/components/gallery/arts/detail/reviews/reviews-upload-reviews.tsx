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
          className='flex flex-row md:flex-col items-start gap-4 bg-white rounded-lg shadow-lg w-full p-4'>
          <img
            src={comment.image || NO_IMG}
            alt='업로드 이미지'
            className='w-[100px] h-[100px] md:w-[200px] md:h-[200px] object-cover cursor-pointer'
            onClick={() => onImageClick(comment.image || NO_IMG, comment)}
          />
          <div className='flex flex-col justify-start'>
            <h3 className='font-bold text-lg mb-2 text-start'>
              {comment.userName || '익명'}
            </h3>
            <p className='text-[var(--black)] md:text-[16px]'>
              {comment.reviewText.length > 40
                ? `${comment.reviewText.slice(0, 40)}...`
                : comment.reviewText}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
