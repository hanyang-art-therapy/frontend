import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getNotices } from '@/apis/notice/notice';

type NoticeNavProps = {
  noticeNo?: string;
  totalCount?: number;
};

export default function NoticeNav({ noticeNo, totalCount }: NoticeNavProps) {
  const navigate = useNavigate();
  const [maxNoticeNo, setMaxNoticeNo] = useState<number>(0);
  const currentNo = noticeNo ? Number(noticeNo) : 0;

  useEffect(() => {
    // totalCount가 있으면 그것을 사용, 없으면 API로 가져오기
    if (totalCount && totalCount > 0) {
      setMaxNoticeNo(totalCount);
    } else {
      const fetchTotalNotices = async () => {
        try {
          const response = await getNotices({ page: 1 });
          const total = response.totalElements || response.totalCount || 0;
          setMaxNoticeNo(total);
        } catch (err) {
          console.error('전체 공지사항 수 불러오기 실패:', err);
        }
      };

      fetchTotalNotices();
    }
  }, [totalCount]);

  const handlePrevClick = () => {
    if (currentNo > 1) {
      const prevNoticeNo = (currentNo - 1).toString();
      navigate(`/notice/${prevNoticeNo}`);
    }
  };

  const handleNextClick = () => {
    if (currentNo > maxNoticeNo) {
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

      <Button
        variant='outline'
        className='col-span-1 transition-colors duration-200 xl:w-[200px] md:w-[120px] w-[96px] hover:bg-primary hover:text-white h-[32px] md:h-[46px]'
        onClick={handleHomeClick}
      >
        <Home size={20} />
        <span className='t-r-16 group-hover:scale-110'>홈</span>
      </Button>

      {currentNo > maxNoticeNo && (
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
