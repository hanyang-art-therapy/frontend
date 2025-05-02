import { formatTimeStamp } from '@/lib/utils';
import type { MyPost } from '@/types/my-page';

export default function MyPostList({ post }: { post: MyPost }) {
  return (
    <li
      key={post.artsNo}
      className='border-b border-muted last:border-b-0 hover:bg-orange-100 hover:text-bg-primary  transition-all duration-300'>
      <a
        href={`/gallery/${post.artsNo}`}
        className='flex items-center gap-[30px] px-[20px] py-[13px] cursor-pointer '>
        <p className='px-1 text-gray font-normal min-w-20'>갤러리</p>
        <p className='text-black font-medium flex-1'>{post.artName}</p>
        <p className='text-muted font-normal'>
          {formatTimeStamp(post.createdAt)}
        </p>
      </a>
    </li>
  );
}
