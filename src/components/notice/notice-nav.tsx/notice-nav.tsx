import { Button } from '@/components/ui/button';
import type { NoticeNav } from '@/types/notice/notice';
import { AlignJustify, ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type NoticeNavProps = {
  noticeNo?: string;
  next?: NoticeNav;
  prev?: NoticeNav;
};

export default function NoticeNav({ next, prev }: NoticeNavProps) {
  const navigate = useNavigate();

  return (
    <div className='flex gap-2'>
      {/* 이전 글 버튼 (왼쪽) */}
      <div className='flex justify-start'>
        {next && (
          <Button
            variant='outline'
            className='group transition-colors duration-200 xl:w-[200px] md:w-[120px] w-[96px]'
            onClick={() => navigate(`/notice/${next.noticeNo}`)}
          >
            <div className='group-hover:-translate-x-1 transition-transform duration-500'>
              <ArrowLeft size={20} />
            </div>
            <span className='t-r-16 group-hover:-translate-x-1 transition-transform duration-500'>
              이전 글
            </span>
          </Button>
        )}
      </div>

      {/* 목록 버튼 (중앙) */}
      <div className='flex justify-center'>
        <Button
          variant='outline'
          className='transition-colors duration-200 xl:w-[200px] md:w-[120px] w-[96px]'
          onClick={() => navigate('/notice')}
        >
          <AlignJustify size={20} />
          <span className='t-r-16 group-hover:scale-110'>목록</span>
        </Button>
      </div>

      {/* 다음 글 버튼 (오른쪽) */}

      {prev && (
        <Button
          variant='outline'
          className='group transition-colors duration-200 xl:w-[200px] md:w-[120px] w-[96px]'
          onClick={() => navigate(`/notice/${prev.noticeNo}`)}
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
