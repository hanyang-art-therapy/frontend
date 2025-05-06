import { Button } from '@/components/ui/button';
import NotFoundLottie from '@/lottie/not-found/lottie';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div>
      <NotFoundLottie />

      <Button onClick={() => navigate('/')}>홈으로 돌아가기</Button>
    </div>
  );
}
