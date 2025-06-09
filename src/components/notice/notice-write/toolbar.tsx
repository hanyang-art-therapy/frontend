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
  Paperclip,
  Image,
  Baseline,
  Highlighter,
  Type,
} from 'lucide-react';

type ToolbarProps = {
  editor: Editor;
};

const buttonBase = 'w-[30px] h-[30px] bg-no-repeat bg-center bg-[length:26px]';
// const active = 'bg-[#e7e7e7]';
// const none = 'bg-white';

export default function Toolbar({ editor }: ToolbarProps) {
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
      <div className='flex flex-wrap justify-start text-center h-full gap-[8px]'>
        <button
          type='button'
          className='cursor-pointer'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <AArrowDown strokeWidth={1.5} size={34} color='#333333' />
        </button>
        <button
          type='button'
          className='cursor-pointer'
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          disabled={
            !editor.can().chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <AArrowUp strokeWidth={1.5} size={34} color='#333333' />
        </button>
      </div>
      {/* 구분선 */}
      <div className='w-[1px] h-[25px] mx-[15px] bg-[#cacad6]' />
      {/* Bold/Italic/Strike */}
      <div className='flex flex-wrap items-center h-full gap-[8px]'>
        <button
          type='button'
          className='cursor-pointer'
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
        >
          <Bold strokeWidth={2} color='#333333' />
        </button>
        <button
          type='button'
          className='cursor-pointer'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
        >
          <Italic strokeWidth={2} color='#333333' />
        </button>
        <button
          type='button'
          className='cursor-pointer'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          <Strikethrough strokeWidth={2} color='#333333' />
        </button>
        {/* 언더라인 주기 */}
        <button
          type='button'
          className='cursor-pointer'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
        >
          <Baseline />
        </button>
        {/* 텍스트 색상 변경 버튼 */}
        <button
          className='cursor-pointer'
          type='button'
          onClick={() => applyTextColor('red')}
        >
          <Type color='#ff0000' />
        </button>
        <button
          className='cursor-pointer'
          type='button'
          onClick={() => applyTextColor('blue')}
        >
          <Type color='#0000ff' />
        </button>

        {/* 하이라이트(배경색) 변경 버튼 */}

        <button
          type='button'
          className={`${buttonBase} cursor-pointer border-2 border-yellow-500 mr-2`}
          onClick={() => applyHighlightColor('yellow')}
        >
          <Highlighter color='#333333' />
        </button>
      </div>
      {/* 구분선 */}
      <div className='w-[1px] h-[25px] mx-[15px] bg-[#cacad6]' />
      {/* Bullet / Numbered list */}
      <div className='flex flex-wrap items-center h-full gap-[8px]'>
        <button
          type='button'
          className='cursor-pointer'
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List color='#333333' />
        </button>
        <button
          type='button'
          className='cursor-pointer'
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered color='#333333' />
        </button>
      </div>
      {/* 구분선 */}
      <div className='w-[1px] h-[25px] mx-[15px] bg-[#cacad6]' />
      {/* 정렬 */}
      <div className='flex flex-wrap items-center h-full gap-[8px]'>
        <button
          className='cursor-pointer'
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          <AlignLeft color='#333333' />
        </button>
        <button
          className='cursor-pointer'
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          <AlignCenter color='#333333' />
        </button>
        <button
          className='cursor-pointer'
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          <AlignRight color='#333333' />
        </button>
      </div>
      {/* 구분선 */}
      <div className='w-[1px] h-[25px] mx-[15px] bg-[#cacad6]' />
      {/* Link / Newline */}
      <div className='flex flex-wrap items-center h-full gap-[8px]'>
        <button
          type='button'
          className='cursor-pointer'
          onClick={() => {
            // 아직 구현되지 않은 상태
          }}
        >
          <Paperclip color='#333333' />
        </button>
        <button
          type='button'
          className='cursor-pointer'
          onClick={() => {
            // 아직 구현되지 않은 상태
          }}
        >
          <Image color='#333333' />
        </button>
        <button
          type='button'
          className='cursor-pointer'
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        />
      </div>
    </div>
  );
}
