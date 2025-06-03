import { NOTICE_MOCK_DATA } from '@/constants/notice/notice';
import { useNavigate } from 'react-router-dom';
import { Paperclip } from 'lucide-react';

type NoticeTableProps = {
  data: typeof NOTICE_MOCK_DATA.content;
};

export default function NoticeTable({ data }: NoticeTableProps) {
  const navigate = useNavigate();

  return (
    <div className='w-full overflow-x-auto'>
      <table className='w-full border-collapse border border-gray-300 table-fixed'>
        <thead className='bg-bg-gray-fa text-[12px] md:text-[16px]'>
          <tr>
            <th className='p-2 w-[40px] md:w-[70px] min-w-[40px]'>번호</th>
            <th className='p-2 w-[50px] md:w-[100px] min-w-[50px]'>구분</th>
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
          {data.map((item) => (
            <tr
              key={item.noticeNo}
              onClick={() => navigate(`/notice/${item.noticeNo}`)}
              className='hover:bg-orange-100 cursor-pointer border-b border-gray-300 text-[14px] md:text-[16px]'
            >
              <td className='p-2 text-center'>{item.noticeNo}</td>
              <td className='p-2 text-center'>{item.category}</td>

              <td className='max-w-[100px] sm:w-[90px] p-2 text-left relative group overflow-hidden whitespace-nowrap text-ellipsis'>
                <span>{item.title}</span>

                {/* 툴팁 */}
                <div className='absolute bottom-full left-0 mb-1 w-max max-w-[200px] px-2 py-1 bg-gray-600 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none'>
                  {item.title}
                </div>
              </td>
              <td className='p-2 hidden md:table-cell text-center align-middle'>
                {item.files && item.files.length > 0 ? (
                  <div className='flex justify-center items-center'>
                    <Paperclip size={16} color='#333' strokeWidth={1.5} />
                  </div>
                ) : null}
              </td>
              <td className='p-2 hidden md:table-cell text-center'>
                {item.viewCount}
              </td>
              <td className='p-2 text-center'>
                {new Date(item.createdAt).toLocaleDateString('ko-KR')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
