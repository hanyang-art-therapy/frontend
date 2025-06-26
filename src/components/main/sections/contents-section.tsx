import { formatTimeStamp } from '@/lib/utils';
import type { GetNoticesResponse } from '@/types/notice/notice';
import { Paperclip, Plus } from 'lucide-react';
import { Link, useLoaderData } from 'react-router-dom';

export default function ContentsSection() {
  const response = useLoaderData() as GetNoticesResponse;

  const getType = (category: string) => {
    if (category === 'GENERAL') {
      return '일반';
    }
    if (category === 'PRACTICE') {
      return '실습';
    }
    if (category === 'RECRUIT') {
      return '모집';
    }
    if (category === 'EXHIBITION') {
      return '전시';
    }

    return '학술';
  };

  return (
    <section className='w-full flex justify-center py-[60px]'>
      <div className='w-[1260px] flex justify-between items-stert gap-[60px] flex-col lg:flex-row px-5 xl:px-0'>
        {/* 공지사항 Content */}
        <div className='w-full space-y-[20px]'>
          <div className='flex justify-between items-center'>
            <h2 className='t-b-24'>공지사항</h2>
            <Link
              to='/notice'
              aria-label='더보기'
              className='p-2 rounded-full hover:bg-btn-gray-fa transition'
            >
              <Plus className='w-6 h-6 text-btn-dark transition-transform duration-200 hover:rotate-180' />
            </Link>
          </div>
          {/* 게시물 리스트 */}
          <ul className='h-[247px] grid grid-rows-5 divide-y divide-bg-gray-d border-y-[1px] border-gray-9 overflow-hidden'>
            {/* 헤더 */}
            <li className='grid grid-cols-[45px_80px_auto_100px] md:grid-cols-[70px_100px_auto_100px_100px_140px] items-center leading-[40px] t-b-16 text-center bg-bg-gray-fa'>
              <span>No.</span>
              <span>구분</span>
              <span>제목</span>
              <span className='hidden md:inline'>파일</span>
              <span className='hidden md:inline'>조회수</span>
              <span>작성일</span>
            </li>
            {/* 실제 데이터 */}
            {response.content.slice(0, 5).map((notice, index) => (
              <li
                key={notice.noticeNo}
                className='grid grid-cols-[45px_80px_auto_100px] md:grid-cols-[70px_100px_auto_100px_100px_140px] items-center leading-[40px] t-r-16 hover:bg-primary/5'
              >
                <span className='text-center'>{index + 1}</span>
                <span className='text-center'>{getType(notice.category)}</span>
                <Link
                  to={`/notice/${notice.noticeNo}`}
                  className='transition truncate t-m-16'
                >
                  {notice.title}
                </Link>
                <span className='text-gray-9 text-center t-r-14 hidden md:inline'>
                  {notice.hasFile && (
                    <div className='flex justify-center items-center'>
                      <Paperclip size={16} color='#333' strokeWidth={1.5} />
                    </div>
                  )}
                </span>
                <span className='text-gray-9 text-center t-r-14 hidden md:inline'>
                  {notice.viewCount}
                </span>
                <span className='text-gray-9 text-center t-r-14'>
                  {formatTimeStamp(notice.createdAt)}
                </span>
              </li>
            ))}
            {/* 빈 줄 추가 */}
            {Array.from({
              length: 5 - response.content.slice(0, 5).length,
            }).map((_, i) => (
              <li
                key={`empty-row-${i}`}
                className='grid grid-cols-[45px_80px_auto_100px] md:grid-cols-[70px_100px_auto_100px_100px_140px] items-center leading-[40px]'
              >
                <span className='text-center'>&nbsp;</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
