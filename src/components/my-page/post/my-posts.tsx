import MyPostsList from '@/components/my-page/post/my-posts-list';
import MyPageHeader from '@/components/my-page/ui/my-page-header';
import type { MyPost } from '@/types/my-page';

export default function MyPosts() {
  const POST_MOCK_DATA: MyPost[] = [
    {
      artsNo: 1,
      artName:
        '작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A ',
      artType: 'SINGLE',
      description: '작품 설명 A',
      createdAt: '2025-05-01T11:00:36',
    },
    {
      artsNo: 2,
      artName: '작품명 B',
      artType: 'GROUP',
      description: '작품 설명 B',
      createdAt: '2025-05-01T11:00:36',
    },
    {
      artsNo: 3,
      artName: '작품명 C',
      artType: 'GROUP',
      description: '작품 설명 C',
      createdAt: '2025-05-01T11:00:36',
    },
    {
      artsNo: 4,
      artName: '작품명 D',
      artType: 'SINGLE',
      description: '작품 설명 D',
      createdAt: '2025-05-01T11:00:36',
    },
    {
      artsNo: 5,
      artName: '작품명 E',
      artType: 'GROUP',
      description: '작품 설명 E',
      createdAt: '2025-05-01T11:00:36',
    },
    {
      artsNo: 6,
      artName: '작품명 F',
      artType: 'SINGLE',
      description: '작품 설명 F',
      createdAt: '2025-05-01T11:00:36',
    },
    {
      artsNo: 7,
      artName: '작품명 G',
      artType: 'GROUP',
      description: '작품 설명 G',
      createdAt: '2025-05-01T11:00:36',
    },
  ];

  return (
    <>
      <MyPageHeader title='나의 게시글 관리' />
      <ul className='flex flex-col border-t border-b border-t-black border-b-black'>
        {POST_MOCK_DATA.map((post) => (
          <MyPostsList key={post.artsNo} post={post} />
        ))}
      </ul>
    </>
  );
}
