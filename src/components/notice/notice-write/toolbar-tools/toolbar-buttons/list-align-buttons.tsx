import { Editor } from '@tiptap/react';
import { Link, Link2Off, LucideIcon } from 'lucide-react';
import {
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';
import { toast } from 'sonner';

type ListAlignButtonsProps = {
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

export default function ListAlignButtons({ editor }: ListAlignButtonsProps) {
  if (!editor) return null;

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
    <div className='flex justify-start md:justify-center md:pl-3 items-center gap-2 md:gap-[10px]'>
      <ToolbarButton
        icon={Link}
        className={buttonShadowClass}
        onClick={setLink}
        isActive={editor.isActive('link')}
      />
      <ToolbarButton
        icon={Link2Off}
        className={buttonShadowClass}
        onClick={removeLink}
        disabled={!editor.isActive('link')}
      />
      <Divider />
      {/* 목록 */}
      <ToolbarButton
        icon={List}
        className={buttonShadowClass}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
      />
      <ToolbarButton
        icon={ListOrdered}
        className={buttonShadowClass}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
      />
      <Divider />
      {/* 정렬 */}
      <ToolbarButton
        icon={AlignLeft}
        className={buttonShadowClass}
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        isActive={editor.isActive({ textAlign: 'left' })}
      />
      <ToolbarButton
        icon={AlignCenter}
        className={buttonShadowClass}
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        isActive={editor.isActive({ textAlign: 'center' })}
      />
      <ToolbarButton
        icon={AlignRight}
        className={buttonShadowClass}
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        isActive={editor.isActive({ textAlign: 'right' })}
      />
    </div>
  );
}