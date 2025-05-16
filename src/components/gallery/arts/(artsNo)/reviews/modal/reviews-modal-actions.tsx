import { Button } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/store/auth';

type ReviewsModalActionsProps = {
  isEditing: boolean;
  handleConfirmClick: () => void;
  handleEditClick: () => void;
  handleDeleteClick: () => void;
};

export default function ReviewsModalActions({
  isEditing,
  handleConfirmClick,
  handleEditClick,
  handleDeleteClick,
}: ReviewsModalActionsProps) {
  const { userNo } = useAuthStore();

  return (
    <div className='flex gap-2 items-end sm:justify-end justify-center'>
      <DialogClose asChild>
        <Button
          variant='outline'
          size='default'
          className='w-[80px] h-[36px] py-[14px] px-3 t-r-18 md:h-[40px] md:w-[80px] md:py-[14px] rounded-full'>
          닫기
        </Button>
      </DialogClose>

      {isEditing ? (
        <Button
          onClick={handleConfirmClick}
          variant='secondary'
          className={cn(
            'w-[80px] h-[36px] py-[14px] px-3 t-r-18 md:h-[40px] md:w-[80px] md:py-[14px] rounded-full',
            !userNo && 'hidden'
          )}>
          확인
        </Button>
      ) : (
        <Button
          onClick={handleEditClick}
          variant='secondary'
          className={cn(
            'w-[80px] h-[36px] py-[14px] px-3 t-r-18 md:h-[40px] md:w-[80px] md:py-[14px] rounded-full',
            !userNo && 'hidden'
          )}>
          수정
        </Button>
      )}

      {!isEditing && (
        <Button
          onClick={handleDeleteClick}
          variant='destructive'
          className={cn(
            'w-[80px] h-[36px] py-[14px] px-3 t-r-18 text-white md:h-[40px] md:w-[80px] md:py-[14px] rounded-full',
            !userNo && 'hidden'
          )}>
          삭제
        </Button>
      )}
    </div>
  );
}
