import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { postNotice } from '@/apis/notice/notice';
import { NotepadText } from 'lucide-react';
import { useEditor } from '@tiptap/react';
import { Extension } from '@tiptap/core';
import Color from '@tiptap/extension-color';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import ListItem from '@tiptap/extension-list-item';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import Image from '@tiptap/extension-image';
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

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      setFontSize: (fontSize: string) => ReturnType;
      unsetFontSize: () => ReturnType;
    };
  }
}

const FontSize = Extension.create({
  name: 'fontSize',
  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize || null,
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }) => {
          return chain().setMark('textStyle', { fontSize }).run();
        },
      unsetFontSize:
        () =>
        ({ chain }) => {
          return chain()
            .setMark('textStyle', { fontSize: null })
            .removeEmptyTextStyle()
            .run();
        },
    };
  },
});

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
      // StarterKit에서 목록 관련 기능들을 제외하고 사용
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
      }),
      // 목록 관련 확장들을 명시적으로 추가 (중복 제거)
      BulletList.configure({
        HTMLAttributes: {
          class: 'tiptap-bullet-list',
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'tiptap-ordered-list',
        },
      }),
      ListItem.configure({
        HTMLAttributes: {
          class: 'tiptap-list-item',
        },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      TextStyle,
      FontSize,
      Underline,
      Image.configure({
        inline: false,
        allowBase64: true,
      }),
      Color,
      Highlight.configure({ multicolor: true }),
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);
            const disallowedProtocols = ['ftp', 'file', 'mailto'];
            const protocol = parsedUrl.protocol.replace(':', '');
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === 'string' ? p : p.scheme
            );
            const disallowedDomains = [
              'example-phishing.com',
              'malicious-site.net',
            ];
            if (!ctx.defaultValidate(parsedUrl.href)) return false;
            if (disallowedProtocols.includes(protocol)) return false;
            if (!allowedProtocols.includes(protocol)) return false;
            if (disallowedDomains.includes(parsedUrl.hostname)) return false;
            return true;
          } catch {
            return false;
          }
        },
        shouldAutoLink: (url) => {
          try {
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`https://${url}`);
            const disallowedDomains = [
              'example-no-autolink.com',
              'another-no-autolink.com',
            ];
            return !disallowedDomains.includes(parsedUrl.hostname);
          } catch {
            return false;
          }
        },
      }),
    ],
    content: '<p>여기에 내용을 입력하세요</p>',
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-none',
      },
    },
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

  if (!editor) {
    return null;
  }

  return (
    <div className='h-full w-full max-w-[1260px] md:pt-[40px] px-1 md:px-5 xl:px-0 mx-auto text-center'>
      <div className='w-full text-center mt-[80px]'>
        <div className='w-full max-w-[1260px] mx-auto px-5 md:px-0'>
          <div className='flex justify-start items-center pb-[10px] md:pb-[20px] gap-2'>
            <div className='p-3 rounded-[5px] w-[40px] h-[40px] flex justify-center items-center text-white bg-bg-secondary/90'>
              <NotepadText size={40} strokeWidth={2} />
            </div>
            <strong className='p-2 text-bg-black t-b-32'>게시물 작성</strong>
          </div>
          <div className='w-[96%] border-t-2 border-t-btn-gray-9 py-[8px]'></div>
        </div>
        <div className='flex px-2 md:px-0'>
          <IsFixedCheckbox isFixed={isFixed} setIsFixed={setIsFixed} />
        </div>
        <div className='flex flex-col md:flex-row gap-4 mb-4 overflow-x-auto px-4 md:px-0'>
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
        <EditorSection
          editor={editor}
          className='ProseMirror 
            [&_ul]:list-disc [&_ul]:list-outside [&_ul]:ml-6 [&_ul]:pl-0
            [&_ol]:list-decimal [&_ol]:list-outside [&_ol]:ml-6 [&_ol]:pl-0
            [&_li]:my-1 [&_li]:pl-2 [&_li]:relative
            [&_.tiptap-bullet-list]:list-disc [&_.tiptap-bullet-list]:list-outside [&_.tiptap-bullet-list]:ml-6
            [&_.tiptap-ordered-list]:list-decimal [&_.tiptap-ordered-list]:list-outside [&_.tiptap-ordered-list]:ml-6
            [&_.tiptap-list-item]:pl-2 [&_.tiptap-list-item]:my-1
            [&_a]:underline [&_a]:cursor-pointer [&_a]:text-bg-secondary/50 [&_a]:hover:text-bg-secondary'
        />
        <ToolbarUpload
          editor={editor}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
        />
        <div className='flex items-center mt-4 px-[8px]'>
          <div className='flex-1 flex justify-center'>
            <NoticeNav />
          </div>
          <div>
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
    </div>
  );
}
