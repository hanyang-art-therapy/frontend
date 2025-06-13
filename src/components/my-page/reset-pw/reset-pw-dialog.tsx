import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { signOut } from '@/apis/auth/sign-out';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '@/components/common/error-handler';
import { toast } from 'sonner';

type ResetPwDialogProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
};

export default function ResetPwDialog({
  isDialogOpen,
  setIsDialogOpen,
}: ResetPwDialogProps) {
  const navigate = useNavigate();

  const handleOkButtonClick = async () => {
    try {
      await signOut();
      navigate('/sign-in');
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    } finally {
      setIsDialogOpen(false);
    }
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>변경 완료</AlertDialogTitle>
          <AlertDialogDescription>
            <span className='inline-block'>
              <span className='block'>비밀번호 변경이 완료되었습니다.</span>
              <span className='block mt-2'>
                변경하신 비밀번호로 로그인해주세요.
              </span>
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <Button className='w-full' onClick={handleOkButtonClick}>
            로그인 페이지로 이동
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
