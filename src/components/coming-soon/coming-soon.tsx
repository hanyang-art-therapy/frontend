import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export function ComingSoonPage() {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen-vh mt-15 flex flex-col items-center justify-center'>
      <div className='w-full max-w-[1260px] px-5 xl:px-0 text-center'>
        <h1 className='t-b-52 mb-4'>
          COMING SOON <span className='whitespace-nowrap'>...💻🔨</span>
        </h1>
        <p className='md:text-r-16 text-gray mb-12 whitespace-pre-line'>
          현재 해당 페이지는 준비중입니다.
          <br />곧 멋진 모습으로 찾아뵐게요!
        </p>
        <Button size='lg' onClick={() => navigate('/')}>
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
