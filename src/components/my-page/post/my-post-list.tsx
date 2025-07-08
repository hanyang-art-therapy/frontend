import MyPostNoResult from '@/components/my-page/post/my-post-no-result';
import { formatTimeStamp } from '@/lib/utils';
import type { MyPostData } from '@/types/my-page';
import { Link } from 'react-router-dom';

type MyPostListProps = {
  myPosts: MyPostData[];
};

export default function MyPostList({ myPosts }: MyPostListProps) {
  if (myPosts.length === 0) {
    return <MyPostNoResult />;
  }

  return (
    <ul className='flex flex-col border-y border-gray-9'>
      {myPosts.map((post, index) => (
        <li
          key={post.artsNo}
          className='border-b border-b-bg-gray-d border-muted last:border-b-0 hover:bg-primary/10 hover:text-bg-primary transition-all duration-300'
        >
          <Link
            to={`/gallery/${post.artsNo}`}
            className='flex items-center gap-4 md:gap-[30px] px-1 md:px-5 py-[13px] cursor-pointer'
          >
            <p className='px-1 t-r-16 md:min-w-[46px] text-center'>
              {index + 1}
            </p>

            <div className='flex-1 min-w-0'>
              <p className='t-m-18 truncate'>{post.artName}</p>
            </div>

            <p className='text-gray-6 t-m-14'>
              {post.artType === 'SINGLE' ? '개인 작품' : '공동 작품'}
            </p>

            <p className='text-gray-9 t-r-14'>
              {formatTimeStamp(post.createdAt)}
            </p>
          </Link>
        </li>
      ))}

      {Array.from({
        length: 5 - myPosts.slice(0, 5).length,
      }).map((_, i) => (
        <li
          key={`empty-row-${i}`}
          className='border-b border-b-bg-gray-d border-muted px-1 md:px-5 py-[13px] last:border-b-0 hover:bg-primary/10 hover:text-bg-primary transition-all duration-300'
        >
          <div className='flex flex-col items-center cursor-pointer'>
            <p className='md:min-w-[46px] t-m-18'>&nbsp;</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
