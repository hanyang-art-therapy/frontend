import { Editor } from '@tiptap/react';
import { useState, useEffect } from 'react';
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
import ToolbarFileUpload from './toolbar-upload';

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
    <Icon strokeWidth={1.5} width={26} height={26} color={color} />
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
    <Icon strokeWidth={1.5} width={26} height={26} color={color} />
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
    <Icon strokeWidth={1.5} width={26} height={26} color={color} />
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

  // 폰트 사이즈 증가
  const increaseFontSize = () => {
    const currentIndex = fontSizes.indexOf(currentFontSize);
    const nextIndex = Math.min(currentIndex + 1, fontSizes.length - 1);
    const newSize = fontSizes[nextIndex];

    editor.chain().focus().setFontSize(`${newSize}px`).run();
    setCurrentFontSize(newSize);
  };

  // 폰트 사이즈 감소
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

  return (
    <div className='w-full md:border-1 md:rounded-sm md:border-gray-300'>
      <div className='flex flex-col md:flex-row md:items-center justify-center md:justify-start md:p-[10px] gap-2 md:gap-0'>
        {/* 글씨 크기 */}
        <div className='flex justify-center items-center gap-[10px]'>
          {/* 현재 폰트 사이즈 */}
          <span className='text-sm font-medium px-2 min-w-[40px] text-center'>
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
          {/* 밑줄 */}
          <ToolbarButton
            icon={Baseline}
            className={buttonShadowClass}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            disabled={!editor.can().chain().focus().toggleUnderline().run()}
          />
          {/* <ToolbarButton
            icon={Type}
            className={buttonShadowClass}
            color='red'
            onClick={() => applyTextColor('red')}
          /> */}
          <ToolbarButton
            icon={Highlighter}
            className={buttonShadowClassHidden}
            onClick={() => applyHighlightColor('yellow')}
          />
        </div>
        <Divider />
        {/* 목록 */}
        <div className='flex justify-center items-center gap-[10px]'>
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
