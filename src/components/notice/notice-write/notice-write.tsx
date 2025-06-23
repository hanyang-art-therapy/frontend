import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { postNotice } from '@/apis/notice/notice';
import { NotepadText } from 'lucide-react';
import {useEditor } from '@tiptap/react';
import { Extension } from '@tiptap/core';
import Color from '@tiptap/extension-color';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
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

// 커스텀 FontSize 확장 추가
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
            parseHTML: element => element.style.fontSize || null,
            renderHTML: attributes => {
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
      setFontSize: (fontSize: string) => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize })
          .run();
      },
      unsetFontSize: () => ({ chain }) => {
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

// NoticeWrite 컴포넌트에서 에디터 설정 부분을 다음과 같이 수정하세요:

const editor = useEditor({
  extensions: [
    StarterKit,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    TextStyle,
    FontSize,
    Underline,
    Color,
    Highlight.configure({ multicolor: true }),    
    Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false
            }
            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')

            if (disallowedProtocols.includes(protocol)) {
              return false
            }
            const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme))

            if (!allowedProtocols.includes(protocol)) {
              return false
            }
            const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
            const domain = parsedUrl.hostname

            if (disallowedDomains.includes(domain)) {
              return false
            }
            return true
          } catch {
            return false
          }
        },
        shouldAutoLink: url => {
          try {
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)
            const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
            const domain = parsedUrl.hostname

            return !disallowedDomains.includes(domain)
          } catch {
            return false
          }
        },

      }),
  ],
  content: '<p style="text-align:left;">여기에 내용을 입력하세요</p>',
  editorProps: {
    attributes: {
      class: 'prose prose-lg max-w-none focus:outline-none',
    },
  },
});

  // 카테고리를 영어로 변환하는 함수
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

        // 성공 시 notice-list 페이지로 리디렉션
        navigate('/notice');
      }
    } catch (error) {
      // 에러 처리 및 토스트 메시지 띄우기
      toast.error(handleApiError(error));
    }
  };

  if (!editor) {
    return null
  }

  

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
        <EditorSection editor={editor} className="ProseMirror [&_a]:underline [&_a]:cursor-pointer [&_a]:text-blue-600 [&_a]:hover:text-blue"/>

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