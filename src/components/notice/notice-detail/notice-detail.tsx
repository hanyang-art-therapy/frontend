import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Download } from 'lucide-react';
import NoticeNav from '../notice-nav.tsx/notice-nav';
import NoticeNoResult from '../notice-noresult/notice-no-result';
import { formatTimeStamp } from '@/lib/utils';
import { GetNoticeResponse } from '@/types/notice/notice';
import { deleteNotice, getNotice } from '@/apis/notice/notice';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth';

type NoticeTableProps = {
  data: GetNoticeResponse | null;
};

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

export default function NoticeDetail({ data }: NoticeTableProps) {
  const [noticeContents, setNoticeContents] =
    useState<GetNoticeResponse | null>(null);
  const { noticeNo } = useParams();
  const navigate = useNavigate();

  // useAuthStore에서 role을 구조분해할당으로 가져오기
  const authStore = useAuthStore();
  const role = authStore.role || 'ADMIN';

  // 또는 다른 방식으로 시도해보기
  // const { role } = useAuthStore() || {};

  // 디버깅용 로그 추가
  console.log('=== DEBUG INFO ===');
  console.log('authStore:', authStore);
  console.log('role:', role);
  console.log('role type:', typeof role);
  console.log('role === "ADMIN":', role === 'ADMIN');
  console.log('noticeNo:', noticeNo);

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
    console.log('Delete button clicked, role:', role);
    // 관리자 권한 확인
    if (role !== 'ADMIN') {
      toast.error('관리자만 삭제할 수 있습니다.');
      return;
    }

    // 삭제 확인 다이얼로그
    if (!window.confirm('정말로 이 게시글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteNotice({ noticeNo: parseInt(noticeNo ?? '1') });
      toast.success('게시글 삭제가 완료되었습니다.');
      navigate('/notice');
    } catch (error) {
      toast.error('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  const handleEdit = () => {
    console.log('Edit button clicked, role:', role);
    // 관리자 권한 확인
    if (role !== 'ADMIN') {
      toast.error('관리자만 수정할 수 있습니다.');
      return;
    }

    navigate(`/notice/${noticeNo}/edit`);
  };

  // 관리자인지 확인 - null과 undefined도 체크
  const isAdmin = role === 'ADMIN';
  console.log('isAdmin:', isAdmin);

  if (!noticeContents) return <NoticeNoResult />;

  return (
    <div className='w-full h-full mt-[80px] md:mt-[120px]'>
      <div className='flex flex-col items-center justify-center w-full max-w-[1260px] mx-auto'>
        <div
          className='w-full md:h-[140px] xl:px-0 border-t-2 py-[10px] text-start'
          style={{ backgroundColor: 'rgba(221, 221, 221, 0.2)' }}
        >
          <div className='flex flex-col gap-4 mt-2 t-r-16 px-[20px]'>
            <h1 className='t-b-32 font-bold'>{noticeContents.title}</h1>
            <div className='md:flex md:flex-row t-r-14 md:p-[10px] flex gap-2 md:gap-4 flex-wrap'>
              <div className='flex items-center gap-2 w-1.5/2 md:w-auto t-r-16'>
                <strong className='text-shadow-gray-6'>구분</strong>
                {getType(noticeContents.category)}
                <strong className='text-shadow-gray-6'>작성일</strong>
                {formatTimeStamp(noticeContents.createdAt)}
              </div>

              <div className='flex items-center gap-2 w-1.5/2 md:w-auto t-r-16'>
                <strong className='text-shadow-gray-6'>기간</strong>
                {noticeContents.periodStart
                  ? formatTimeStamp(noticeContents.periodStart)
                  : '기간 없음'}
                ~
                {noticeContents.periodEnd
                  ? formatTimeStamp(noticeContents.periodEnd)
                  : '기간 없음'}
                <strong className='text-shadow-gray-6'>조회수</strong>
                {noticeContents.viewCount}
              </div>
            </div>
          </div>
        </div>

        {/* 본문 내용 */}
        <div className='w-full h-auto p-[20px] md:p-[30px]'>
          <div className='mt-2 t-r-16 leading-relaxed'>
            {noticeContents.content.split('\n').map((line, idx) => (
              <p key={idx} className='mb-4'>
                {line}
              </p>
            ))}
          </div>

          {/* 디버깅: 항상 보이는 텍스트 */}
          <div className='mt-4 p-2 bg-yellow-100 border'>
            <p>디버깅 정보:</p>
            <p>authStore: {JSON.stringify(authStore)}</p>
            <p>role: {role || 'undefined'}</p>
            <p>isAdmin: {isAdmin ? 'true' : 'false'}</p>
            <p>role === 'ADMIN': {role === 'ADMIN' ? 'true' : 'false'}</p>
          </div>

          {/* 테스트용: 항상 보이는 버튼 */}
          <div className='flex gap-4 mt-4 justify-end items-end'>
            <Button className='h-[20px] w-[80px] t-r-16 bg-gray-500 text-white rounded-sm'>
              테스트버튼
            </Button>
          </div>

          {/* 임시 테스트: role을 강제로 'ADMIN'으로 설정해서 테스트 */}
          {/* 이 부분은 테스트 후 삭제하세요 */}
          <div className='flex gap-4 mt-4 justify-end items-end'>
            <Button
              onClick={handleEdit}
              className='h-[20px] w-[80px] t-r-16 bg-green-300 hover:bg-primary text-white rounded-sm'
            >
              테스트수정
            </Button>

            <Button
              onClick={handleDelete}
              className='h-[20px] w-[80px] t-r-16 bg-pink-300 hover:bg-red-600 text-white rounded-sm'
            >
              테스트삭제
            </Button>
          </div>

          {/* 수정/삭제 버튼 (관리자일 경우만 표시) */}
          {role === 'ADMIN' && (
            <div className='flex gap-4 mt-4 justify-end items-end'>
              <Button
                onClick={handleEdit}
                className='h-[20px] w-[80px] t-r-16 bg-orange-300 hover:bg-primary text-white rounded-sm'
              >
                수정
              </Button>

              <Button
                onClick={handleDelete}
                className='h-[20px] w-[80px] t-r-16 bg-red-300 hover:bg-red-600 text-white rounded-sm'
              >
                삭제
              </Button>
            </div>
          )}
        </div>

        {/* 파일 */}
        <div
          className='w-full h-auto md:px-5 py-4 md:py-6 border-t flex flex-col gap-2'
          style={{ backgroundColor: 'rgba(221, 221, 221, 0.2)' }}
        >
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
                      href={file.url} // 파일 다운로드 URL
                      target='_blank' // 새 창에서 열기
                      className='text-blue-600 hover:underline'
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
          <NoticeNav noticeNo={noticeNo ?? ''} />
        </div>
      </div>
    </div>
  );
}
