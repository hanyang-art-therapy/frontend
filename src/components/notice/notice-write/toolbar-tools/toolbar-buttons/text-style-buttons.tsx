import { Editor } from '@tiptap/react';
import { useEffect } from 'react';
import {
  Baseline,
  Highlighter,
} from 'lucide-react';

type FontButtonsProps = {
  editor: Editor | null;
};

const ToolbarButton = ({
  icon: Icon,
  onClick,
  disabled = false,
  color = '#333333',
  className = '',
  isActive = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  onClick: () => void;
  disabled?: boolean;
  color?: string;
  className?: string;
  isActive?: boolean;
}) => (
  <button
    type='button'
    className={`cursor-pointer ${className} ${
      isActive 
        ? 'bg-[var(--bg-primary)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]' 
        : ''
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    <Icon 
      strokeWidth={1.5} 
      width={20} 
      height={20} 
      color={isActive ? 'white' : color} 
    />
  </button>
);

// 구분선
const Divider = () => (
  <div className='w-[1px] h-[25px] mx-[15px] bg-[#cacad6] hidden md:block' />
);

const buttonShadowClass =
  'border-1 border-[#ddd] p-1 rounded-sm shadow-[inset_0_-2px_2px_rgba(0,0,0,0.1)] mr-2';
const buttonShadowClassHidden =
  'border-1 border-[#ddd] p-1 rounded-sm shadow-[inset_0_-2px_2px_rgba(0,0,0,0.1)] hidden md:block';

export default function TextStyleButtons({ editor }: FontButtonsProps) {
 
  useEffect(() => {
    if (!editor) return;

    const updateFontSize = () => {
      const { from, to } = editor.state.selection;
      if (from === to) return;
    };

    editor.on('selectionUpdate', updateFontSize);
    return () => {
      editor.off('selectionUpdate', updateFontSize);
    };
  }, [editor]);

  if (!editor) return null;

  const applyHighlightColor = (color: string) => {
    editor.chain().focus().toggleHighlight({ color }).run();
  };

  return (
    <>
      <div className='flex justify-start md:justify-center md:pl-2 items-center gap-2 md:gap-[10px]'>
      </div>
      <div className='flex justify-start md:justify-center md:pl-3 items-center gap-2 md:gap-[10px]'>
        <ToolbarButton
          icon={Baseline}
          className={buttonShadowClass}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          disabled={!editor.can().chain().focus().toggleUnderline().run()}
          isActive={editor.isActive('underline')}
        />
        <Divider />
        <ToolbarButton
          icon={Highlighter}
          className={buttonShadowClassHidden}
          onClick={() => applyHighlightColor('yellow')}
          isActive={editor.isActive('highlight')}
        />
      </div>
    </>
  );
}