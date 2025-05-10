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
import { useState } from 'react';

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

  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    if (foundId) {
      navigator.clipboard.writeText(foundId);
      setIsCopied(true);
    }
  };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent className='md:max-w-[500px]'>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {foundId ? '아이디 찾기 결과' : '임시 비밀번호 전송'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {foundId ? (
              <div className='flex flex-col'>
                찾으시는 아이디는 다음과 같습니다.{' '}
                <span className='text-primary title-b-18 text-center py-12'>
                  {foundId}
                </span>
              </div>
            ) : (
              '임시 비밀번호를 전송하였습니다. 작성한 이메일로 임시 비밀번호를 확인해주세요.'
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className='flex flex-row'>
          {foundId && (
            <Button
              variant='secondary'
              className='w-1/2 md:title-b-18 title-b-14'
              disabled={isCopied}
              onClick={handleCopyToClipboard}>
              {isCopied ? '복사 완료' : '클립보드에 복사'}
            </Button>
          )}

          <Button
            className='w-1/2 md:title-b-18 title-b-14'
            onClick={() => navigate('/sign-in')}>
            로그인 페이지로 이동
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
