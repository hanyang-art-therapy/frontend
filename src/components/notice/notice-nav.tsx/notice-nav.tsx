import { Button } from '@/components/ui/button';
import { Home, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NoticeNavProps {
  noticeNo?: string;
}

export default function NoticeNav({ noticeNo }: NoticeNavProps) {
  const navigate = useNavigate();

  const currentNo = noticeNo ? Number(noticeNo) : 0;
  const MAX_NOTICE_NO = 9;

  const handlePrevClick = () => {
    if (currentNo > 1) {
      const prevNoticeNo = (currentNo - 1).toString();
      navigate(`/notice/${prevNoticeNo}`);
    }
  };

  const handleNextClick = () => {
    if (currentNo < MAX_NOTICE_NO) {
      const nextNoticeNo = (currentNo + 1).toString();
      navigate(`/notice/${nextNoticeNo}`);
    }
  };

  const handleHomeClick = () => {
    navigate('/notice');
  };

  return (
    <div className='justify-center gap-4 grid grid-cols-3'>
      {currentNo > 1 && (
        <Button
          variant='outline'
          className='col-span-1 group transition-colors duration-200 xl:w-[200px] md:w-[120px] w-[96px] h-[32px] md:h-[46px]'
          onClick={handlePrevClick}
        >
          <div className='group-hover:-translate-x-1 transition-transform duration-500'>
            <ArrowLeft size={20} />
          </div>
          <span className='t-r-16 group-hover:-translate-x-1 transition-transform duration-500'>
            이전 글
          </span>
        </Button>
      )}

      {/* 홈 버튼 */}
      <Button
        variant='outline'
        className='col-span-1 transition-colors duration-200 xl:w-[200px] md:w-[120px] w-[96px] hover:bg-primary hover:text-white h-[32px] md:h-[46px]'
        onClick={handleHomeClick}
      >
        <Home size={20} />
        <span className='t-r-16 group-hover:scale-110'>홈</span>
      </Button>

      {currentNo > 0 && MAX_NOTICE_NO && (
        <Button
          variant='outline'
          className='group transition-colors duration-200 xl:w-[200px] md:w-[120px] w-[96px] h-[32px] md:h-[46px] col-span-1'
          onClick={handleNextClick}
        >
          <span className='t-r-16 group-hover:translate-x-1 transition-transform duration-500'>
            다음 글
          </span>
          <div className='group-hover:translate-x-1 transition-transform duration-500'>
            <ArrowRight size={20} />
          </div>
        </Button>
      )}
    </div>
  );
}
