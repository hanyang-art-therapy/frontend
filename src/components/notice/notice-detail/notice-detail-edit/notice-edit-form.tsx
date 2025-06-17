import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getNotice, updateNotice } from '@/apis/notice/notice';
import { toast } from 'sonner';
import NoticeNav from '../../notice-nav.tsx/notice-nav';
import NoticeUploadEditor from './notice-upload-editor';
import NoticeEditHeader from './notice-edit-header';
import NoticeEditText from './notice-edit-text';
import axios from 'axios';

interface NoticeFile {
  name: string;
  url: string;
}

interface NoticeData {
  title: string;
  category: string;
  content: string;
  periodStart: string;
  periodEnd: string;
  files?: NoticeFile[];
}

export default function NoticeEditForm() {
  const { noticeNo } = useParams<{ noticeNo: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<NoticeData>({
    title: '',
    category: 'GENERAL',
    content: '',
    periodStart: '',
    periodEnd: '',
    files: [],
  });

  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isEdit = Boolean(noticeNo);

  useEffect(() => {
    if (isEdit && noticeNo) {
      fetchNoticeData(noticeNo);
    } else {
      setDataLoading(false);
    }
  }, [isEdit, noticeNo]);

  const fetchNoticeData = async (id: string) => {
    try {
      setDataLoading(true);
      setError(null);
      const data = await getNotice({ noticeNo: parseInt(id) });

      const formatDate = (dateStr?: string) =>
        dateStr ? new Date(dateStr).toISOString().split('T')[0] : '';

      setFormData({
        title: data.title || '',
        category: data.category || 'GENERAL',
        content: data.content || '',
        periodStart: formatDate(data.periodStart),
        periodEnd: formatDate(data.periodEnd),
        files: data.files || [],
      });
    } catch (err) {
      console.error('Error fetching notice data:', err);
      setError('서버 오류가 발생했습니다.');
      toast.error('서버 오류가 발생했습니다.');
    } finally {
      setDataLoading(false);
    }
  };


  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('제목과 내용, 카테고리 필수 입력 항목입니다.');
      return;
    }

    if (!formData.content.trim()) {
      toast.error('제목과 내용, 카테고리 필수 입력 항목입니다.');
      return;
    }

    setLoading(true);

    try {
      if (isEdit && noticeNo) {
        // 수정 모드
        await updateNotice({
          noticeNo: parseInt(noticeNo),
          ...formData,
        });
        toast.success('게시글 수정이 완료되었습니다.');
      } else {
        // 생성 모드
        const createNotice = async (data: NoticeData) => {
  const response = await axios.post('/api/notice', data);
  return response.data;
};

        const result = await createNotice(formData);
        toast.success('게시글 등록이 완료되었습니다.');
        // 새로 생성된 공지사항의 번호로 이동
        navigate(`/notice/${result.noticeNo}`);
        return;
      }

      // 수정 완료 후 상세 페이지로 이동
      navigate(`/notice/${noticeNo}`);
    } catch (err) {
      console.error('Submit error:', err);
      toast.error(
        isEdit
          ? '서버 오류가 발생했습니다.'
          : '서버 오류가 발생했습니다.'
      );
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div className='w-full min-h-screen bg-bg-gray-d py-8'>
        <div className='max-w-4xl mx-auto px-4'>
          <div className='bg-white rounded-lg shadow-md p-8 text-center py-8 text-lg text-btn-dark-3'>
            데이터를 불러오는 중...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full h-full mt-[80px] md:mt-[120px]'>
        <div className='flex flex-col items-center justify-center w-full max-w-[1260px] mx-auto'>
          <div className='w-full md:h-[140px] xl:px-0 border-t-2 py-[10px] text-start bg-[rgba(221,221,221,0.2)]'>
            <div className='flex flex-col gap-4 mt-2 t-r-16 px-[20px]'>
              <div className='text-lg text-bg-primary mb-4'>{error}</div>
              <Button
                onClick={() => navigate('/notice')}
                className='px-6 py-2 bg-bg-secondary hover:bg-bg-secondary text-white rounded-lg'
              >
                공지사항 목록으로 돌아가기
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full h-full mt-[80px] md:mt-[120px]'>
      <form
        className='flex flex-col items-center justify-center w-full max-w-[1260px] mx-auto'
        onSubmit={handleSubmit}
      >
        <NoticeEditHeader/>
        {/* 본문 내용 */}
        <div className='w-full h-auto p-[10px] '>
         <NoticeEditText/>

          {/* 파일 */}
         <NoticeUploadEditor/>

          {/* 이전글과 다음글 */}
          <div className='w-full px-5 xl:px-0 py-6 border-t t-r-16 flex justify-center'></div>
          {/* 이전글과 다음글 */}
          <div className='w-full px-5 xl:px-0 py-6 t-r-16 flex justify-center'>
            <NoticeNav noticeNo={noticeNo ?? ''} />
          </div>
        </div>
      </form>
    </div>
  );
}
