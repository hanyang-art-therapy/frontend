import { Editor } from '@tiptap/react';
import {
  AArrowUp,
  AArrowDown,
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
    <Icon strokeWidth={1.5} size={26} color={color} />
  </button>
);

const Divider = () => (
  <div className='w-[1px] h-[25px] mx-[15px] bg-[#cacad6]' />
);

export default function ToolbarHeading({ editor }: ToolbarProps) {
  if (!editor) return null;

  const applyTextColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  const applyHighlightColor = (color: string) => {
    editor.chain().focus().toggleHighlight({ color }).run();
  };

  return (
    <div className='flex items-center justify-start p-[10px] border-b border-[#cacad6]'>
      {/* Heading */}
      <div className='flex gap-[8px]'>
        <ToolbarButton
          icon={AArrowDown}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
          }
        />
        <ToolbarButton
          icon={AArrowUp}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
          }
        />
      </div>

      <Divider />

      {/* Text Styles */}
      <div className='flex gap-[8px]'>
        <ToolbarButton
          icon={Bold}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        />
        <ToolbarButton
          icon={Italic}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        />
        <ToolbarButton
          icon={Strikethrough}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        />
        <ToolbarButton
          icon={Baseline}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
        />
        <ToolbarButton
          icon={Type}
          color='red'
          onClick={() => applyTextColor('red')}
        />
        <ToolbarButton
          icon={Type}
          color='blue'
          onClick={() => applyTextColor('blue')}
        />
        <ToolbarButton
          icon={Highlighter}
          className='border-2 border-yellow-500 mr-2'
          onClick={() => applyHighlightColor('yellow')}
        />
        <ToolbarButton
          icon={PenLine}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
      </div>

      <Divider />

      {/* Lists */}
      <div className='flex gap-[8px]'>
        <ToolbarButton
          icon={List}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        />
        <ToolbarButton
          icon={ListOrdered}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        />
      </div>

      <Divider />

      {/* Align */}
      <div className='flex gap-[8px]'>
        <ToolbarButton
          icon={AlignLeft}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        />
        <ToolbarButton
          icon={AlignCenter}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        />
        <ToolbarButton
          icon={AlignRight}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        />
      </div>
    </div>
  );
}
