import { useEffect } from 'react';
import { NOTICE_MOCK_DATA } from '@/constants/notice/notice';
import { useParams } from 'react-router-dom';
import { Download } from 'lucide-react';
import NoticeNav from '../notice-nav.tsx/notice-nav';

type Notice = (typeof NOTICE_MOCK_DATA.content)[number];
type Params = { noticeNo?: string };
type NoticeDetailProps = { data: Notice[] };

export default function NoticeDetail({ data }: NoticeDetailProps) {
  const { noticeNo } = useParams<Params>();
  const notice = data?.find((n) => String(n.noticeNo) === noticeNo);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  if (!notice)
    return (
      <div className='min-h-screen flex flex-col items-center justify-start text-start text-black mt-[120px]'>
        {/* 제목 */}
        <div className='w-full h-[600px] xl:px-0 border-t-2 border-b-2 py-[10px] border-t-gray-300 border-b-gray-300 bg-white flex justify-center items-center'>
          <div className='flex gap-4 mt-2 px-[20px] text-gray-2xl'>
            게시물을 찾을 수 없습니다.
          </div>
        </div>

        {/* 이전글과 다음글 */}
        <NoticeNav noticeNo={noticeNo ?? ''} />
      </div>
    );

  return (
    <div className='w-full h-full mt-[80px] md:mt-[120px]'>
      <div className='flex flex-col items-center justify-center w-full max-w-[1260px] mx-auto'>
        {/* 제목 */}
        <div
          className='w-full md:h-[140px] xl:px-0 border-t-2 py-[10px] text-start'
          style={{ backgroundColor: 'rgba(221, 221, 221, 0.2)' }}
        >
          <div className='flex flex-col gap-4 mt-2 md:text-sm px-[20px]'>
            <h1 className='t-b-32 font-bold'>{notice.title}</h1>
            <div className='md:flex md:flex-row t-r-14 md:p-[10px] flex gap-2 md:gap-4 flex-wrap'>
              <div className='flex items-center gap-2 w-1.5/2 md:w-auto t-r-16'>
                <strong className='text-shadow-gray-6'>구분</strong>
                {notice.category}
                <strong className='text-shadow-gray-6'>작성일</strong>
                {new Date(notice.createdAt).toLocaleDateString('ko-KR')}
              </div>

              <div className='flex items-center gap-2 w-1.5/2 md:w-auto t-r-16'>
                <strong className='text-shadow-gray-6'>기간</strong>
                {notice.periodStart
                  ? new Date(notice.periodStart).toLocaleDateString('ko-KR')
                  : '기간 없음'}
                ~
                {notice.periodEnd
                  ? new Date(notice.periodEnd).toLocaleDateString('ko-KR')
                  : '기간 없음'}
                <strong className='text-shadow-gray-6'>조회수</strong>
                {notice.viewCount}
              </div>
            </div>
          </div>
        </div>

        {/* 본문 내용 */}
        <div className='w-full  h-auto p-[20px] md:p-[30px]'>
          {/* <h2 className='text-[20px] font-semibold leading-relaxed py-4'>
          {notice.title}
        </h2> */}
          <div className='mt-2 t-r-16 leading-relaxed'>
            {notice.content.split('\n').map((line, idx) => (
              <p key={idx} className='mb-4'>
                {line}
              </p>
            ))}
          </div>
        </div>

        {/* 파일 */}
        <div
          className='w-full h-auto  md:px-5 py-4 md:py-6 border-t flex flex-col gap-2'
          style={{ backgroundColor: 'rgba(221, 221, 221, 0.2)' }}
        >
          <div className='px-6 flex flex-col gap-4'>
            <div className='flex flex-col gap-2 text-xs md:text-sm'>
              {notice.files && notice.files.length > 0 ? (
                notice.files.map((file, index) => (
                  <div
                    key={index}
                    className='flex items-center gap-2 cursor-pointer w-max border-b border-transparent hover:border-b hover:border-[#666]'
                  >
                    <div className='bg-[#f18100] w-[20px] h-[20px] md:w-[22px] md:h-[22px] rounded-xs flex justify-center items-center'>
                      <Download size={16} color='white' strokeWidth={2} />
                    </div>
                    <span>{file.name}</span>
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
          <NoticeNav noticeNo={noticeNo ?? ''} />
        </div>
      </div>
    </div>
  );
}
