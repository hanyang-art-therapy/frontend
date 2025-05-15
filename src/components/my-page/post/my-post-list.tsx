import MyPostNoResult from '@/components/my-page/post/my-post-no-result';
import { formatTimeStamp } from '@/lib/utils';
import type { MyPostData } from '@/types/my-page';
import { Link } from 'react-router-dom';

export default function MyPostList({ posts }: { posts: MyPostData[] }) {
  return (
    <ul className='flex flex-col border-t border-b border-t-black border-b-black'>
      {posts.length ? (
        posts.map((post) => (
          <li
            key={post.artsNo}
            className='border-b border-b-black border-muted last:border-b-0 hover:bg-primary/10 hover:text-bg-primary transition-all duration-300'>
            <Link
              to={`/gallery/${post.artsNo}`}
              className='flex items-center gap-4 md:gap-[30px] px-1 md:px-[20px] py-[13px] cursor-pointer'>
              <p className='px-1 t-r-16 text-gray-6 md:min-w-20'>갤러리</p>

              <p className='t-m-18 flex-1 truncate'>{post.artName}</p>
              {post.artType === 'GROUP' && (
                <p className='text-gray-6 t-r-16 md:inline hidden'>공동작품</p>
              )}
              <p className='text-gray-9 t-r-16'>
                {formatTimeStamp(post.createdAt)}
              </p>
            </Link>
          </li>
        ))
      ) : (
        <MyPostNoResult />
      )}
    </ul>
  );
}
