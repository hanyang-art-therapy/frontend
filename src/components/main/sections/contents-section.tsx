import { formatTimeStamp } from '@/lib/utils';
import type { GetNoticesResponse } from '@/types/notice/notice';
import { Plus } from 'lucide-react';
import { Link, useLoaderData } from 'react-router-dom';

export default function ContentsSection() {
  const response = useLoaderData() as GetNoticesResponse;

  return (
    <section className='w-full flex justify-center py-[60px] bg-bg-gray-fa'>
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
              <Plus className='w-6 h-6 text-btn-dark' />
            </Link>
          </div>

          {/* 게시물 리스트 */}
          <ul className='h-[300px] divide-y divide-gray-9 border-y-[2px] border-gray-6'>
            {response.content.slice(0, 6).map((notice) => (
              <li
                key={notice.noticeNo}
                className='grid grid-cols-[auto_1fr_auto] gap-[20px] items-center leading-[49px]  px-5 t-r-16'
              >
                {/* 번호 */}
                <span className='t-b-14'>{notice.noticeNo}</span>
                {/* 제목 (클릭 시 상세 페이지로 이동 가능) */}
                <Link
                  to={`/notice/${notice.noticeNo}`}
                  className='t-r-18 hover:opacity-70 transition truncate'
                >
                  {notice.title}
                </Link>
                {/* 날짜 */}
                <span className='t-r-14 text-gray-9'>
                  {formatTimeStamp(notice.createdAt)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
