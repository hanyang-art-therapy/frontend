import MyCommentsList from '@/components/my-page/comment/my-comments-list';
import MyPageHeader from '@/components/my-page/ui/my-page-header';
import type { MyComment } from '@/types/my-page';

type MyCommentsProps = {
  commentData: MyComment[];
};

export default function MyComments({ commentData }: MyCommentsProps) {
  return (
    <>
      <MyPageHeader title='내가 쓴 댓글 관리' />

      <ul className='flex flex-col border-t border-b border-t-black border-b-black'>
        {commentData.map((comment) => (
          <MyCommentsList key={comment.artsNo} comment={comment} />
        ))}
      </ul>
    </>
  );
}
