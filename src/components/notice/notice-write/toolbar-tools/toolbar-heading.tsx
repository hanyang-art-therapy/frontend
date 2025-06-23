import { Editor } from '@tiptap/react';
import { useState, useEffect } from 'react';
import { Link, Link2Off } from 'lucide-react';
import {
  AArrowDown,
  AArrowUp,
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Baseline,
  Highlighter,
} from 'lucide-react';
import { toast } from 'sonner';

type ToolbarProps = {
  editor: Editor | null;
};

const ToolbarButton = ({
  icon: Icon,
  onClick,
  disabled = false,
  color = '#333333',
  className = '',
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  onClick: () => void;
  disabled?: boolean;
  color?: string;
  className?: string;
}) => (
  <button
    type='button'
    className={`cursor-pointer ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    <Icon strokeWidth={1.5} width={20} height={20} color={color} />
  </button>
);

const FontSizeButton = ({
  icon: Icon,
  onClick,
  disabled = false,
  color = '#333333',
  className = '',
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  onClick: () => void;
  disabled?: boolean;
  color?: string;
  className?: string;
}) => (
  <button
    type='button'
    className={`cursor-pointer ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    <Icon strokeWidth={1.5} width={20} height={20} color={color} />
  </button>
);

const buttonShadowClass =
  'border-1 border-[#ddd] p-1 rounded-sm bg-white shadow-[inset_0_-2px_2px_rgba(0,0,0,0.1)]';
const buttonShadowClassHidden =
  'border-1 border-[#ddd] p-1 rounded-sm bg-white shadow-[inset_0_-2px_2px_rgba(0,0,0,0.1)] hidden md:block';

// 구분선
const Divider = () => (
  <div className='w-[1px] h-[25px] mx-[15px] bg-[#cacad6] hidden md:block' />
);

export default function ToolbarHeading({ editor }: ToolbarProps) {
  const [currentFontSize, setCurrentFontSize] = useState(16);
  const fontSizes = [10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48];

  useEffect(() => {
    if (!editor) return;

    const updateFontSize = () => {
      const { from, to } = editor.state.selection;
      if (from === to) return;

      const selectedText = editor.state.doc.textBetween(from, to);
      if (selectedText) {
        const currentSize = getCurrentFontSize(editor);
        if (currentSize) {
          setCurrentFontSize(currentSize);
        }
      }
    };

    editor.on('selectionUpdate', updateFontSize);
    return () => {
      editor.off('selectionUpdate', updateFontSize);
    };
  }, [editor]);

  if (!editor) return null;

  const getCurrentFontSize = (editor: Editor): number => {
    const { $from } = editor.state.selection;
    const marks = $from.marks();
    for (const mark of marks) {
      if (mark.type.name === 'textStyle' && mark.attrs.fontSize) {
        return parseInt(mark.attrs.fontSize.replace('px', ''));
      }
    }

    return 16;
  };

  const increaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(currentFontSize);
    const nextIndex = Math.min(currentIndex + 1, fontSizes.length - 1);
    const newSize = fontSizes[nextIndex];

    editor.chain().focus().setFontSize(`${newSize}px`).run();
    setCurrentFontSize(newSize);
  };

  const decreaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(currentFontSize);
    const prevIndex = Math.max(currentIndex - 1, 0);
    const newSize = fontSizes[prevIndex];

    editor.chain().focus().setFontSize(`${newSize}px`).run();
    setCurrentFontSize(newSize);
  };

  const applyHighlightColor = (color: string) => {
    editor.chain().focus().toggleHighlight({ color }).run();
  };

  const setLink = () => {
    if (!editor) {
      console.error('Editor is not available');
      return;
    }

    if (!editor.isEditable) {
      console.error('Editor is not ready');
      toast.error(
        '에디터가 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.'
      );
      return;
    }

    const hasLinkExtension = editor.extensionManager.extensions.some(
      (ext) => ext.name === 'link'
    );
    const hasSetLinkCommand = 'setLink' in editor.commands;

    if (!hasLinkExtension || !hasSetLinkCommand) {
      console.error('Link extension or command is not available');
      toast.error(
        '링크 기능을 사용할 수 없습니다. 확장이 로드되지 않았습니다.'
      );
      return;
    }
    const { from, to } = editor.state.selection;
    const selectedText = editor.state.doc.textBetween(from, to);

    if (!selectedText) {
      toast.error('링크를 적용할 텍스트를 먼저 선택해주세요.');
      return;
    }

    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('링크 주소를 입력하세요:', previousUrl || '');
    if (url === null) {
      return;
    }

    // 링크 제거
    if (url === '') {
      try {
        editor.chain().focus().unsetLink().run();
        toast.success('링크가 제거되었습니다.');
      } catch (error) {
        console.error('Error removing link:', error);
        toast.error('링크 제거 중 오류가 발생했습니다.');
      }
      return;
    }

    // URL 유효성 검사 및 링크 설정
    let validUrl = url.trim();
    if (
      !validUrl.startsWith('http://') &&
      !validUrl.startsWith('https://') &&
      !validUrl.startsWith('mailto:')
    ) {
      validUrl = 'https://' + validUrl;
    }

    try {
      editor.chain().focus().setLink({ href: validUrl }).run();

      toast.success('링크가 설정되었습니다.');
    } catch (error) {
      console.error('Error setting link:', error);
      toast.error('링크 설정 중 오류가 발생했습니다.');
    }
  };

  const removeLink = () => {
    if (!editor) return;

    try {
      editor.chain().focus().unsetLink().run();
      toast.success('링크가 제거되었습니다.');
    } catch (error) {
      console.error('Error removing link:', error);
      toast.error('링크 제거 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='w-full md:border-1 md:rounded-sm md:border-b-2 border-bg-gray-d/60'>
      <div className='flex flex-col md:flex-row md:items-center justify-center md:justify-start md:p-[10px] gap-2 md:gap-0'>
        {/* 글씨 크기 */}
        <div className='flex justify-center items-center gap-[10px]'>
          {/* 현재 폰트 사이즈 */}
          <span className='hidden md:block t-r-16 font px-2 min-w-[40px] text-center'>
            {currentFontSize}px
          </span>
          <FontSizeButton
            icon={AArrowDown}
            onClick={decreaseFontSize}
            className={buttonShadowClass}
            disabled={currentFontSize <= fontSizes[0]}
          />
          <FontSizeButton
            icon={AArrowUp}
            onClick={increaseFontSize}
            className={buttonShadowClass}
            disabled={currentFontSize >= fontSizes[fontSizes.length - 1]}
          />
          <Divider />
          <ToolbarButton
            icon={() => (
              <div className='w-[20px] h-[20px] bg-[#da0016] border border-gray-300' />
            )}
            className={buttonShadowClass}
            onClick={() => editor.chain().focus().setColor('red').run()}
          />
          <ToolbarButton
            icon={() => (
              <div className='w-[20px] h-[20px] bg-[#0000e7] border border-gray-300' />
            )}
            className={buttonShadowClass}
            onClick={() => editor.chain().focus().setColor('#0000e7').run()}
          />
          <ToolbarButton
            icon={() => (
              <div className='w-[20px] h-[20px] bg-btn-dark-3 border border-gray-300' />
            )}
            className={buttonShadowClass}
            onClick={() => editor.chain().focus().setColor('#333333').run()}
          />
          <Divider />

          {/* 글꼴 스타일 */}
          <ToolbarButton
            icon={Bold}
            className={buttonShadowClass}
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
          />
          <ToolbarButton
            icon={Italic}
            className={buttonShadowClass}
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
          />
          <ToolbarButton
            icon={Strikethrough}
            className={buttonShadowClass}
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
          />
        </div>
        {/* 목록 */}
        <div className='flex justify-center items-center gap-[10px] mb-0 ml-2.5'>
          <ToolbarButton
            icon={Link}
            className={`${buttonShadowClass} ${
              editor.isActive('link') ? 'bg-blue-100' : ''
            }`}
            onClick={setLink}
          />
          <ToolbarButton
            icon={Link2Off}
            className={buttonShadowClass}
            onClick={removeLink}
            disabled={!editor.isActive('link')}
          />
          <ToolbarButton
            icon={Baseline}
            className={buttonShadowClass}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
          />
          <Divider />
          <ToolbarButton
            icon={Highlighter}
            className={buttonShadowClassHidden}
            onClick={() => applyHighlightColor('yellow')}
          />
          <ToolbarButton
            icon={List}
            className={buttonShadowClass}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          />
          <ToolbarButton
            icon={ListOrdered}
            className={buttonShadowClass}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          />
          <Divider />
          {/* 정렬 */}
          <ToolbarButton
            icon={AlignLeft}
            className={buttonShadowClass}
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
          />
          <ToolbarButton
            icon={AlignCenter}
            className={buttonShadowClass}
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
          />
          <ToolbarButton
            icon={AlignRight}
            className={buttonShadowClass}
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
          />
        </div>
        <Divider />
      </div>
    </div>
  );
}
