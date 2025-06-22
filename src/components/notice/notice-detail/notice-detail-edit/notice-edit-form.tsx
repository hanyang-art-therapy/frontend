import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { FilePenLine } from 'lucide-react';
import { NoticeCategory } from '@/types/notice/notice';
import { getNotice, patchNotice } from '@/apis/notice/notice';
import { Button } from '@/components/ui/button';
import NoticeNav from '@/components/notice/notice-nav.tsx/notice-nav';
import NoticeUploadEditor from '@/components/notice/notice-detail/notice-detail-edit/detail-edit-tools/notice-upload-editor';
import NoticeEditHeader from '@/components/notice/notice-detail/notice-detail-edit/detail-edit-tools/notice-edit-header';
import NoticeEditText from '@/components/notice/notice-detail/notice-detail-edit/detail-edit-tools/notice-edit-text';

type NoticeFile = {
  name: string;
  url: string;
  filesNo?: number;
  isNew?: boolean;
};

type NoticeData = {
  title: string;
  category: string;
  content: string;
  periodStart: string;
  periodEnd: string;
  isFixed?: boolean;
  files?: NoticeFile[];
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

// 한글 → 영문
const ENG_CATEGORY_MAP: Record<string, NoticeCategory> = {
  일반: 'GENERAL',
  실습: 'PRACTICE',
  모집: 'RECRUIT',
  전시: 'EXHIBITION',
  학술: 'ACADEMIC',
};

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
        isFixed: data.isFixed || false,
        files: data.files || [],
      });
    } catch (err) {
      setError('서버 오류가 발생했습니다.');
      toast.error('서버 오류가 발생했습니다.');
    } finally {
      setDataLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('제목과 내용, 카테고리 필수 입력 항목입니다.');
      return;
    }

    setLoading(true);

    try {
      if (isEdit && noticeNo) {
        const convertedCategory =
          ENG_CATEGORY_MAP[getType(formData.category)] || formData.category;

        await patchNotice(parseInt(noticeNo), {
          title: formData.title,
          content: formData.content,
          category: convertedCategory,
          periodStart: formData.periodStart,
          periodEnd: formData.periodEnd,
          isFixed: formData.isFixed ?? false,
          filesNo:
            formData.files
              ?.map((file) => file.filesNo!)
              .filter((id): id is number => !!id) ?? null,
        });

        toast.success('게시글 수정이 완료되었습니다.');
        navigate(`/notice/${noticeNo}`);
      } else {
        const result = await axios.post('/api/notice', formData);
        toast.success('게시글 등록이 완료되었습니다.');
        navigate(`/notice/${result.noticeNo}`);
        return;
      }
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('서버 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div className='w-full flex justify-center items-center min-h-screen bg-bg-gray-d py-8'>
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
          <div className='w-full md:h-[140px] xl:px-0 border-t-2 py-[10px] text-start bg-btn-dark-3/50'>
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
      <div className='w-full max-w-[1260px] mx-auto px-5'>
        <div className='flex justify-start items-center pb-[20px] gap-2'>
          <div className='p-3 rounded-[5px] w-[40px] h-[40px] flex justify-center items-center text-white bg-btn-dark-3'>
            <FilePenLine size={40} strokeWidth={2} />
          </div>
          <strong className='p-2 text-btn-dark-3 t-b-32'>게시물 수정</strong>
        </div>
      </div>
      <form
        className='flex flex-col items-center justify-center w-full max-w-[1260px] mx-auto'
        onSubmit={handleSubmit}
      >
        <NoticeEditHeader
          formData={formData}
          setFormData={setFormData}
          loading={false}
          selectedCategory={getType(formData.category)} // 👈 한글로 보여주기
          handleCategoryChange={(value: string) => {
            const converted = ENG_CATEGORY_MAP[value] || value;
            setFormData((prev) => ({
              ...prev,
              category: converted,
            }));
          }}
        />

        <div className='w-full h-auto py-[10px] mt-[10px]'>
          <NoticeEditText
            formData={formData}
            setFormData={setFormData}
            loading={loading}
          />

          <NoticeUploadEditor formData={formData} setFormData={setFormData} />

          <div className='w-full px-5 xl:px-0 py-6 border-t t-r-16 flex justify-center'></div>
          <div className='w-full px-5 xl:px-0 py-6 t-r-16 flex justify-center'>
            <NoticeNav noticeNo={noticeNo ?? ''} />
          </div>
        </div>
      </form>
    </div>
  );
}
