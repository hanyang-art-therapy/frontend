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
  timestamp: number;
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
          className='flex flex-row md:flex-col items-start gap-4 bg-white rounded-lg shadow-lg p-4 w-full cursor-pointer'
          onClick={() => onImageClick(comment.image || NO_IMG, comment)}>
          <img
            src={comment.image || NO_IMG}
            alt='업로드 이미지'
            className='w-[100px] h-[100px] md:w-[200px] md:h-[200px] object-cover'
          />

          <div className='flex flex-col justify-start text-start w-full p-1'>
            <div className='flex justify-between items-center w-full'>
              <h3 className='font-bold md:text-lg mb-2 text-start flex-grow'>
                {comment.userName || '익명'}
              </h3>
              <p className='color--gray md:text-lg mb-2 text-end t-r-14'>
                {new Date(comment.timestamp).toLocaleString()}
              </p>
            </div>
            {/* 모바일(md 미만)에서: 40자 제한 */}
            <p className='text-[var(--black)] text-[14px] md:hidden'>
              {comment.reviewText.length > 40
                ? `${comment.reviewText.slice(0, 40)}...`
                : comment.reviewText}
            </p>

            {/* 데스크탑(md 이상)에서: 높이 160px 변경(확대) */}
            <div className='hidden md:block h-[160px] overflow-hidden'>
              <p className='text-[var(--black)] md:text-[16px] leading-tight'>
                {comment.reviewText}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
