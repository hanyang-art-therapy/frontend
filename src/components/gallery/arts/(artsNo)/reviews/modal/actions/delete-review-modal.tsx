import { Button } from '@/components/ui/button';

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
  if (!isDeleteDialogOpen) return null;

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <div
      className='fixed inset-0 bg-black/50 flex items-center justify-center z-10'
      onClick={handleModalClick}
    >
      <div className='bg-white rounded-lg p-6 w-full max-w-[400px] mx-5 '>
        <h3 className='t-b-18 mb-2'>리뷰 삭제</h3>
        <p className='text-gray-6 t-r-14 mb-10'>
          정말 해당 리뷰를 삭제하시겠습니까?
        </p>

        <div className='flex gap-3 justify-end'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => setIsDeleteDialogOpen(false)}
            className='text-black'
          >
            취소
          </Button>
          <Button size='sm' onClick={handleDeleteConfirm} variant='destructive'>
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
