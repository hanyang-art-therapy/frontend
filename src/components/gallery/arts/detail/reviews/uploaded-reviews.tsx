import { NO_IMG } from '@/constants/gallery/art-details';
import { formatTimeStamp } from '@/lib/utils';

interface UploadedReviewsProps {
  comments: Comment[];
  onImageClick: (imageUrl: string, comment: Comment) => void;
}

interface Comment {
  text: string;
  image: string | null;
  userName: string;
  reviewText: string;
  createdAt: string;
}

export default function UploadedReviews({
  comments,
  onImageClick,
}: UploadedReviewsProps) {
  return (
    <>
      {comments.map((comment, index) => (
        <div
          key={index}
          className='flex flex-row md:flex-col items-center gap-4 bg-white rounded-lg shadow-lg p-4 w-full cursor-pointer'
          onClick={() => onImageClick(comment.image || NO_IMG, comment)}>
          <div className='w-[200px] h-[120px] md:w-[260px] md:h-[200px] overflow-hidden rounded pt-[10px]'>
            <img
              src={comment.image || NO_IMG}
              alt='업로드 이미지'
              className='w-full h-full object-cover'
            />
          </div>

          <div className='flex flex-col justify-start text-start w-full p-1'>
            <div className='flex justify-between items-center w-full'>
              <h3 className='font-bold md:text-lg mb-2 text-start flex-grow'>
                {comment.userName || '익명'}
              </h3>
              <p className='color--gray md:text-lg mb-2 text-end t-r-14'>
                {formatTimeStamp(comment.createdAt)}
              </p>
            </div>

            <p className='text-black text-[14px] md:hidden'>
              {comment.reviewText.length > 40
                ? `${comment.reviewText.slice(0, 40)}...`
                : comment.reviewText}
            </p>

            <div className='hidden md:block h-[120px] overflow-hidden'>
              <p className='text-black md:text-[16px] leading-tight'>
                {comment.reviewText}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
