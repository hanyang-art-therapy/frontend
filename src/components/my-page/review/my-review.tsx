import MyPageHeader from '@/components/my-page/ui/my-page-header';
import MyReviewList from '@/components/my-page/review/my-review-list';
import MyReviewPagination from '@/components/my-page/review/my-review-pagination';

export default function MyComments() {
  const REVIEW_MOCK_DATA = [
    {
      reviewNo: 1,
      artsNo: 1,
      artName:
        '작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A 작품명 A ',
      reviewText: '리뷰 텍스트 A',
      createdAt: '2025-04-01T12:00:00',
    },
    {
      reviewNo: 2,
      artsNo: 2,
      artName: '작품명 B',
      reviewText:
        '리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B 리뷰 텍스트 B',
      createdAt: '2025-04-01T12:00:00',
    },
    {
      reviewNo: 3,
      artsNo: 3,
      artName: '작품명 C',
      reviewText: '리뷰 텍스트 C',
      createdAt: '2025-04-01T12:00:00',
    },
    {
      reviewNo: 4,
      artsNo: 4,
      artName: '작품명 D',
      reviewText: '리뷰 텍스트 D',
      createdAt: '2025-04-01T12:00:00',
    },
    {
      reviewNo: 5,
      artsNo: 5,
      artName: '작품명 E',
      reviewText: '리뷰 텍스트 E',
      createdAt: '2025-04-01T12:00:00',
    },
    {
      reviewNo: 6,
      artsNo: 6,
      artName: '작품명 F',
      reviewText: '리뷰 텍스트 F',
      createdAt: '2025-05-01 11:00:36.172331+00',
    },
    {
      reviewNo: 7,
      artsNo: 7,
      artName: '작품명 G',
      reviewText: '리뷰 텍스트 G',
      createdAt: '2025-05-01 11:00:36.172331+00',
    },
    {
      reviewNo: 8,
      artsNo: 8,
      artName: '작품명 H',
      reviewText: '리뷰 텍스트 H',
      createdAt: '2025-05-01 11:00:36.172331+00',
    },
    {
      reviewNo: 9,
      artsNo: 9,
      artName: '작품명 I',
      reviewText: '리뷰 텍스트 I',
      createdAt: '2025-05-01 11:00:36.172331+00',
    },
    {
      reviewNo: 10,
      artsNo: 10,
      artName: '작품명 J',
      reviewText: '리뷰 텍스트 J',
      createdAt: '2025-05-01 11:00:36.172331+00',
    },
    {
      reviewNo: 11,
      artsNo: 11,
      artName: '작품명 K',
      reviewText: '리뷰 텍스트 K',
      createdAt: '2025-05-01 11:00:36.172331+00',
    },
    {
      reviewNo: 12,
      artsNo: 12,
      artName: '작품명 L',
      reviewText: '리뷰 텍스트 L',
      createdAt: '2025-05-01 11:00:36.172331+00',
    },
  ];

  return (
    <>
      <MyPageHeader title='내가 쓴 댓글 관리' />

      <ul className='flex flex-col border-t border-b'>
        {REVIEW_MOCK_DATA.map((review) => (
          <MyReviewList key={review.reviewNo} review={review} />
        ))}
      </ul>

      <MyReviewPagination />
    </>
  );
}
