import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Editor, EditorContent } from '@tiptap/react';

type NoticeFile = {
  name: string;
  url: string;
};

type NoticeData = {
  title: string;
  category: string;
  content: string;
  periodStart: string;
  periodEnd: string;
  files?: NoticeFile[];
};

type NoticeEditTextProps = {
  setFormData: React.Dispatch<React.SetStateAction<NoticeData>>;
  loading: boolean;
  editor: Editor | null;
};

export default function NoticeEditText({
  loading,
  editor,
}: NoticeEditTextProps) {
  const { noticeNo } = useParams<{ noticeNo: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(noticeNo);

  const handleCancel = () => {
    navigate(isEdit ? `/notice/${noticeNo}` : '/notice');
  };

  return (
    <div className='mt-2 t-r-16 leading-relaxed'>
      <div>
        {/* textarea 대신 TipTap EditorContent 사용 */}
        <div className='w-full border border-gray-300 rounded-sm'>
          <EditorContent 
            editor={editor}
            className='min-h-[200px] p-4 prose prose-sm max-w-none
            [&_.ProseMirror]:outline-none 
            [&_.ProseMirror]:min-h-[200px]
            [&_.ProseMirror]:resize-y
            [&_.ProseMirror]:overflow-auto
            [&_.ProseMirror_p]:margin-0
            [&_.ProseMirror_p]:padding-0'
          />
        </div>
      </div>
      {/* 버튼 */}
      <div className='flex gap-4 mt-4 justify-end items-end pb-[20px] px-2'>
        <Button
          type='button'
          onClick={handleCancel}
          className='h-[20px] w-[80px] t-r-16 bg-bg-primary/50 hover:bg-bg-primary text-white rounded-sm'
        >
          취소
        </Button>
        <Button
          type='submit'
          disabled={loading}
          className='h-[20px] w-[80px] t-r-16 bg-bg-secondary/50 hover:bg-bg-secondary text-white rounded-sm'
        >
          {loading ? '처리중...' : isEdit ? '수정 완료' : '작성 완료'}
        </Button>
      </div>
    </div>
  );
}