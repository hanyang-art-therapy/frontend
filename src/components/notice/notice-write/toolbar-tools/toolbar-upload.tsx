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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  if (!editor) return null;

  const triggerFileUpload = () => {
    document.getElementById('fileUpload')?.click();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setUploadedFile(file);
    setFileUrl(url);

    editor.chain().focus().extendMarkRange('link');
  };

  return (
    <>
      <input type='file' id='fileUpload' hidden onChange={handleFileInput} />
      <ToolbarButton
        icon={Paperclip}
        onClick={triggerFileUpload}
        className={buttonShadowClassHidden}
      />
      <ToolbarButton
        icon={Image}
        onClick={() => {}}
        className={buttonShadowClass}
      />

      {uploadedFile && fileUrl && (
        <div className='p-4 border-t border-gray-300 w-full'>
          <p className='text-sm text-gray-500 mb-2'>첨부된 파일 미리보기:</p>
          {uploadedFile.type.startsWith('image/') ? (
            <img
              src={fileUrl}
              alt='업로드된 이미지'
              className='max-w-[200px] rounded'
            />
          ) : uploadedFile.type === 'application/pdf' ? (
            <a
              href={fileUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='text-blue-500 underline'
            >
              PDF 보기 또는 다운로드: {uploadedFile.name}
            </a>
          ) : (
            <a href={fileUrl} download className='text-blue-500 underline'>
              파일 다운로드: {uploadedFile.name}
            </a>
          )}
        </div>
      )}
    </>
  );
}
