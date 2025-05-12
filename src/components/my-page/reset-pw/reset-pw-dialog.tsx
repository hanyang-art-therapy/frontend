import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type ResetPwDialogProps = {
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
};

export default function ResetPwDialog({
  isDialogOpen,
  setIsDialogOpen,
}: ResetPwDialogProps) {
  const navigate = useNavigate();

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>변경 완료</AlertDialogTitle>
          <AlertDialogDescription>
            <p>비밀번호 변경이 완료되었습니다.</p>
            <p>변경하신 비밀번호로 로그인해주세요.</p>
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
