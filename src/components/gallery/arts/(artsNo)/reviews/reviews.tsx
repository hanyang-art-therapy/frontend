import { postFile } from '@/apis/common/file';
import { getReviews, postReview } from '@/apis/gallery/review';
import { handleApiError } from '@/components/common/error-handler';
import ReviewsModal from '@/components/gallery/arts/(artsNo)/reviews/modal/reviews-modal';
import ReviewsImage from '@/components/gallery/arts/(artsNo)/reviews/reviews-image';
import ReviewsTitle from '@/components/gallery/arts/(artsNo)/reviews/reviews-title';
import ReviewsTextarea from '@/components/gallery/arts/(artsNo)/reviews/textarea/reviews-textarea';
import ReviewsTextareaActions from '@/components/gallery/arts/(artsNo)/reviews/textarea/reviews-textarea-actions';
import UploadedReviews from '@/components/gallery/arts/(artsNo)/reviews/uploaded-reviews';
import { useAuthStore } from '@/store/auth';
import { ArtReviewsPagination } from '@/types';
import type { ArtReview } from '@/types/gallery/review';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { toast } from 'sonner';

type ReviewsProps = {
  artName: string;
  artsNo: string;
  initialReviews: ArtReviewsPagination<ArtReview> | null;
};

type PreviewImage = {
  url: string;
  fileNo: number;
};

export default function Reviews({
  artName,
  artsNo,
  initialReviews,
}: ReviewsProps) {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const { userNo } = useAuthStore();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const [isImageUploadLoading, setIsImageUploadLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState<PreviewImage[]>([]);
  const [reviews, setReviews] = useState<ArtReviewsPagination<ArtReview>>(
    initialReviews ?? {
      content: [],
      page: 0,
      isLast: false,
    }
  );
  const [selectedReview, setSelectedReview] = useState<ArtReview>(
    {} as ArtReview
  );

  const fetchReviews = useCallback(async () => {
    try {
      const reviews = await getReviews(Number(artsNo));

      setReviews(reviews);
    } catch (error) {
      const errorMessage = handleApiError(error);

      toast.error(errorMessage);
    }
  }, [artsNo]);

  const handlePostReview = async () => {
    if (!comment.trim()) return toast.error('댓글을 입력해주세요.');

    try {
      setIsSubmitLoading(true);
      setComment('');
      setPreviewImages([]);

      const response = await postReview({
        userNo: Number(userNo),
        artsNo: Number(artsNo),
        reviewText: comment,
        filesNo: previewImages.map((previewImage) => previewImage.fileNo),
      });

      setReviews((prev) => {
        const newReviews = [...prev.content, response.data];

        return {
          ...prev,
          content: newReviews,
        };
      });

      toast.success('댓글이 업로드되었습니다.');
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setIsSubmitLoading(false);
    }
  };

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      if (previewImages.length + files.length > 5) {
        toast.error('이미지는 최대 5장까지 첨부 가능합니다.');
        return;
      }

      try {
        setIsImageUploadLoading(true);
        const fileArray = Array.from(files);
        const response = await postFile(fileArray);

        const newImages = response.map((file) => ({
          url: file.url,
          fileNo: file.filesNo,
        }));

        setPreviewImages((prev) => [...prev, ...newImages]);
      } catch (error) {
        toast.error(handleApiError(error));
      } finally {
        setIsImageUploadLoading(false);
        if (imageInputRef.current) {
          imageInputRef.current.value = '';
        }
      }
    }
  };

  const handleRemoveImage = (imageIndex: number) => {
    setPreviewImages((prev) =>
      prev.filter((_, previewImageIndex) => previewImageIndex !== imageIndex)
    );

    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  return (
    <div className='flex w-full flex-col items-start gap-[10px]'>
      {/* 미술관 미술치료 + 리뷰 개수 */}
      <ReviewsTitle commentsLength={reviews?.content.length || 0} />

      {/* 리뷰 작성 */}
      <div className='flex flex-col w-full border border-bg-gray-d p-[10px] gap-[20px] md:pb-[22px] rounded-sm'>
        <div className='flex gap-[10px]'>
          {/* 리뷰 텍스트 편집기 */}
          <ReviewsTextarea
            comment={comment}
            imageInputRef={imageInputRef}
            setComment={setComment}
            handleImageChange={handleImageChange}
            handlePostReview={handlePostReview}
          />
        </div>

        {/* 리뷰 이미지 */}
        <ReviewsImage
          previewImages={previewImages}
          handleRemoveImage={handleRemoveImage}
          handleAddImage={() => imageInputRef.current?.click()}
          isLoading={isImageUploadLoading}
        />

        {/* 리뷰 텍스트 하단 버튼 (수정, 삭제, 닫기) */}
        <ReviewsTextareaActions
          isLoading={isSubmitLoading}
          handlePostReview={handlePostReview}
          comment={comment}
        />
      </div>

      {/* 업로드된 리뷰 */}
      <UploadedReviews
        isLoading={isSubmitLoading}
        reviews={reviews.content}
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
