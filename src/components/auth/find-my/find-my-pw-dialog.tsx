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
  isDialogOpen: boolean;
  setIsDialogOpen: (isDialogOpen: boolean) => void;
  foundId: string | null;
};

export default function FindMyPwDialog({
  isDialogOpen,
  setIsDialogOpen,
  foundId,
}: FindMyPwDialogProps) {
  const navigate = useNavigate();

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent className='md:max-w-[500px]'>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {foundId ? '아이디 찾기 결과' : '임시 비밀번호 전송'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {foundId ? (
              <span className='flex flex-col'>
                <span>찾으시는 아이디는 다음과 같습니다.</span>
                <span className='text-primary t-m-18 text-center py-12'>
                  {foundId}
                </span>
              </span>
            ) : (
              <span>
                임시 비밀번호를 전송하였습니다. 작성한 이메일로 임시 비밀번호를
                확인해주세요.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className='flex flex-row justify-center'>
          <Button className='w-1/2 t-b-18' onClick={() => navigate('/sign-in')}>
            로그인 페이지로 이동
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
