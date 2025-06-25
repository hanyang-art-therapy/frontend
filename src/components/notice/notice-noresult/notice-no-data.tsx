import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';
import { useNavigate } from 'react-router-dom';

export default function NoticeNoData() {
  const navigate = useNavigate();
  const { role } = useAuthStore.getState();
  return (
    <div className='flex flex-col items-center justify-start text-start'>
      {/* 제목 */}
      <div className='w-full h-[200px] xl:px-0 border-t-1 border-b-1 py-[10px] border-t-bg-gray-d border-b-bg-gray-d bg-white flex justify-center items-center'>
        <div className='flex gap-4 mt-2 px-[20px] text-btn-gray-9'>
          현재 게시된 공지사항이 없습니다.
        </div>
        {role === 'ADMIN' && (
          <Button
            type='button'
            onClick={() => navigate('/notice/write')}
            className='h-[30px] md:h-[40px] w-[80px] md:w-[120px] mt-[30px] ml-auto'
          >
            글쓰기
          </Button>
        )}
      </div>
    </div>
  );
}