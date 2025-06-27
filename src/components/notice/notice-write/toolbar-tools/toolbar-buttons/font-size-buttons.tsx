import { Editor } from '@tiptap/react';
import { useState, useEffect } from 'react';
import { AArrowDown, AArrowUp, LucideIcon } from 'lucide-react';

type FontButtonsProps = {
  editor: Editor | null;
};

const FontSizeButton = ({
  icon: Icon,
  onClick,
  disabled = false,
  color = '#333333',
  className = '',
  isActive = false,
}: {
  icon: LucideIcon;
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
  'border-1 border-[#ddd] p-1 rounded-sm shadow-[inset_0_-2px_2px_rgba(0,0,0,0.1)]';

export default function FontSizeButtons({ editor }: FontButtonsProps) {
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

  return (
    <>
      <div className='flex justify-start md:justify-center md:pl-2 items-center gap-2 md:gap-[10px]'>
        <span className='hidden md:block t-r-16 px-2 border-1 border-bg-gray-d/60 min-w-[60px] rounded-sm text-center'>
          {currentFontSize}px
        </span>
        <FontSizeButton
          icon={AArrowDown}
          onClick={decreaseFontSize}
          className={buttonShadowClass}
          disabled={currentFontSize <= fontSizes[0]}
          isActive={false}
        />
        <FontSizeButton
          icon={AArrowUp}
          onClick={increaseFontSize}
          className={buttonShadowClass}
          disabled={currentFontSize >= fontSizes[fontSizes.length - 1]}
        />
        <Divider />
      </div>
    </>
  );
}
