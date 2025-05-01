import { formatTimeStamp } from '@/lib/utils';
import { MyComment } from '@/types/my-page';

type MyCommentsListProps = {
  comment: MyComment;
};

export default function MyCommentsList({ comment }: MyCommentsListProps) {
  return (
    <li
      key={comment.artsNo}
      className='border-b border-muted last:border-b-0 hover:bg-orange-100 hover:text-primary transition-all duration-300'>
      <a
        href={`/gallery/${comment.artsNo}`}
        className='flex items-center gap-[30px] px-[20px] py-[13px] cursor-pointer'>
        <p className='px-1 text-gray font-normal min-w-20'>갤러리</p>

        <span className='flex-1 flex flex-col gap-[10px]'>
          <p className='text-black font-medium'>{comment.artName}</p>
          <p className='text-gray text-[14px]'>{comment.reviewText}</p>
        </span>
        <p className='text-muted font-normal'>
          {formatTimeStamp(comment.createdAt)}
        </p>
      </a>
    </li>
  );
}
