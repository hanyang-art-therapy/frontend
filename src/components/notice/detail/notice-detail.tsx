import { deleteNotice, getNotice } from '@/apis/notice/notice';
import { handleApiError } from '@/components/common/error-handler';
import NoticeNav from '@/components/notice/notice-nav.tsx/notice-nav';
import NoticeNoResult from '@/components/notice/notice-noresult/notice-no-result';
import { Button } from '@/components/ui/button';
import { getKoType } from '@/lib/helper/notice';
import { formatTimeStamp } from '@/lib/utils';
import { useAuthStore } from '@/store/auth';
import { GetNoticeResponse } from '@/types/notice/notice';
import { Download, Volume2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function NoticeDetail() {
  const [noticeContent, setNoticeContent] = useState<GetNoticeResponse | null>(
    null
  );
  const [isDeleting, setIsDeleting] = useState(false);

  const { noticeNo } = useParams();
  const { role } = useAuthStore.getState();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const fetchNoticeContents = async () => {
      const response = await getNotice({ noticeNo: parseInt(noticeNo ?? '1') });

      setNoticeContent(response);
    };

    fetchNoticeContents();
  }, [noticeNo]);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const response = await deleteNotice({
        noticeNo: parseInt(noticeNo ?? '1'),
      });

      toast.success(response.message);
      navigate('/notice');
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!noticeContent) return <NoticeNoResult />;

  return (
    <div className='w-full h-full mt-[80px] md:mt-[120px]'>
      <div className='w-full max-w-[1260px] mx-auto px-5'>
        <div className='flex justify-start items-center pb-[20px] gap-2'>
          <div className='p-3 rounded-[5px] w-[40px] h-[40px] flex justify-center items-center text-white bg-bg-secondary'>
            <Volume2 size={40} strokeWidth={2} />
          </div>
          <strong className='p-2 text-bg-black t-b-32'>공지사항</strong>
        </div>
        <div className='w-full border-t-1  border-t-bg-gray-d'></div>
      </div>

      <div className='flex flex-col items-center justify-center w-full max-w-[1260px] mx-auto'>
        <div className='w-full md:h-[140px] xl:px-0 py-[10px] text-start'>
          <div className='flex flex-col gap-4 mt-2 t-r-16 px-[20px]'>
            <h1 className='t-b-32 font-bold'>{noticeContent.title}</h1>
            <div className='md:flex md:flex-row t-r-14 md:p-[10px] flex gap-2 md:gap-4 flex-wrap'>
              <div className='flex items-center gap-2 w-1.5/2 md:w-auto t-r-16'>
                <strong className='text-btn-dark-3'>구분</strong>
                {getKoType(noticeContent.category)}
                <strong className='text-btn-dark-3'>작성일</strong>
                {formatTimeStamp(noticeContent.createdAt)}
              </div>

              <div className='flex items-center gap-2 w-1.5/2 md:w-auto t-r-16'>
                <strong className='text-btn-dark-3'>기간</strong>
                {noticeContent.periodStart
                  ? formatTimeStamp(noticeContent.periodStart)
                  : '기간 없음'}
                ~
                {noticeContent.periodEnd
                  ? formatTimeStamp(noticeContent.periodEnd)
                  : '기간 없음'}
                <strong className='text-btn-dark-3'>조회수</strong>
                {noticeContent.viewCount}
              </div>
            </div>
            <div className='w-full border-t-1 border-t-bg-gray-d py-[8px]'></div>
          </div>
          
        </div>

        {/* 본문 내용 - 목록 스타일 추가 */}
        <div className='w-full h-auto min-h-[300px] py-0 px-[20px] md:p-[20px] relative'>
          <div
            className='mt-2 t-r-16 leading-relaxed prose prose-sm md:prose-base max-w-none
              [&_ul]:list-disc [&_ul]:list-outside [&_ul]:ml-6 [&_ul]:pl-0
              [&_ol]:list-decimal [&_ol]:list-outside [&_ol]:ml-6 [&_ol]:pl-0
              [&_li]:my-1 [&_li]:pl-2 [&_li]:relative
              [&_.tiptap-bullet-list]:list-disc [&_.tiptap-bullet-list]:list-outside [&_.tiptap-bullet-list]:ml-6
              [&_.tiptap-ordered-list]:list-decimal [&_.tiptap-ordered-list]:list-outside [&_.tiptap-ordered-list]:ml-6
              [&_.tiptap-list-item]:pl-2 [&_.tiptap-list-item]:my-1
              [&_a]:underline [&_a]:cursor-pointer [&_a]:text-blue-600 [&_a]:hover:text-blue-800'
            dangerouslySetInnerHTML={{ __html: noticeContent.content }}
          />
          {role === 'ADMIN' && (
            <div className='flex gap-4 mt-4 justify-end items-end absolute bottom-4 right-4'>
              <Button
                onClick={() => navigate(`/notice/${noticeNo}/edit`)}
                className='w-[80px] h-[20px] t-r-16 bg-bg-primary/80 hover:bg-bg-primary'
              >
                수정
              </Button>

              <Button
                disabled={isDeleting}
                onClick={handleDelete}
                className='w-[80px] h-[20px] t-r-16  bg-destructive/80 hover:bg-destructive'
              >
                삭제
              </Button>
            </div>
          )}
        </div>
        {/* 파일 */}
        <div className='w-full h-auto px-[10px] py-4 md:py-6 flex flex-col gap-2'>
          <div className='flex justify-center items-start h-auto min-h-[50px] px-5 md:px-6 flex-col gap-4 bg-bg-gray-fa border-t border-b border-bg-gray-d'>
            <div className='flex flex-col gap-2 t-r-16'>
              {noticeContent.files && noticeContent.files.length > 0 ? (
                noticeContent.files.map((file, index) => (
                  <div
                    key={index}
                    className='group flex justify-center items-center gap-2 cursor-pointer w-max  border-b border-transparent hover:border-b-bg-gray-d transition-colors'
                  >
                    <div className='w-[20px] h-[20px] md:w-[22px] md:h-[22px] flex justify-center items-center text-primary'>
                      <Download
                        size={16}
                        strokeWidth={2}
                        className='text-btn-dark-3 group-hover:text-bg-primary transition-colors duration-300'
                      />
                    </div>
                    <a
                      href={file.url}
                      target='_blank'
                      className='
                        text-btn-dark-3 
                        hover:text-bg-primary 
                        max-w-[260px] md:max-w-full
                        overflow-hidden 
                        text-ellipsis 
                        whitespace-nowrap
                      '
                    >
                      {file.name}
                    </a>
                    <span className='t-r-14 text-btn-gray-9 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                      다운로드
                    </span>
                  </div>
                ))
              ) : (
                <div>첨부된 파일이 없습니다.</div>
              )}
            </div>
          </div>
        </div>

        {/* 이전글과 다음글 */}
        <div className='w-full px-5 xl:px-0 py-6 t-r-16 flex justify-center'>
          {noticeContent && (
            <NoticeNav
              next={noticeContent.next}
              prev={noticeContent.previous}
            />
          )}
        </div>
      </div>
    </div>
  );
}
