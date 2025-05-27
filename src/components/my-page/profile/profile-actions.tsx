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
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

export default function AccountActions() {
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
    <div className='md:mt-[15px] justify-end t-m-14 md:mr-[20px] flex gap-[15px] md:gap-[30px] md:pr-0 pr-4 '>
      <Link
        to='/my-page/reset-pw'
        className='text-gray-3 underline cursor-pointer'>
        비밀번호 변경
      </Link>

      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger className='text-gray-3 underline cursor-pointer'>
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
              className='text-black'>
              계속 이용하기
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
