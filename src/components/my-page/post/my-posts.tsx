import MyPostList from '@/components/my-page/post/my-post-list';
import MyPageHeader from '@/components/my-page/ui/my-page-header';
import type { MyPostData } from '@/types/my-page';

export default function MyPosts({ myPosts }: { myPosts: MyPostData[] }) {
  return (
    <>
      <MyPageHeader title='나의 게시글 관리' />
      <MyPostList posts={myPosts} />
    </>
  );
}
