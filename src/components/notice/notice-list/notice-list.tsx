import { useNavigate } from 'react-router-dom';

import NoticeTable from './notice-table';
import { Button } from '@/components/ui/button';
import { FileText, Volume2 } from 'lucide-react';
import { NoticeSearch } from '../notice-search/notice-search';
import { useEffect, useState } from 'react';
import { getNotices } from '@/apis/notice/notice';
// import { Notice } from '@/types';
import { GetNoticesResponse } from '@/types/notice/notice';

export default function NoticeList() {
  const [fetchedNotices, setFetchedNotices] =
    useState<GetNoticesResponse | null>(null);
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);

  const handleWriteClick = () => {
    navigate('/notice/write');
  };

  useEffect(() => {
    const fetchNotices = async () => {
      const response = await getNotices({
        page: pageNumber,
      });

      setFetchedNotices(response);
    };

    fetchNotices();
  }, []);

  return (
    <div className='min-h-screen-vh mt-[10px] md:mt-[30px] flex flex-col items-center justify-start'>
      <div className='flex flex-col justify-start items-start w-full xl:px-0'>
        <div className='flex justify-start items-center pb-[20px] gap-2 w-full'>
          <div className='p-3 rounded-[5px] w-[40px] h-[40px] flex justify-center  items-center text-white bg-secondary'>
            <Volume2 size={30} strokeWidth={2} />
          </div>
          <strong className='p-2 text-[#666] font-medium t-b-32'>
            공지사항
          </strong>
        </div>
        <div className='p-4 bg-bg-gray-100 rounded text-sm t-r-16 flex-1 min-w-0'>
          본 게시판은 미술치료학과의 학사, 실습, 전시, 행사 등과 관련된 주요
          공지사항을 안내합니다. 일정 확인 및 필수 제출 서류 등은 수시로
          확인해주세요.
        </div>
      </div>
      <div className='w-full text-center'>
        <NoticeSearch />
        <div className='flex flex-col'>
          <strong className='flex justify-start items-center pb-[12px] gap-1 t-b-16'>
            <FileText size={16} strokeWidth={1.5} />총 10개의 게시물
          </strong>
          <NoticeTable data={fetchedNotices} />
          <div className='flex w-full justify-center items-center'>
            <Button
              type='button'
              onClick={handleWriteClick}
              className='h-[30px] md:h-[40px] w-[80px]  md:w-[120px] mt-[30px]'
            >
              글쓰기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
