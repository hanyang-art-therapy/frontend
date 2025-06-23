import { banReview, deleteReview, patchReview } from '@/apis/gallery/review';
import { handleApiError } from '@/components/common/error-handler';
import DeleteReviewModal from '@/components/gallery/arts/(artsNo)/reviews/modal/actions/delete-review-modal';
import ReviewsModalActions from '@/components/gallery/arts/(artsNo)/reviews/modal/actions/reviews-modal-actions';
import ReviewsModalActionsButton from '@/components/gallery/arts/(artsNo)/reviews/modal/actions/reviews-modal-actions-button';
import ReviewsModalImage from '@/components/gallery/arts/(artsNo)/reviews/modal/image/reviews-modal-image';
import ReviewsModalTextArea from '@/components/gallery/arts/(artsNo)/reviews/modal/textarea/reviews-modal-textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuthStore } from '@/store/auth';
import type { ArtReviewsPagination } from '@/types';
import type { ArtReview } from '@/types/gallery/review';
import { X } from 'lucide-react';
import type {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
} from 'react';
import { useState } from 'react';
import { toast } from 'sonner';

type ReviewsModalProps = {
  artsNo: number;
  artName: string;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  selectedReview: ArtReview;
  setSelectedReview: Dispatch<SetStateAction<ArtReview>>;
  setReviews: Dispatch<SetStateAction<ArtReviewsPagination<ArtReview>>>;
};

export default function ReviewsModal({
  artsNo,
  artName,
  isDialogOpen,
  setIsDialogOpen,
  selectedReview,
  setSelectedReview,
  setReviews,
}: ReviewsModalProps) {
  const reviewImages = selectedReview.files;
  const imageUrl = reviewImages?.[0]?.url;
  const { role, userNo } = useAuthStore();

  const [editedText, setEditedText] = useState(selectedReview.reviewText);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleConfirmClick = async () => {
    setIsEditing(false);

    try {
      await patchReview({
        artsNo: artsNo,
        reviewsNo: selectedReview.reviewsNo,
        reviewText: editedText,
        filesNo: selectedReview.files.map((file) => file.filesNo) ?? null,
      });

      toast.success('리뷰가 수정되었습니다.');
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    }
  };

  const handleDeleteButtonClick = async () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDialogOpen(false);
    setIsDeleteDialogOpen(false);

    try {
      await deleteReview({
        artsNo: artsNo,
        reviewsNo: selectedReview.reviewsNo,
      });

      setReviews((prev) => {
        return {
          ...prev,
          content: prev.content.filter(
            (review) => review.reviewsNo !== selectedReview.reviewsNo
          ),
        };
      });

      toast.success('리뷰가 삭제되었습니다.');
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedText(selectedReview.reviewText);
  };

  const handleBanClick = async () => {
    try {
      await banReview({
        artsNo: artsNo,
        reviewsNo: selectedReview.reviewsNo,
      });

      toast.success('리뷰가 정지되었습니다.');
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (/Mobi|Android/i.test(navigator.userAgent)) return;
    if (e.nativeEvent.isComposing || e.key !== 'Enter' || e.shiftKey) return;

    handleConfirmClick();
  };

  return (
    <>
      <Dialog
        open={isDialogOpen && !isDeleteDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent
          className='w-full max-w-[95vw] sm:max-w-[90vw] xl:max-w-[85vw] max-h-[95vh] h-auto overflow-visible'
          hasCloseButton={false}
        >
          <div className='flex flex-col h-full max-h-[95vh]'>
            <DialogHeader className='relative flex flex-row items-center justify-between pb-4 sm:pb-6 px-4 sm:px-8 pt-4 sm:pt-8'>
              <DialogTitle className='flex flex-wrap items-center gap-2 sm:gap-3 t-b-18 sm:t-b-24'>
                <div className='flex items-center gap-1 sm:gap-2'>
                  <span className='t-m-16 sm:t-m-18'>
                    {selectedReview.userName ?? '익명'}의
                  </span>
                </div>
                <span className='t-b-24 sm:t-b-32 text-primary break-words'>
                  {artName}
                </span>
                <span className='t-m-16 sm:t-m-18'>작품 리뷰</span>
              </DialogTitle>
            </DialogHeader>

            <div className='flex-1 overflow-y-auto px-4 sm:px-8 pb-4'>
              <div className='flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10'>
                <ReviewsModalImage
                  isEditing={isEditing}
                  imageUrl={imageUrl}
                  selectedReview={selectedReview}
                  setSelectedReview={setSelectedReview}
                />

                <ReviewsModalTextArea
                  isEditing={isEditing}
                  editedText={editedText}
                  handleTextChange={handleTextChange}
                  handleKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div className='absolute -top-20 left-1/2 -translate-x-1/2 flex gap-6 items-center justify-center'>
              {(role === 'ADMIN' || userNo === selectedReview.userNo) && (
                <ReviewsModalActions
                  isEditing={isEditing}
                  isAdmin={role === 'ADMIN'}
                  handleCancelClick={handleCancelClick}
                  handleConfirmClick={handleConfirmClick}
                  handleEditClick={handleEditClick}
                  handleDeleteClick={handleDeleteButtonClick}
                  handleBanClick={handleBanClick}
                />
              )}

              <ReviewsModalActionsButton
                icon={<X className='w-5 h-5' />}
                name='닫기'
                onClick={() => setIsDialogOpen(false)}
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DeleteReviewModal
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        handleDeleteConfirm={handleDeleteConfirm}
      />
    </>
  );
}
