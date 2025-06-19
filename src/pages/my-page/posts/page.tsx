import MyPosts from '@/components/my-page/post/my-posts';
import type { MyPostData } from '@/types/my-page';
import { useLoaderData } from 'react-router-dom';

export default function MyPagePosts() {
  const myPosts = useLoaderData() as MyPostData[];

  return <MyPosts myPosts={myPosts} />;
}
