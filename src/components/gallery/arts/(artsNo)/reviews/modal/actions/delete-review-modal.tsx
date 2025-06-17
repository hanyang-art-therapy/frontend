import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type DeleteReviewModalProps = {
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (isDeleteDialogOpen: boolean) => void;
  handleDeleteConfirm: () => void;
};

export default function DeleteReviewModal({
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  handleDeleteConfirm,
}: DeleteReviewModalProps) {
  return (
    <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
      <AlertDialogContent className='gap-[30px]'>
        <AlertDialogHeader>
          <AlertDialogTitle>리뷰 삭제</AlertDialogTitle>
          <AlertDialogDescription>
            정말 해당 리뷰를 삭제하시겠습니까?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className='ml-auto flex-row'>
          <AlertDialogCancel className='w-[80px] t-r-16'>
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            className='w-[80px] t-r-16'
            onClick={handleDeleteConfirm}
          >
            삭제
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
