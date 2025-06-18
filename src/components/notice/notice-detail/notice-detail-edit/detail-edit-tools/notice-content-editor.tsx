import { Button } from '@/components/ui/button';

interface NoticeContentEditorProps {
  content: string;
  loading: boolean;
  isEdit: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
}

export default function NoticeContentEditor({
  content,
  loading,
  isEdit,
  onChange,
  onSubmit,
  onCancel,
}: NoticeContentEditorProps) {
  return (
    <div className='w-full h-auto p-[10px]'>
      <form onSubmit={onSubmit}>
        <div className='mt-2 t-r-16 leading-relaxed'>
          <textarea
            name='content'
            value={content}
            onChange={onChange}
            rows={12}
            className='w-full h-[200px] p-4 focus:ring-2 focus:ring-bg-primary focus:border-b-primary transition-colors resize-vertical'
            placeholder='내용을 입력하세요'
            required
          />
          
            {/* 여기 orange는 호버전 색상이기 때문에 적용,, */}
          <div className='flex gap-4 mt-4 justify-end items-end pb-[20px]'>
            <Button
              type='button'
              onClick={onCancel}
              className='h-[20px] w-[80px] t-r-16 bg-orange-300 hover:bg-primary text-white rounded-sm'
            >
              취소
            </Button>
            {/* 여기 rgba는 호버전 색상이기 때문에 적용,, */}
            <Button
              type='submit'
              disabled={loading}
              className='h-[20px] w-[80px] t-r-16 bg-[rgba(0,68,131,0.5)] hover:bg-bg-secondary text-white rounded-sm'
            >
              {loading ? '처리중...' : isEdit ? '수정 완료' : '작성 완료'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
