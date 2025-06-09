import { withdraw } from '@/apis/my-page/profile';
import { handleApiError } from '@/components/common/error-handler';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function WithdrawDialog() {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleWithdraw = async () => {
    try {
      await withdraw();

      setIsOpen(false);
      navigate('/');
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger className='text-gray-3 underline cursor-pointer t-r-16'>
        회원 탈퇴
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>회원 탈퇴</AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription>
          회원 탈퇴 후 복구가 불가능합니다. 그래도 탈퇴하시겠습니까?
        </AlertDialogDescription>
        <AlertDialogFooter className='ml-auto mt-4'>
          <Button onClick={handleWithdraw} size='sm' variant='destructive'>
            탈퇴
          </Button>
          <Button
            onClick={() => setIsOpen(false)}
            size='sm'
            variant='outline'
            className='text-black'
          >
            계속 이용하기
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
