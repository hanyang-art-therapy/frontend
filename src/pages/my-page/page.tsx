import MyPage from '@/components/my-page/my-page';
import type { MyComment, MyPage as MyPageType } from '@/types/my-page';

export default function Page() {
  const ACCOUNT_MOCK_DATA = {
    userId: 'acbd4321',
    userName: '홍길동',
    email: '1234abcd@gmail.com',
    cohort: 25,
    studentNo: '20251234',
  };

  // const POST_MOCK_DATA = {
  //   postId: '1234abcd',
  //   title: '홍길동',
  //   content: '1234abcd@gmail.com',
  //   createdAt: '2025-01-01',
  // };

  const COMMENT_MOCK_DATA = [
    {
      artsNo: 1,
      artName: '작품명 A',
      reviewText: '리뷰 텍스트 A',
      createdAt: '2025-05-01 11:00:36.172331+00',
    },
    {
      artsNo: 2,
      artName: '작품명 B',
      reviewText: '리뷰 텍스트 B',
      createdAt: '2025-05-01 11:00:36.172331+00',
    },
    {
      artsNo: 3,
      artName: '작품명 C',
      reviewText: '리뷰 텍스트 C',
      createdAt: '2025-05-01 11:00:36.172331+00',
    },
  ];

  return (
    <MyPage
      accountData={ACCOUNT_MOCK_DATA as MyPageType}
      commentData={COMMENT_MOCK_DATA as MyComment[]}
    />
  );
}
