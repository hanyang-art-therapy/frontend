import { formatTimeStamp } from '@/lib/utils';
import type { GetNoticesContent } from '@/types/notice/notice';
import { Paperclip, Pin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type NoticeTableProps = {
  notices: GetNoticesContent[];
  page: number;
};

export default function NoticeTable({ notices, page }: NoticeTableProps) {
  const navigate = useNavigate();

  const getType = (category: string) => {
    if (category === 'GENERAL') return '일반';
    if (category === 'PRACTICE') return '실습';
    if (category === 'RECRUIT') return '모집';
    if (category === 'EXHIBITION') return '전시';
    return '학술';
  };

  return (
    <table className='w-full border-collapse table-fixed'>
      <thead className='bg-white t-r-16 border-b border-t border-b-bg-gray-d'>
        <tr className='bg-bg-gray-fa'>
          <th className='p-2 w-[40px] md:w-[70px] min-w-[40px]'>No.</th>
          <th className='p-2 w-[80px] md:w-[100px] min-w-[50px]'>구분</th>
          <th className='p-2 md:max-w-[750px] min-w-[150px]'>제목</th>
          <th className='p-2 hidden md:table-cell w-[40px] md:w-[100px] min-w-[40px]'>
            파일
          </th>
          <th className='p-2 hidden md:table-cell w-[60px] md:w-[100px] min-w-[60px]'>
            조회수
          </th>
          <th className='p-2 w-[100px] md:w-[140px] min-w-[100px]'>작성일</th>
        </tr>
      </thead>

      <tbody>
        {notices.map((item, index) => (
          <tr
            key={item.noticeNo}
            onClick={() => navigate(`/notice/${item.noticeNo}`)}
            className={`hover:bg-bg-gray-fa cursor-pointer border-b border-b-bg-gray-d t-r-16 max-h-[40px] ${
              item.isFixed ? 'bg-bg-primary/6 t-b-16' : 'bg-white'
            }`}
          >
            <td className='p-2 text-center h-[40px]'>
              {page * 10 + index + 1}
            </td>
            <td className='p-2 text-center'>{getType(item.category)}</td>
            <td className='max-w-[100px] sm:w-[90px] p-2 text-left relative group overflow-hidden whitespace-nowrap text-ellipsis t-m-16'>
              <span className='flex items-center gap-2'>
                {item.isFixed ? (
                  <>
                    <div className='w-5 h-5 bg-bg-primary rounded-full flex items-center justify-center shrink-0'>
                      <Pin size={12} color='#fff' strokeWidth={2} />
                    </div>
                    <span className='t-b-16'>{item.title}</span>
                  </>
                ) : (
                  item.title
                )}
              </span>
            </td>
            <td className='p-2 hidden md:table-cell text-center align-middle'>
              {item.hasFile && (
                <div className='flex justify-center items-center'>
                  <Paperclip size={16} color='#333' strokeWidth={1.5} />
                </div>
              )}
            </td>
            <td className='p-2 hidden md:table-cell text-gray-9 text-center t-r-14'>
              {item.viewCount}
            </td>
            <td className='p-2 text-center text-btn-gray-9 t-r-14'>
              {formatTimeStamp(item.createdAt)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
