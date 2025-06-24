import { getNotices } from '@/apis/notice/notice';
import { handleApiError } from '@/components/common/error-handler';
import NoticeTable from '@/components/notice/content/notice-table';
import NoticeNoData from '@/components/notice/notice-noresult/notice-no-data';
import { Button } from '@/components/ui/button';
import Pagination from '@/components/ui/pagination';
import { getEgType } from '@/lib/helper/notice';
import { GetNoticesResponse } from '@/types/notice/notice';
import { FileText } from 'lucide-react';
import type { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type NoticeTableProps = {
  notices: GetNoticesResponse;
  filter: string;
  searchValue: string;
  setNotices: Dispatch<SetStateAction<GetNoticesResponse>>;
};

export default function NoticeList({
  notices,
  filter,
  searchValue,
  setNotices,
}: NoticeTableProps) {
  const navigate = useNavigate();
  const { content, totalElements } = notices;

  if (totalElements === 0) {
    return <NoticeNoData />;
  }

  const handlePageChange = async (page: number) => {
    try {
      const response = await getNotices({
        page,
        category: getEgType(filter),
        keyword: searchValue,
      });

      setNotices(response);
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    }
  };

  return (
    <div className='flex flex-col w-full'>
      <strong className='flex justify-start items-center pb-[12px] gap-1 t-b-16'>
        <FileText size={16} strokeWidth={1.5} />총 {totalElements || 0}
        개의 게시물
      </strong>

      <div className='w-full overflow-x-auto'>
        <NoticeTable notices={content} />
      </div>

      <Button
        type='button'
        onClick={() => navigate('/notice/write')}
        className='h-[30px] md:h-[40px] w-[80px] md:w-[120px] mt-[30px] ml-auto'
      >
        글쓰기
      </Button>

      <Pagination
        currentPage={notices.page + 1}
        totalPages={notices.totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
