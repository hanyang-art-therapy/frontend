import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

// 실제 프로젝트에서는 이런 타입들을 import 해야 합니다
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
  const [formData, setFormData] = useState<NoticeData>({
    title: '',
    category: 'GENERAL',
    content: '',
    periodStart: '',
    periodEnd: '',
    files: [],
  });

  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(true); // 수정 모드 시뮬레이션
  const [noticeNo] = useState('123'); // 예시 공지사항 번호

  // 기존 데이터 시뮬레이션 (실제로는 API에서 가져옴)
  useEffect(() => {
    // 실제 구현에서는 URL 파라미터나 props로 받은 noticeNo로 API 호출
    const mockExistingData: NoticeData = {
      title: '2024년 하반기 프로그래밍 실습 공지사항',
      category: 'PRACTICE',
      content:
        '안녕하세요.\n\n2024년 하반기 프로그래밍 실습 일정을 안내드립니다.\n\n실습 기간: 12월 1일 ~ 12월 31일\n실습 장소: 컴퓨터실 A동 201호\n\n문의사항이 있으시면 언제든지 연락바랍니다.\n\n감사합니다.',
      periodStart: '2024-12-01',
      periodEnd: '2024-12-31',
      files: [
        { name: '실습안내서.pdf', url: '/files/guide.pdf' },
        { name: '참조자료.docx', url: '/files/reference.docx' },
      ],
    };

    if (isEdit) {
      setFormData(mockExistingData);
    }
  }, [isEdit]);

  // 폼 데이터 변경 처리
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 파일 업로드 처리
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    console.log('Selected files:', files);
    // 실제 구현에서는 파일 업로드 API 호출 후 formData.files 업데이트
  };

  // 기존 파일 삭제
  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files?.filter((_, i) => i !== index) || [],
    }));
  };

  // 폼 제출 처리
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }

    if (!formData.content.trim()) {
      alert('내용을 입력해주세요.');
      return;
    }

    setLoading(true);

    // 실제 API 호출 시뮬레이션
    setTimeout(() => {
      console.log('Form submitted:', formData);
      alert(
        isEdit ? '공지사항이 수정되었습니다!' : '공지사항이 작성되었습니다!'
      );
      setLoading(false);
      // 실제로는 navigate('/notice') 또는 상세 페이지로 이동
    }, 1000);
  };

  const getCategoryLabel = (category: string) => {
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

  return (
    <div className='w-full min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-4'>
        <div className='bg-white rounded-lg shadow-md p-8'>
          <h1 className='text-3xl font-bold mb-8 text-gray-800'>
            {isEdit ? '공지사항 수정' : '공지사항 작성'}
          </h1>

          <div className='space-y-6'>
            {/* 제목 */}
            <div>
              <label className='block text-sm font-semibold mb-2 text-gray-700'>
                제목 *
              </label>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleInputChange}
                className='w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                placeholder='제목을 입력하세요'
                required
              />
            </div>

            {/* 구분 */}
            <div>
              <label className='block text-sm font-semibold mb-2 text-gray-700'>
                구분 *
              </label>
              <select
                name='category'
                value={formData.category}
                onChange={handleInputChange}
                className='w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white'
                required
              >
                <option value='GENERAL'>일반</option>
                <option value='PRACTICE'>실습</option>
                <option value='RECRUIT'>모집</option>
                <option value='EXHIBITION'>전시</option>
                <option value='ACADEMIC'>학술</option>
              </select>
            </div>

            {/* 기간 */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <label className='block text-sm font-semibold mb-2 text-gray-700'>
                  시작일
                </label>
                <input
                  type='date'
                  name='periodStart'
                  value={formData.periodStart}
                  onChange={handleInputChange}
                  className='w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                />
              </div>
              <div>
                <label className='block text-sm font-semibold mb-2 text-gray-700'>
                  종료일
                </label>
                <input
                  type='date'
                  name='periodEnd'
                  value={formData.periodEnd}
                  onChange={handleInputChange}
                  className='w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors'
                />
              </div>
            </div>

            {/* 내용 */}
            <div>
              <label className='block text-sm font-semibold mb-2 text-gray-700'>
                내용 *
              </label>
              <textarea
                name='content'
                value={formData.content}
                onChange={handleInputChange}
                rows={12}
                className='w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical'
                placeholder='내용을 입력하세요'
                required
              />
            </div>

            {/* 기존 첨부파일 */}
            {formData.files && formData.files.length > 0 && (
              <div>
                <label className='block text-sm font-semibold mb-2 text-gray-700'>
                  기존 첨부파일
                </label>
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

            {/* 새 파일 업로드 */}
            <div>
              <label className='block text-sm font-semibold mb-2 text-gray-700'>
                새 파일 추가
              </label>
              <input
                type='file'
                multiple
                onChange={handleFileChange}
                className='w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
              />
            </div>

            {/* 미리보기 */}
            <div className='border-t pt-6'>
              <h3 className='text-lg font-semibold mb-4 text-gray-800'>
                미리보기
              </h3>
              <div className='bg-gray-50 p-6 rounded-lg'>
                <h2 className='text-xl font-bold mb-2'>
                  {formData.title || '제목 없음'}
                </h2>
                <div className='text-sm text-gray-600 mb-4 space-x-4'>
                  <span>구분: {getCategoryLabel(formData.category)}</span>
                  {formData.periodStart && (
                    <span>
                      기간: {formData.periodStart} ~{' '}
                      {formData.periodEnd || '종료일 없음'}
                    </span>
                  )}
                </div>
                <div className='whitespace-pre-wrap text-gray-800'>
                  {formData.content || '내용 없음'}
                </div>
              </div>
            </div>

            {/* 버튼 */}
            <div className='flex gap-4 justify-end pt-6 border-t'>
              <Button
                type='button'
                onClick={() => alert('취소되었습니다')}
                className='px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors'
              >
                취소
              </Button>
              <Button
                type='button'
                onClick={handleSubmit}
                disabled={loading}
                className='px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? '처리중...' : isEdit ? '수정 완료' : '작성 완료'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
