import { getNotice, patchNotice } from '@/apis/notice/notice';
import NoticeEditHeader from '@/components/notice/detail/edit/detail-edit-tools/notice-edit-header';
import NoticeEditText from '@/components/notice/detail/edit/detail-edit-tools/notice-edit-text';
import NoticeUploadEditor from '@/components/notice/detail/edit/detail-edit-tools/notice-upload-editor';
import NoticeNav from '@/components/notice/notice-nav.tsx/notice-nav';
import ToolbarHeading from '@/components/notice/notice-write/toolbar-tools/toolbar-heading'; // 실제 경로로 수정 필요
import { Button } from '@/components/ui/button';
import { getEgType, getKoType } from '@/lib/helper/notice';
import { Extension } from '@tiptap/core';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import axios from 'axios';
import { FilePenLine } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

type NoticeFile = {
  name: string;
  url: string;
  filesNo?: number;
  isNew?: boolean;
};

type NoticeData = {
  title: string;
  category: string;
  content: string;
  periodStart: string;
  periodEnd: string;
  isFixed?: boolean;
  files?: NoticeFile[];
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

  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isEdit = Boolean(noticeNo);
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
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`);
            if (!ctx.defaultValidate(parsedUrl.href)) {
              return false;
            }
            const disallowedProtocols = ['ftp', 'file', 'mailto'];
            const protocol = parsedUrl.protocol.replace(':', '');

            if (disallowedProtocols.includes(protocol)) {
              return false;
            }
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === 'string' ? p : p.scheme
            );

            if (!allowedProtocols.includes(protocol)) {
              return false;
            }
            const disallowedDomains = [
              'example-phishing.com',
              'malicious-site.net',
            ];
            const domain = parsedUrl.hostname;

            if (disallowedDomains.includes(domain)) {
              return false;
            }
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
            const domain = parsedUrl.hostname;

            return !disallowedDomains.includes(domain);
          } catch {
            return false;
          }
        },
      }),
    ],
    content: formData.content || '<p>여기에 내용을 입력하세요</p>',
  });

  useEffect(() => {
    if (editor && !editor.isDestroyed) {
      const handleUpdate = () => {
        const html = editor.getHTML();
        setFormData((prev) => ({
          ...prev,
          content: html,
        }));
      };

      editor.on('update', handleUpdate);
      return () => {
        editor.off('update', handleUpdate);
      };
    }
  }, [editor]);

  useEffect(() => {
    if (
      editor &&
      !editor.isDestroyed &&
      formData.content !== editor.getHTML()
    ) {
      editor.commands.setContent(formData.content);
    }
  }, [formData.content, editor]);

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
        isFixed: data.isFixed || false,
        files: data.files || [],
      });
    } catch {
      setError('서버 오류가 발생했습니다.');
      toast.error('서버 오류가 발생했습니다.');
    } finally {
      setDataLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('제목과 내용, 카테고리 필수 입력 항목입니다.');
      return;
    }

    setIsLoading(true);

    try {
      if (isEdit && noticeNo) {
        const convertedCategory =
          getEgType(formData.category) || formData.category;

        await patchNotice(parseInt(noticeNo), {
          title: formData.title,
          content: editor?.getHTML() || formData.content,
          category: convertedCategory,
          periodStart: formData.periodStart,
          periodEnd: formData.periodEnd,
          isFixed: formData.isFixed ?? false,
          filesNo:
            formData.files
              ?.map((file) => file.filesNo!)
              .filter((id): id is number => !!id) ?? null,
        });

        toast.success('게시글 수정이 완료되었습니다.');
        navigate(`/notice/${noticeNo}`);
      } else {
        const result = await axios.post('/api/notice', formData);
        toast.success('게시글 등록이 완료되었습니다.');
        navigate(`/notice/${result.data.noticeNo}`);
        return;
      }
    } catch (err) {
      console.error('Submit error:', err);
      toast.error('서버 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div className='w-full flex justify-center items-center min-h-screen bg-bg-gray-d py-8'>
        <div className='max-w-4xl mx-auto px-4'>
          <div className='bg-white rounded-lg shadow-md p-8 text-center py-8 text-lg text-bg-black'>
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
          <div className='w-full md:h-[140px] xl:px-0 border-t py-[10px] text-start bg-black'>
            <div className='flex flex-col gap-4 mt-2 t-r-16 px-[20px]'>
              <div className='text-lg text-bg-primary mb-4'>{error}</div>
              <Button
                onClick={() => navigate('/notice')}
                className='px-6 py-2 bg-bg-secondary hover:bg-bg-secondary text-white rounded-lg'
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
      <div className='w-full max-w-[1260px] mx-auto px-5'>
        <div className='flex justify-start items-center pb-[10px] md:pb-[20px] gap-2'>
          <div className='p-3 rounded-[5px] w-[40px] h-[40px] flex justify-center items-center text-white bg-black'>
            <FilePenLine size={40} strokeWidth={2} />
          </div>
          <strong className='p-2 text-bg-black t-b-32'>게시물 수정</strong>
        </div>
      </div>
      <form
        className='flex flex-col items-center justify-center w-full max-w-[1260px] mx-auto'
        onSubmit={handleSubmit}
      >
        <NoticeEditHeader
          formData={formData}
          setFormData={setFormData}
          loading={false}
          selectedCategory={getKoType(formData.category)}
          handleCategoryChange={(value: string) => {
            const converted = getEgType(value) || value;
            setFormData((prev) => ({
              ...prev,
              category: converted,
            }));
          }}
        />
        <div className='w-full xl:px-0 mb-4'>
          <ToolbarHeading editor={editor} />
        </div>

        <div className='w-full h-auto'>
          <NoticeEditText
            setFormData={setFormData}
            isLoading={isLoading}
            editor={editor}
          />
          <NoticeUploadEditor formData={formData} setFormData={setFormData} />
          <div className='w-full px-5 xl:px-0 py-6 border-t t-r-16 flex justify-center'></div>
          <div className='w-full px-5 xl:px-0 py-6 t-r-16 flex justify-center'>
            <NoticeNav noticeNo={noticeNo ?? ''} />
          </div>
        </div>
      </form>
    </div>
  );
}
