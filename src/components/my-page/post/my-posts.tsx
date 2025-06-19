import MyPostList from '@/components/my-page/post/my-post-list';
import MyPageHeader from '@/components/my-page/ui/my-page-header';
import type { MyPostData } from '@/types/my-page';
import MyPostNoResult from './my-post-no-result';

type MyPostsProps = {
  myPosts: MyPostData[];
};

export default function MyPosts({ myPosts }: MyPostsProps) {
  if (!myPosts) return <MyPostNoResult />;

  return (
    <section className='space-y-10'>
      <MyPageHeader title='나의 작품 관리' />
      <MyPostList myPosts={myPosts} />
    </section>
  );
}
