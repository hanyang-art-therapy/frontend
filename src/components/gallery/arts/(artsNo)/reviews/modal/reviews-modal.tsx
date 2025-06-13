'use client';

import { deleteReview, patchReview } from '@/apis/gallery/review';
import { handleApiError } from '@/components/common/error-handler';
import ReviewsModalActions from '@/components/gallery/arts/(artsNo)/reviews/modal/reviews-modal-actions';
import ReviewsModalImage from '@/components/gallery/arts/(artsNo)/reviews/modal/reviews-modal-image';
import ReviewsModalTextArea from '@/components/gallery/arts/(artsNo)/reviews/modal/reviews-modal-textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useAuthStore } from '@/store/auth';
import type { ArtReview } from '@/types/gallery/review';
import type {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
} from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type ReviewsModalProps = {
  artsNo: number;
  artName: string;
  isDialogOpen: boolean;
  setIsDialogOpen: Dispatch<SetStateAction<boolean>>;
  selectedReview: ArtReview;
  setSelectedReview: Dispatch<SetStateAction<ArtReview>>;
  fetchReviews: () => void;
};

export default function ReviewsModal({
  artsNo,
  artName,
  isDialogOpen,
  setIsDialogOpen,
  selectedReview,
  setSelectedReview,
  fetchReviews,
}: ReviewsModalProps) {
  const imageUrl = selectedReview.files?.[0]?.url;
  const { role, userNo, setRole } = useAuthStore();

  const [editedText, setEditedText] = useState(selectedReview.reviewText);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setRole('ADMIN');
  }, [role, userNo, selectedReview.userNo]);

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

  const handleDeleteClick = async () => {
    const isConfirmed = window.confirm('정말 해당 리뷰를 삭제하시겠습니까?');

    if (!isConfirmed) return;

    setIsDialogOpen(false);

    try {
      await deleteReview({
        artsNo: artsNo,
        reviewsNo: selectedReview.reviewsNo,
      });

      fetchReviews();
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

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (/Mobi|Android/i.test(navigator.userAgent)) return;
    if (e.nativeEvent.isComposing || e.key !== 'Enter' || e.shiftKey) return;

    handleConfirmClick();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className='w-full max-w-[95vw] sm:max-w-[90vw] xl:max-w-[85vw] max-h-[95vh] h-auto overflow-hidden'>
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
              {isEditing && (
                <span className='ml-2 sm:ml-3 px-2 sm:px-3 py-1 sm:py-1.5 bg-primary/10 text-primary rounded-[5px] t-r-12 sm:t-r-14 border border-primary/40 animate-pulse'>
                  수정 중
                </span>
              )}
            </DialogTitle>
          </DialogHeader>

          <div className='flex-1 overflow-y-auto px-4 sm:px-8 pb-4'>
            <div className='flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 min-h-[400px] sm:min-h-[500px]'>
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

          <div className='px-4 sm:px-6 pb-4 sm:pb-6'>
            {(role === 'ADMIN' || userNo === selectedReview.userNo) && (
              <ReviewsModalActions
                isEditing={isEditing}
                handleCancelClick={handleCancelClick}
                handleConfirmClick={handleConfirmClick}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
