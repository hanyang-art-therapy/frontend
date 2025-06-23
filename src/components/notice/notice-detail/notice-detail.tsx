import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { toast } from 'sonner';
import { Download, Volume2 } from 'lucide-react';
import { formatTimeStamp } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { GetNoticeResponse } from '@/types/notice/notice';
import { deleteNotice, getNotice } from '@/apis/notice/notice';
import NoticeNav from '@/components/notice/notice-nav.tsx/notice-nav';
import NoticeNoResult from '@/components/notice/notice-noresult/notice-no-result';

const getType = (category: string) => {
  switch (category) {
    case 'GENERAL':
      return '일반';
    case 'PRACTICE':
      return '실습';
    case 'RECRUIT':
      return '모집';
    case 'EXHIBITION':
      return '전시';
    case 'ACADEMIC':
      return '학술';
    default:
      return '';
  }
};

export default function NoticeDetail() {
  const [noticeContents, setNoticeContents] =
    useState<GetNoticeResponse | null>(null);
  const { noticeNo } = useParams();
  const navigate = useNavigate();
  const authStore = useAuthStore();
  const role = authStore.role || 'ADMIN';
  const location = useLocation();
  const totalCount = location.state?.totalCount as number | undefined;

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const fetchNoticeContents = async () => {
      const response = await getNotice({ noticeNo: parseInt(noticeNo ?? '1') });
      setNoticeContents(response);
    };

    fetchNoticeContents();
  }, [noticeNo]);

  const handleDelete = async () => {
    // 관리자 권한 확인
    if (role !== 'ADMIN') {
      toast.error('관리자만 삭제할 수 있습니다.');
      return;
    }

    try {
      await deleteNotice({ noticeNo: parseInt(noticeNo ?? '1') });
      toast.success('게시글 삭제가 완료되었습니다.');
      navigate('/notice');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleEdit = () => {
    // 관리자 권한 확인
    if (role !== 'ADMIN') {
      toast.error('관리자만 수정할 수 있습니다.');
      return;
    }

    navigate(`/notice/${noticeNo}/edit`);
  };

  if (!noticeContents) return <NoticeNoResult />;

  return (
    <div className='w-full h-full mt-[80px] md:mt-[120px]'>
      <div className='w-full max-w-[1260px] mx-auto px-5'>
        <div className='flex justify-start items-center pb-[20px] gap-2'>
          <div className='p-3 rounded-[5px] w-[40px] h-[40px] flex justify-center items-center text-white bg-btn-dark-3'>
            <Volume2 size={40} strokeWidth={2} />
          </div>
          <strong className='p-2 text-btn-dark-3 t-b-32'>공지사항</strong>
        </div>
      </div>
      <div className='flex flex-col items-center justify-center w-full max-w-[1260px] mx-auto'>
        <div className='w-full md:h-[140px] xl:px-0 border-t-2 py-[10px] text-start'>
          <div className='flex flex-col gap-4 mt-2 t-r-16 px-[20px]'>
            <h1 className='t-b-32 font-bold'>{noticeContents.title}</h1>
            <div className='md:flex md:flex-row t-r-14 md:p-[10px] flex gap-2 md:gap-4 flex-wrap'>
              <div className='flex items-center gap-2 w-1.5/2 md:w-auto t-r-16'>
                <strong className='text-btn-gray-9'>구분</strong>
                {getType(noticeContents.category)}
                <strong className='text-btn-gray-9'>작성일</strong>
                {formatTimeStamp(noticeContents.createdAt)}
              </div>

              <div className='flex items-center gap-2 w-1.5/2 md:w-auto t-r-16'>
                <strong className='text-btn-gray-9'>기간</strong>
                {noticeContents.periodStart
                  ? formatTimeStamp(noticeContents.periodStart)
                  : '기간 없음'}
                ~
                {noticeContents.periodEnd
                  ? formatTimeStamp(noticeContents.periodEnd)
                  : '기간 없음'}
                <strong className='text-btn-gray-9'>조회수</strong>
                {noticeContents.viewCount}
              </div>
            </div>
          </div>
        </div>

        {/* 본문 내용 */}
        <div className='w-full h-auto min-h-[300px] p-[20px] md:p-[30px] relative'>
          <div
            className='mt-2 t-r-16 leading-relaxed prose prose-sm md:prose-base max-w-none'
            dangerouslySetInnerHTML={{ __html: noticeContents.content }}
          />
          {role === 'ADMIN' && (
            <div className='flex gap-4 mt-4 justify-end items-end absolute bottom-4 right-4'>
              <Button
                onClick={handleEdit}
                className='h-[20px] w-[80px] t-r-16 bg-bg-primary/50 hover:bg-primary text-white rounded-sm'
              >
                수정
              </Button>

              <Button
                onClick={handleDelete}
                className='h-[20px] w-[80px] t-r-16 bg-bg-secondary/50 hover:bg-bg-secondary text-white rounded-sm'
              >
                삭제
              </Button>
            </div>
          )}
        </div>

        {/* 파일 */}
        <div className='w-full h-auto md:px-5 py-4 md:py-6 border-t flex flex-col gap-2 bg-bg-gray-fa'>
          <div className='px-6 flex flex-col gap-4'>
            <div className='flex flex-col gap-2 t-r-16'>
              {noticeContents.files && noticeContents.files.length > 0 ? (
                noticeContents.files.map((file, index) => (
                  <div
                    key={index}
                    className='flex items-center gap-2 cursor-pointer w-max border-b border-transparent hover:border-b hover:border-[text-gray-6]'
                  >
                    <div className='bg-bg-primary w-[20px] h-[20px] md:w-[22px] md:h-[22px] rounded-xs flex justify-center items-center'>
                      <Download size={16} color='white' strokeWidth={2} />
                    </div>
                    <a
                      href={file.url}
                      target='_blank'
                      className='text-bg-secondary hover:underline'
                    >
                      {file.name}
                    </a>
                  </div>
                ))
              ) : (
                <div>첨부된 파일이 없습니다.</div>
              )}
            </div>
          </div>
        </div>
        {/* 이전글과 다음글 */}
        <div className='w-full px-5 xl:px-0 py-6 border-t t-r-16 flex justify-center'>
          {noticeContents && (
            <NoticeNav noticeNo={noticeNo ?? ''} totalCount={totalCount} />
          )}
        </div>
      </div>
    </div>
  );
}
