import { deleteReview, patchReview } from '@/apis/art/review';
import { handleApiError } from '@/components/common/error-handler';
import ReviewsModalActions from '@/components/gallery/arts/(artsNo)/reviews/modal/reviews-modal-actions';
import ReviewsModalImage from '@/components/gallery/arts/(artsNo)/reviews/modal/reviews-modal-image';
import ReviewsModalTextArea from '@/components/gallery/arts/(artsNo)/reviews/modal/reviews-modal-textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { ArtReview } from '@/types/gallery/review';
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
};

export default function ReviewsModal({
  artsNo,
  artName,
  isDialogOpen,
  setIsDialogOpen,
  selectedReview,
  setSelectedReview,
}: ReviewsModalProps) {
  const imageUrl = selectedReview.files?.[0]?.url;

  const [editedText, setEditedText] = useState(selectedReview.reviewText);
  const [isEditing, setIsEditing] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleConfirmClick = async () => {
    setIsEditing(false);
    setIsButtonVisible(true);

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

      toast.success('리뷰가 삭제되었습니다.');
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter' || e.shiftKey) return;

    handleConfirmClick();
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className='max-w-[80vw] md:max-w-[90vw] xl:max-w-[80vw] w-full gap-10 md:gap-15 h-auto max-h-[90vh] pl-5 pb-5 pr-5 pt-10 xl:p-10 overflow-y-auto'>
        <DialogHeader className='flex flex-row gap-4 max-h-[24px]'>
          <DialogTitle className='t-m-24'>
            {selectedReview.userName ?? '익명'}의{' '}
            <b className='font-bold'>{artName}</b> 작품 리뷰{' '}
            {isEditing && '수정'}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className='flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-[60px]'>
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

        {/* 수정 버튼, 삭제 버튼 */}
        {isButtonVisible && (
          <ReviewsModalActions
            isEditing={isEditing}
            handleConfirmClick={handleConfirmClick}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
