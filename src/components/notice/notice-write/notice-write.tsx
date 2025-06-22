import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { postNotice } from '@/apis/notice/notice';
import { NotepadText } from 'lucide-react';
import { useEditor } from '@tiptap/react';
import Color from '@tiptap/extension-color';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import { Button } from '@/components/ui/button';
import { handleApiError } from '@/components/common/error-handler';
import NoticeNav from '@/components/notice/notice-nav.tsx/notice-nav';
import TitleAndCategoryInput from '@/components/notice/notice-write/editor-tools/title-category-input';
import ToolbarUpload from '@/components/notice/notice-write/toolbar-tools/toolbar-upload';
import IsFixedCheckbox from '@/components/notice/notice-write/editor-tools/infixed-checkbox';
import DateInput from '@/components/notice/notice-write/editor-tools/date-input';
import EditorSection from '@/components/notice/notice-write/editor-tools/editor-section';

type NoticeFile = {
  filesNo?: number;
  name: string;
  url: string;
  file?: File;
  isNew?: boolean;
};

export default function NoticeWrite() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isFixed, setIsFixed] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') ?? '일반';
  const [uploadedFiles, setUploadedFiles] = useState<NoticeFile[]>([]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      Underline,
      Color,
      Highlight.configure({ multicolor: true }),
    ],
    content: '<p style="text-align:left;">여기에 내용을 입력하세요</p>',
  });

  const getEnCategory = (category: string) => {
    switch (category) {
      case '일반':
        return 'GENERAL';
      case '실습':
        return 'PRACTICE';
      case '모집':
        return 'RECRUIT';
      case '전시':
        return 'EXHIBITION';
      default:
        return 'ACADEMIC';
    }
  };

  const handleCategoryChange = (category: string) => {
    setSearchParams((prevSearchParams) => {
      if (category === 'all') {
        prevSearchParams.delete('category');
      } else {
        prevSearchParams.set('category', category);
      }
      return prevSearchParams;
    });
  };

  const handleSubmit = async () => {
    try {
      if (!editor) {
        toast.error('에디터가 준비되지 않았습니다.');
        return;
      }
      const filesNo = uploadedFiles
        .map((file) => file.filesNo)
        .filter((id): id is number => typeof id === 'number');

      await postNotice({
        title,
        category: getEnCategory(selectedCategory),
        periodStart: startDate,
        periodEnd: endDate,
        content: editor.getHTML(),
        filesNo,
        isFixed,
      });

      toast.success('게시글이 성공적으로 등록되었습니다.');
      navigate('/notice');
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  return (
    <div className='h-full w-full max-w-[1260px] pt-[100px] px-5 xl:px-0 mx-auto text-center'>
      <div className='w-full text-center'>
        <div className='flex justify-start items-center gap-1 w-full pb-[12px] md:pb-[18px]'>
          <div className='p-2 rounded-[5px] text-white bg-secondary'>
            <NotepadText size={32} strokeWidth={2} />
          </div>
          <strong className='p-2 ext-gray-6 t-b-24'>게시물 작성</strong>
        </div>
        <IsFixedCheckbox isFixed={isFixed} setIsFixed={setIsFixed} />
        <div className='flex flex-col md:flex-row gap-4 mb-4 overflow-x-auto'>
          <TitleAndCategoryInput
            title={title}
            setTitle={setTitle}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
          <DateInput
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
        </div>
        <EditorSection editor={editor} />
        <ToolbarUpload
          editor={editor}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
        <div className='flex justify-between mt-4 px-[8px]'>
          <NoticeNav />
          <Button
            type='button'
            className='h-[30px] md:h-[40px] w-[80px] md:w-[120px]'
            onClick={handleSubmit}
          >
            작성완료
          </Button>
        </div>
      </div>
    </div>
  );
}
