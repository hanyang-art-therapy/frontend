import MyReviewList from '@/components/my-page/review/my-review-list';
import MyPageHeader from '@/components/my-page/ui/my-page-header';
// import MyReviewPagination from '@/components/my-page/review/my-review-pagination';
import type { MyReviewData } from '@/types/my-page';

export default function MyReveiws({
  myReviews,
  isLoading,
}: {
  myReviews: MyReviewData[];
  isLoading: boolean;
}) {
  return (
    <>
      <MyPageHeader title='내가 쓴 댓글 관리' />
      <MyReviewList myReviews={myReviews} isLoading={isLoading} />
      {/* <MyReviewPagination /> */}
    </>
  );
}
