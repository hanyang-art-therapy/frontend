import MyPostsList from '@/components/my-page/post/my-posts-list';
import MyPageHeader from '@/components/my-page/ui/my-page-header';

export default function MyPosts() {
  const POST_MOCK_DATA = [
    {
      artsNo: 1,
      artName: '작품명 A',
      createdAt: '2025-05-01 11:00:36.172331+00',
    },
    {
      artsNo: 2,
      artName: '작품명 B',
      createdAt: '2025-05-01 11:00:36.172331+00',
    },
    {
      artsNo: 3,
      artName: '작품명 C',
      createdAt: '2025-05-01 11:00:36.172331+00',
    },
    {
      artsNo: 4,
      artName: '작품명 D',
      createdAt: '2025-05-01 11:00:36.172331+00',
    },
    {
      artsNo: 5,
      artName: '작품명 E',
      createdAt: '2025-05-01 11:00:36.172331+00',
    },
    // {
    //   artsNo: 6,
    //   artName: '작품명 F',
    //   createdAt: '2025-05-01 11:00:36.172331+00',
    // },
    // {
    //   artsNo: 7,
    //   artName: '작품명 G',
    //   createdAt: '2025-05-01 11:00:36.172331+00',
    // },
    // {
    //   artsNo: 8,
    //   artName: '작품명 H',
    //   createdAt: '2025-05-01 11:00:36.172331+00',
    // },
    // {
    //   artsNo: 9,
    //   artName: '작품명 I',
    //   createdAt: '2025-05-01 11:00:36.172331+00',
    // },
    // {
    //   artsNo: 10,
    //   artName: '작품명 J',
    //   createdAt: '2025-05-01 11:00:36.172331+00',
    // },
    // {
    //   artsNo: 11,
    //   artName: '작품명 K',
    //   createdAt: '2025-05-01 11:00:36.172331+00',
    // },
    // {
    //   artsNo: 12,
    //   artName: '작품명 L',
    //   createdAt: '2025-05-01 11:00:36.172331+00',
    // },
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
