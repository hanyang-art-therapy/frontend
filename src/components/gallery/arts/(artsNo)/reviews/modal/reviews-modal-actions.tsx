'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth';
import { Check, Edit, RotateCcw, Trash } from 'lucide-react';

type ReviewsModalActionsProps = {
  isEditing: boolean;
  handleCancelClick: () => void;
  handleConfirmClick: () => void;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
};

export default function ReviewsModalActions({
  isEditing,
  handleCancelClick,
  handleConfirmClick,
  handleEditClick,
  handleDeleteClick,
}: ReviewsModalActionsProps) {
  const { userNo } = useAuthStore();

  return (
    <div className='flex gap-4 items-center justify-end'>
      {isEditing ? (
        <>
          <Button
            onClick={handleCancelClick}
            variant='outline'
            size='sm'
            autoFocus={false}
            className={cn(
              'transition-all duration-200 hover:scale-105 group text-black',
              userNo && 'hidden'
            )}
          >
            <RotateCcw />
            취소
          </Button>
          <Button
            onClick={handleConfirmClick}
            variant='secondary'
            size='sm'
            autoFocus={false}
            className={cn(
              'bg-primary hover:bg-primary/80 border-0 transition-all duration-200 hover:scale-105 group',
              userNo && 'hidden'
            )}
          >
            <Check className='w-4 h-4 group-hover:scale-110 transition-transform duration-200' />
            확인
          </Button>
        </>
      ) : (
        <Button
          onClick={handleEditClick}
          variant='default'
          size='sm'
          autoFocus={false}
          className={cn(
            'flex items-center gap-2 transition-all duration-200 hover:scale-105 group',
            userNo && 'hidden'
          )}
        >
          <Edit className='w-4 h-4 group-hover:rotate-12 transition-transform duration-200' />
          수정
        </Button>
      )}

      {!isEditing && (
        <Button
          onClick={handleDeleteClick}
          variant='destructive'
          size='sm'
          autoFocus={false}
          className={cn(
            'flex items-center gap-2 bg-destructive hover:bg-destructive/80 transition-all duration-200 hover:scale-105 group',
            userNo && 'hidden'
          )}
        >
          <Trash className='w-4 h-4 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-200' />
          삭제
        </Button>
      )}
    </div>
  );
}
