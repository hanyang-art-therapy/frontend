import MyPage from '@/components/my-page/my-page';
import type { MyPage as MyPageType } from '@/types/my-page';

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

  return <MyPage accountData={ACCOUNT_MOCK_DATA as MyPageType} />;
}
