import { useState } from 'react';
import { Editor } from '@tiptap/react';
import { Paperclip, Image } from 'lucide-react';

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
    <Icon strokeWidth={1.5} size={26} color={color} />
  </button>
);

const buttonShadowClass =
  'border-1 border-[#ddd] p-1 rounded-sm bg-white shadow-[inset_0_-2px_2px_rgba(0,0,0,0.1)]';
const buttonShadowClassHidden =
  'border-1 border-[#ddd] p-1 rounded-sm bg-white shadow-[inset_0_-2px_2px_rgba(0,0,0,0.1)] hidden md:block';

export default function ToolbarFileUpload({ editor }: ToolbarProps) {
  const [uploadedItems, setUploadedItems] = useState<
    { file: File; url: string }[]
  >([]);

  if (!editor) return null;

  const triggerFileUpload = () => {
    document.getElementById('fileUpload')?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const items = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    // ✅ 기존 업로드 항목에 새 항목 누적 추가
    setUploadedItems((prev) => [...prev, ...items]);

    editor.chain().focus().extendMarkRange('link');
    // input 초기화 → 같은 파일 또 올릴 수 있게
    e.target.value = '';
  };

  return (
    <>
      <input type='file' id='fileUpload' hidden multiple onChange={handleFileInput} />
      <ToolbarButton
        icon={Paperclip}
        onClick={triggerFileUpload}
         className={buttonShadowClass}
      />
      <ToolbarButton
        icon={Image}
        onClick={() => {}}
        className={buttonShadowClassHidden}
      />

      {uploadedItems.length > 0 && (
        <div className='p-4 border-1 border-b-bg-gray-d h-auto w-[1200px] text-start rounded-xs absolute bottom-[40%] right-[50%] transform translate-x-[50%] translate-y-[50%] bg-white z-10'>
          <p className='t-r-16 text-btn-gray-9 mb-2'>첨부된 파일 미리보기:</p>
          <ul className='space-y-2'>
            {uploadedItems.map((item, index) => (
              <li key={index}>
                {item.file.type.startsWith('image/') ? (
                  <img
                    src={item.url}
                    alt='업로드된 이미지'
                    className='max-w-[200px] rounded'
                  />
                ) : item.file.type === 'application/pdf' ? (
                  <a
                    href={item.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='text-bg-secondary underline'
                  >
                    {item.file.name}
                  </a>
                ) : (
                  <a
                    href={item.url}
                    download
                    className='text-bg-secondary underline'
                  >
                    파일 다운로드: {item.file.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
