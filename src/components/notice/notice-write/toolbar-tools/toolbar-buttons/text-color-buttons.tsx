import { Editor } from '@tiptap/react';
import {
  Bold,
  Italic,
  LucideIcon,
  Strikethrough,
} from 'lucide-react';

type FontButtonsProps = {
  editor: Editor | null;
};

const ColorButton = ({
  color,
  onClick,
  className = '',
  isActive = false,
}: {
  color: string;
  onClick: () => void;
  className?: string;
  isActive?: boolean;
}) => (
  <button
    type='button'
    className={`cursor-pointer ${className} ${
      isActive 
        ? 'shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]' 
        : ''
    }`}
    onClick={onClick}
  >
    <div 
      className="w-[20px] h-[20px] border border-bg-gray-d/60"
      style={{ backgroundColor: color }}
    />
  </button>
);

const ToolbarButton = ({
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
  <div className='w-[1px] h-[25px] mx-[15px] bg-bg-gray-d hidden md:block' />
);

const buttonShadowClass =
  'border-1 border-[#ddd] p-1 rounded-sm shadow-sm';

export default function TextColorButtons({ editor }: FontButtonsProps) {


  if (!editor) return null;


  const getCurrentTextColor = (editor: Editor): string => {
    const { $from } = editor.state.selection;
    const marks = $from.marks();
    for (const mark of marks) {
      if (mark.type.name === 'textStyle' && mark.attrs.color) {
        return mark.attrs.color;
      }
    }
    return '#333333';
  };

  const currentTextColor = getCurrentTextColor(editor);

  return (
    <>
      <div className='flex justify-start md:justify-center md:pl-2 items-center gap-2 md:gap-[10px]'>
        {/* 색상 버튼들 */}
        <ColorButton
          color="#da0016"
          className={buttonShadowClass}
          onClick={() => editor.chain().focus().setColor('#da0016').run()}
          isActive={currentTextColor === '#da0016'}
        />
        <ColorButton
          color="#0000e7"
          className={buttonShadowClass}
          onClick={() => editor.chain().focus().setColor('#0000e7').run()}
          isActive={currentTextColor === '#0000e7'}
        />
        <ColorButton
          color="#333333"
          className={buttonShadowClass}
          onClick={() => editor.chain().focus().setColor('#333333').run()}
          isActive={currentTextColor === '#333333'}
        />
        <Divider />
          <ToolbarButton
          icon={Bold}
          className={buttonShadowClass}
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
        />
        <ToolbarButton
          icon={Italic}
          className={buttonShadowClass}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
        />
        <ToolbarButton
          icon={Strikethrough}
          className={buttonShadowClass}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
        />
      </div>
    </>
  );
}