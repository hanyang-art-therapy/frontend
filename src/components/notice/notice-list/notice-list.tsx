import { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileText, Volume2 } from 'lucide-react';
import { getNotices } from '@/apis/notice/notice';
import { GetNoticesResponse } from '@/types/notice/notice';
import { Button } from '@/components/ui/button';
import NoticeTable, {
  Notice,
} from '@/components/notice/notice-list/notice-table';
import { NoticeSearch } from '@/components/notice/notice-search/notice-search';
import { toast } from 'sonner';
import { handleApiError } from '@/components/common/error-handler';

export default function NoticeList() {
  const [fetchedNotices, setFetchedNotices] =
    useState<GetNoticesResponse | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [pageNumber, setPageNumber] = useState(1);
  const [actualNoticeCount, setActualNoticeCount] = useState<number>(0);
  const [isCountLoading, setIsCountLoading] = useState(true);

  const handleWriteClick = () => {
    navigate('/notice/write');
  };

  const fetchNotices = useCallback(async () => {
    setIsCountLoading(true);
    // 서버 응답 확인
    try {
      const response = await getNotices({
        page: pageNumber,
      });
      if (response) {
        setFetchedNotices(response);

        const totalCount = response.totalElements || response.totalCount || 0;
        setActualNoticeCount(totalCount);
      } else {
        console.warn('API 응답이 null입니다');
        setFetchedNotices(null);
        setActualNoticeCount(0);
      }
    } catch (error) {
      toast.error(handleApiError(error));
      setFetchedNotices(null);
      setActualNoticeCount(0);
    } finally {
      setIsCountLoading(false);
    }
  }, [pageNumber]);

  useEffect(() => {
    fetchNotices();
  }, [pageNumber, location.key, fetchNotices]);

  useEffect(() => {
    if (location.state?.refresh) {
      fetchNotices();
    }
  }, [location.state, fetchNotices]);

  const handlePageChange = (newPage: number) => {
    setPageNumber(newPage);
  };

  const noticeData: Notice[] = Array.isArray(fetchedNotices?.content)
    ? (fetchedNotices.content as unknown as Notice[])
    : [];

  return (
    <div className='min-h-screen-vh mt-[10px] md:mt-[30px] flex flex-col items-center justify-start'>
      <div className='flex flex-col justify-start items-start w-full xl:px-0'>
        <div className='flex justify-start items-center pb-[20px] gap-2 w-full text-start'>
          <div className='p-3 rounded-[5px] w-[40px] h-[40px] flex justify-center items-center text-white bg-secondary'>
            <Volume2 size={30} strokeWidth={2} />
          </div>
          <strong className='p-2 text-btn-dark-3 t-b-32'>공지사항</strong>
        </div>
        <div className='p-4 bg-bg-gray-fa rounded t-r-16 flex-1 w-full'>
          본 게시판은 미술치료학과의 학사, 실습, 전시, 행사 등과 관련된 주요
          공지사항을 안내합니다. 일정 확인 및 필수 제출 서류 등은 수시로
          확인해주세요.
        </div>
      </div>

      <div className='w-full text-center'>
        <NoticeSearch />
        <div className='flex flex-col'>
          {Array.isArray(noticeData) && noticeData.length > 0 && (
            <strong className='flex justify-start items-center pb-[12px] gap-1 t-b-16'>
              <FileText size={16} strokeWidth={1.5} />총{' '}
              {isCountLoading ? (
                <span className='animate-pulse'>계산중...</span>
              ) : (
                actualNoticeCount
              )}
              개의 게시물
            </strong>
          )}

          <NoticeTable
            data={noticeData}
            totalCount={actualNoticeCount}
            onPageChange={handlePageChange}
            currentPage={pageNumber}
          />

          <div className='flex w-full justify-center items-center'>
            <Button
              type='button'
              onClick={handleWriteClick}
              className='h-[30px] md:h-[40px] w-[80px] md:w-[120px] mt-[30px]'
            >
              글쓰기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
