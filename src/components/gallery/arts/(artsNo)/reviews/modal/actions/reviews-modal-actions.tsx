import ReviewsModalActionsButton from '@/components/gallery/arts/(artsNo)/reviews/modal/actions/reviews-modal-actions-button';
import { Ban, Check, Edit, RotateCcw, Trash } from 'lucide-react';

type ReviewsModalActionsProps = {
  isEditing: boolean;
  role: string | null;
  userNo: number | null;
  selectedReviewUserNo: number | null;
  handleCancelClick: () => void;
  handleConfirmClick: () => void;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
  handleBanClick: () => void;
};

export default function ReviewsModalActions({
  isEditing,
  role,
  userNo,
  selectedReviewUserNo,
  handleCancelClick,
  handleConfirmClick,
  handleEditClick,
  handleDeleteClick,
  handleBanClick,
}: ReviewsModalActionsProps) {
  const isAdmin = role === 'ADMIN';
  const isMyReview = userNo === selectedReviewUserNo;

  return (
    <div className='flex gap-6 items-center justify-center'>
      {isEditing ? (
        <>
          <ReviewsModalActionsButton
            icon={<RotateCcw className='w-5 h-5' />}
            name='취소'
            onClick={handleCancelClick}
          />
          <ReviewsModalActionsButton
            icon={<Check className='w-5 h-5' />}
            name='확인'
            onClick={handleConfirmClick}
          />
        </>
      ) : (
        isAdmin && (
          <ReviewsModalActionsButton
            icon={<Edit className='w-5 h-5' />}
            name='수정'
            onClick={handleEditClick}
          />
        )
      )}

      {!isEditing && isMyReview && userNo && (
        <ReviewsModalActionsButton
          icon={<Trash className='w-5 h-5' />}
          name='삭제'
          onClick={handleDeleteClick}
        />
      )}

      {isAdmin && (
        <ReviewsModalActionsButton
          icon={<Ban className='w-5 h-5' />}
          name='정지'
          onClick={handleBanClick}
        />
      )}
    </div>
  );
}
