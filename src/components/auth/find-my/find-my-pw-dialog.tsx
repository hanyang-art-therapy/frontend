import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useNavigate } from 'react-router-dom';

type FindMyPwDialogProps = {
  isPwDialogOpen: boolean;
  setIsPwDialogOpen: (isPwDialogOpen: boolean) => void;
};

export default function FindMyPwDialog({
  isPwDialogOpen,
  setIsPwDialogOpen,
}: FindMyPwDialogProps) {
  const navigate = useNavigate();

  return (
    <AlertDialog open={isPwDialogOpen} onOpenChange={setIsPwDialogOpen}>
      <AlertDialogContent className='sm:max-w-[425px]'>
        <AlertDialogHeader>
          <AlertDialogTitle>임시 비밀번호 전송</AlertDialogTitle>
          <AlertDialogDescription>
            임시 비밀번호를 전송하였습니다. 작성한 이메일로 임시 비밀번호를
            확인해주세요.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <Button className='w-full' onClick={() => navigate('/sign-in')}>
            로그인 페이지로 이동
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
