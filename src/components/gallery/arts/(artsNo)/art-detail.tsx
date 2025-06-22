import LazySkeleton from '@/components/common/lazy-skeleton';
import Art from '@/components/gallery/arts/(artsNo)/art/art';
import ArtDetailTitle from '@/components/gallery/arts/(artsNo)/art/art-detail-title';
import Reviews from '@/components/gallery/arts/(artsNo)/reviews/reviews';
import type { ArtReviewsPagination } from '@/types';
import type { ArtDetail as ArtDetailType } from '@/types/gallery/art';
import type { ArtReview } from '@/types/gallery/review';

type ArtDetailProps = {
  artDetail: ArtDetailType | null;
  reviews: ArtReviewsPagination<ArtReview> | null;
  artsNo: string;
};

export default function ArtDetail({
  artDetail,
  reviews,
  artsNo,
}: ArtDetailProps) {
  if (!artDetail) return <LazySkeleton />;

  return (
    <div className='max-w-[1260px] mx-auto px-5 xl:px-0 text-center'>
      {/* 작품 상세 타이틀: YYYY ART+THERAPY 전 */}
      <ArtDetailTitle />

      {/* 작품 상세 내용 */}
      <Art artDetail={artDetail} />

      {/* 작품 상세 댓글 */}
      <Reviews
        artName={artDetail.artName}
        artsNo={artsNo}
        initialReviews={reviews}
      />
    </div>
  );
}
