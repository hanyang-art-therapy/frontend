import { Button } from '@/components/ui/button';
import { useNavigate, useParams } from 'react-router-dom';

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

interface Props {
  formData: NoticeData;
  setFormData: React.Dispatch<React.SetStateAction<NoticeData>>;
  loading: boolean;
}

export default function NoticeEditText({
  formData,
  setFormData,
  loading,
}: Props) {
  const { noticeNo } = useParams<{ noticeNo: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(noticeNo);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    navigate(isEdit ? `/notice/${noticeNo}` : '/notice');
  };

  return (
    <div className='mt-2 t-r-16 leading-relaxed'>
      <div>
        <textarea
          name='content'
          value={formData.content}
          onChange={handleInputChange}
          rows={12}
          className='w-full h-[200px] px-4 resize-vertical'
          placeholder='내용을 입력하세요'
          required
        />
      </div>
      {/* 버튼 */}
      <div className='flex gap-4 mt-4 justify-end items-end pb-[20px]'>
        <Button
          type='button'
          onClick={handleCancel}
          className='h-[20px] w-[80px] t-r-16 bg-orange-300 hover:bg-primary text-white rounded-sm'
        >
          취소
        </Button>
        <Button
          type='submit'
          disabled={loading}
          className='h-[20px] w-[80px] t-r-16 bg-[rgba(0,68,131,0.5)] hover:bg-bg-secondary text-white rounded-sm'
        >
          {loading ? '처리중...' : isEdit ? '수정 완료' : '작성 완료'}
        </Button>
      </div>
    </div>
  );
}
