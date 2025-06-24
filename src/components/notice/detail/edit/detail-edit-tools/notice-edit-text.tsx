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
  isLoading: boolean;
  editor: Editor | null;
};

export default function NoticeEditText({
  isLoading,
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
        <div className='md:w-full border-2 border-bg-gray-d/60 rounded-sm mx-3 md:mx-0'>
          <EditorContent
            editor={editor}
            className='min-h-[200px] p-2 md:p-4 md:pl-4 prose prose-sm
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
      <div className='flex gap-4 mt-4 justify-end items-end pb-[20px] px-4'>
        <Button
          type='button'
          onClick={handleCancel}
          className='w-[80px] h-[20px] t-r-16 bg-destructive hover:bg-destructive/80 '
        >
          취소
        </Button>
        <Button
          type='submit'
          disabled={isLoading}
          className='w-[80px] h-[20px] t-r-16 bg-primary hover:bg-primary/80 '
        >
          {isLoading ? '처리중...' : '완료'}
        </Button>
      </div>
    </div>
  );
}
