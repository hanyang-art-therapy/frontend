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

export default function NoticeEditText({ editor }: NoticeEditTextProps) {
  return (
    <div className='mt-2 t-r-16 leading-relaxed'>
      <div>
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
    </div>
  );
}
