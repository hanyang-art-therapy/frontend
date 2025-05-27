import { postFile } from '@/apis/gallery/file';
import { getReviews, postReview } from '@/apis/gallery/review';
import { handleApiError } from '@/components/common/error-handler';
import ReviewsModal from '@/components/gallery/arts/(artsNo)/reviews/modal/reviews-modal';
import ReviewsImage from '@/components/gallery/arts/(artsNo)/reviews/reviews-image';
import ReviewsTitle from '@/components/gallery/arts/(artsNo)/reviews/reviews-title';
import ReviewsTextarea from '@/components/gallery/arts/(artsNo)/reviews/textarea/reviews-textarea';
import ReviewsTextareaActions from '@/components/gallery/arts/(artsNo)/reviews/textarea/reviews-textarea-actions';
import UploadedReviews from '@/components/gallery/arts/(artsNo)/reviews/uploaded-reviews';
import { useAuthStore } from '@/store/auth';
import type { ArtReview } from '@/types/gallery/review';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type ReviewsProps = {
  artName: string;
  artsNo: string;
};

export default function Reviews({ artName, artsNo }: ReviewsProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { userNo } = useAuthStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState<ArtReview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFileNo, setUploadedFileNo] = useState<number[]>([]);
  const [selectedReview, setSelectedReview] = useState<ArtReview>(
    {} as ArtReview
  );
  const [previewUploadImage, setPreviewUploadImage] = useState<string | null>(
    null
  );

  // 리뷰 전체 조회
  const fetchReviews = useCallback(async () => {
    try {
      const reviews = await getReviews(Number(artsNo));
      setReviews(reviews);
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    }
  }, [artsNo]);

  useEffect(() => {
    fetchReviews();
  }, [isDialogOpen]);

  // 댓글 업로드
  const handlePostReview = async () => {
    // 댓글 입력 없을 때 오류 반환
    if (!comment.trim()) return toast.error('댓글을 입력해주세요.');

    try {
      setIsLoading(true);
      setComment('');
      setPreviewUploadImage(null);

      await postReview({
        userNo: Number(userNo),
        artsNo: Number(artsNo),
        reviewText: comment,
        filesNo: uploadedFileNo,
      });

      await fetchReviews();

      toast.success('댓글이 업로드되었습니다.');
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  // 첨부파일 업로드
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const response = await postFile(file);
      setPreviewUploadImage(response[0].url);
      setUploadedFileNo([response[0].filesNo]);
    }
  };

  return (
    <div className='flex w-full flex-col items-start gap-[10px]'>
      {/* 미술관 미술치료 + 리뷰 개수 */}
      <ReviewsTitle commentsLength={reviews?.length || 0} />

      {/* 리뷰 작성 */}
      <div className='flex flex-col w-full border border-bg-gray-d p-[10px] gap-[20px] md:pb-[22px] rounded-sm'>
        <div className='flex gap-[10px]'>
          {/* 리뷰 이미지 */}
          <ReviewsImage
            previewImage={previewUploadImage}
            setPreviewUploadImage={setPreviewUploadImage}
          />

          {/* 리뷰 텍스트 편집기 */}
          <ReviewsTextarea
            comment={comment}
            imageInputRef={imageInputRef}
            setComment={setComment}
            handleImageChange={handleImageChange}
            handlePostReview={handlePostReview}
          />
        </div>

        {/* 리뷰 텍스트 하단 버튼 (수정, 삭제, 닫기) */}
        <ReviewsTextareaActions
          isLoading={isLoading}
          imageInputRef={imageInputRef}
          handlePostReview={handlePostReview}
        />
      </div>

      {/* 업로드된 리뷰 */}
      <UploadedReviews
        isLoading={isLoading}
        reviews={reviews}
        setIsDialogOpen={setIsDialogOpen}
        setSelectedReview={setSelectedReview}
      />

      {/* 모달 */}
      {isDialogOpen && (
        <ReviewsModal
          artsNo={Number(artsNo)}
          artName={artName}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          selectedReview={selectedReview}
          setSelectedReview={setSelectedReview}
          fetchReviews={fetchReviews}
        />
      )}
    </div>
  );
}
