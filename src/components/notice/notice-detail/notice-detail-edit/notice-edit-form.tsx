import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { getNotice, updateNotice } from '@/apis/notice/notice';
import { toast } from 'sonner';
import NoticeNav from '../../notice-nav.tsx/notice-nav';

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
      setError('데이터를 불러오는데 실패했습니다.');
      toast.error('공지사항을 불러오는데 실패했습니다.');
    } finally {
      setDataLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newFiles: NoticeFile[] = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setFormData((prev) => ({
      ...prev,
      files: [...(prev.files || []), ...newFiles],
    }));

    toast.success('파일이 추가되었습니다.');
  };

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files?.filter((_, i) => i !== index) || [],
    }));
    toast.success('파일이 삭제되었습니다.');
  };

  // 폼 제출 처리
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error('제목을 입력해주세요.');
      return;
    }

    if (!formData.content.trim()) {
      toast.error('내용을 입력해주세요.');
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
        toast.success('공지사항이 수정되었습니다!');
      } else {
        // 생성 모드
        const result = await createNotice(formData);
        toast.success('공지사항이 작성되었습니다!');
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
          ? '공지사항 수정에 실패했습니다.'
          : '공지사항 작성에 실패했습니다.'
      );
    } finally {
      setLoading(false);
    }
  };
  const handleCancel = () => {
    navigate(isEdit ? `/notice/${noticeNo}` : '/notice');
  };

  if (dataLoading) {
    return (
      <div className='w-full min-h-screen bg-gray-50 py-8'>
        <div className='max-w-4xl mx-auto px-4'>
          <div className='bg-white rounded-lg shadow-md p-8 text-center py-8 text-lg text-gray-600'>
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
              <div className='text-lg text-red-600 mb-4'>{error}</div>
              <Button
                onClick={() => navigate('/notice')}
                className='px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg'
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
        <div
          className='w-full md:h-[140px] xl:px-0 border-t-2 py-[10px] text-start'
          style={{ backgroundColor: 'rgba(221, 221, 221, 0.2)' }}
        >
          <div className='flex flex-col gap-4 mt-2 t-r-16 px-[20px]'>
            {/* 제목 */}
            <div>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleInputChange}
                className='w-full  focus:ring-2 t-b-32 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                placeholder='제목을 입력하세요'
                required
              />
            </div>
            {/* 구분 && 기간  */}
            <div className='md:flex md:flex-row t-r-14 md:pb-[10px] px-[10px] flex gap-2 md:gap-4 flex-wrap'>
              {/* 구분 */}
              <div className='flex items-center gap-2'>
                <label className='font-semibold whitespace-nowrap t-b-16 w-[30px]'>
                  구분
                </label>
                <div>
                  <select
                    name='category'
                    value={formData.category}
                    onChange={handleInputChange}
                    className='w-full p-2 border-2 border-gray-200 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white'
                    required
                  >
                    <option value='GENERAL'>일반</option>
                    <option value='PRACTICE'>실습</option>
                    <option value='RECRUIT'>모집</option>
                    <option value='EXHIBITION'>전시</option>
                    <option value='ACADEMIC'>학술</option>
                  </select>
                </div>
              </div>
              {/* 기간 */}
              <div className='flex items-center gap-2 t-r-16'>
                {/* <strong className='text-shadow-gray-6'>기간</strong> */}
                <div className='flex justify-center items-center gap-6'>
                  <strong>시작일</strong>
                  <div>
                    <input
                      type='date'
                      name='periodStart'
                      value={formData.periodStart}
                      onChange={handleInputChange}
                      className='w-full p-2 border-2 border-gray-200 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                    />
                  </div>
                  <div>
                    <div className='flex justify-center items-center gap-6'>
                      <strong>종료일</strong>
                      <div>
                        <input
                          type='date'
                          name='periodEnd'
                          value={formData.periodEnd}
                          onChange={handleInputChange}
                          className='w-full p-2 border-2 border-gray-200 rounded-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 본문 내용 */}
        <div className='w-full h-auto p-[10px] '>
          <div className='mt-2 t-r-16 leading-relaxed'>
            <div>
              <textarea
                name='content'
                value={formData.content}
                onChange={handleInputChange}
                rows={12}
                className='w-full h-[200px] p-4  focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical'
                placeholder='내용을 입력하세요'
                required
              />
            </div>
            {/* 버튼 */}
            <div className='flex gap-4 mt-4 justify-end items-end pb-[20px]'>
              <Button
                type='button'
                onClick={handleCancel}
                className='h-[20px] w-[80px] t-r-16bg-gray-500 bg-orange-300 hover:bg-primary text-white rounded-sm'
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

          {/* 파일 */}
          <div
            className='w-full h-auto min-h-[70px] md:px-5 py-4 md:py-6 border-t flex flex-col gap-2'
            style={{ backgroundColor: 'rgba(221, 221, 221, 0.2)' }}
          >
            <div className='px-6 flex flex-col gap-4'>
              <div>첨부된 파일이 없습니다.</div>
              <div className='flex flex-col gap-2 t-r-16'>
                {formData.files && formData.files.length > 0 && (
                  <div>
                    <div className='space-y-2'>
                      {formData.files.map((file, index) => (
                        <div
                          key={index}
                          className='flex items-center justify-between p-3 bg-gray-100 rounded-lg'
                        >
                          <span className='text-blue-600 hover:text-blue-800 cursor-pointer'>
                            📎 {file.name}
                          </span>
                          <button
                            type='button'
                            onClick={() => removeFile(index)}
                            className='text-red-500 hover:text-red-700 font-medium'
                          >
                            삭제
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

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
