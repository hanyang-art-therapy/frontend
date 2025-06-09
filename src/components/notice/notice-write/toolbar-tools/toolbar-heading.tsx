import { Editor } from '@tiptap/react';
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
  Type,
  PenLine,
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

const buttonShadowClass =
  'border-1 border-[#ddd] p-1 rounded-sm bg-white shadow-[inset_0_-2px_2px_rgba(0,0,0,0.1)]';
const buttonShadowClassHidden =
  'border-1 border-[#ddd] p-1 rounded-sm bg-white shadow-[inset_0_-2px_2px_rgba(0,0,0,0.1)] hidden md:block';
// 구분선
const Divider = () => (
  <div className='w-[1px] h-[25px] mx-[15px] bg-[#cacad6] hidden md:block' />
);

export default function ToolbarHeading({ editor }: ToolbarProps) {
  if (!editor) return null;

  const applyTextColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  const applyHighlightColor = (color: string) => {
    editor.chain().focus().toggleHighlight({ color }).run();
  };

  if (!editor) return null;

  return (
    <div className='w-full md:border-1 md:rounded-sm md:border-[#cacad6]'>
      <div className='flex flex-col md:flex-row md:items-center justify-center md:justify-start md:p-[10px] gap-2 md:gap-0'>
        {/* 글씨 크기 */}

        <div className='flex justify-center items-center gap-[10px]'>
          <ToolbarButton
            icon={AArrowDown}
            className={buttonShadowClass}
            onClick={() => editor.chain().focus().setFontSize('20px').run()}
          />
          <ToolbarButton
            icon={AArrowUp}
            className={buttonShadowClass}
            onClick={() => editor.chain().focus().setFontSize('30px').run()}
          />
          <Divider />
          {/* Text Styles */}
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

        {/* Lists */}
        <div className='flex justify-center items-center gap-[10px]'>
          {/* <ToolbarButton
            icon={Type}
            className={buttonShadowClass}
            color='blue'
            onClick={() => applyTextColor('blue')}
          /> */}
          {/* <ToolbarButton
            icon={PenLine}
            className={buttonShadowClass}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          /> */}
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
          <div className='flex gap-[8px] md:pl-[8px]'>
            <ToolbarFileUpload editor={editor} />
          </div>
          <Divider />

          {/* Align */}

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
