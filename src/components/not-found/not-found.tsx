import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className='min-h-screen-vh mt-15 flex flex-col items-center justify-center'>
      <div className='w-full max-w-[1260px] px-5 xl:px-0 text-center'>
        {/* <div className='text-[112px] animate-bounce'>🚧</div> */}
        <img
          src='/images/404.png'
          alt='404 Error'
          className='mx-auto md:w-[213px] w-[150px] h-auto'
        />

        <h1 className='t-b-52 mb-4'>404 Error</h1>
        <p className='md:text-r-16 text-gray mb-12 whitespace-pre-line'>
          요청하신 페이지를 찾을 수 없습니다.
          <br />
          입력하신 주소가 정확한지 다시 한번 확인해주세요.
        </p>

        <Button size='lg' onClick={() => navigate('/')}>
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
}
