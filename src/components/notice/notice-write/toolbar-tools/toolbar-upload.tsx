import React, { useState, useRef } from 'react';
import { Editor } from '@tiptap/react';
import { Paperclip, Image, Download, LucideIcon } from 'lucide-react';
import { toast } from 'sonner';
import { postFile } from '@/apis/common/file';

type NoticeFile = {
  filesNo?: number;
  name: string;
  url: string;
  file?: File;
  isNew?: boolean;
};

type ToolbarProps = {
  editor: Editor | null;
  onFilesSelected?: (files: File[]) => void;
  uploadedFiles?: NoticeFile[];
  setUploadedFiles?: React.Dispatch<React.SetStateAction<NoticeFile[]>>;
};

type ToolbarButtonProps = {
  icon: LucideIcon;
  onClick: () => void;
  disabled?: boolean;
  color?: string;
  className?: string;
};

const ToolbarButton = ({
  icon: Icon,
  onClick,
  disabled = false,
  color = '#333333',
  className = '',
}: ToolbarButtonProps) => (
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

export default function ToolbarUpload({
  editor,
  onFilesSelected,
  uploadedFiles = [],
  setUploadedFiles,
}: ToolbarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  // 내부 상태 관리 (uploadedFiles, setUploadedFiles가 없을 때 대비)
  const [internalUploadedFiles, setInternalUploadedFiles] = useState<
    NoticeFile[]
  >([]);

  // 실제 사용하는 파일 상태와 setter
  const actualUploadedFiles = uploadedFiles.length
    ? uploadedFiles
    : internalUploadedFiles;
  const actualSetUploadedFiles = setUploadedFiles || setInternalUploadedFiles;

  if (!editor) return null;

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      if (typeof postFile === 'function') {
        const response = await postFile(files);

        const newFiles: NoticeFile[] = response.map((file, i) => ({
          filesNo: file.filesNo,
          name: file.name,
          url: file.url,
          file: files[i],
          isNew: true,
        }));

        actualSetUploadedFiles((prev) => [...(prev || []), ...newFiles]);
        toast.success(`${newFiles.length}개의 파일이 업로드되었습니다.`);
      } else {
        const items = files.map((file) => ({
          file,
          name: file.name,
          url: URL.createObjectURL(file),
          isNew: true,
        }));

        actualSetUploadedFiles((prev) => [...(prev || []), ...items]);
        toast.success(`${items.length}개의 파일이 선택되었습니다.`);
      }

      if (onFilesSelected) {
        onFilesSelected(files);
      }

      editor.chain().focus().extendMarkRange('link').run();
    } catch (error) {
      console.error('파일 업로드 에러:', error);
      toast.error('파일 용량이 커서 업로드에 실패하였습니다.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const removeFile = (index: number) => {
    const fileToRemove = actualUploadedFiles[index];
    if (fileToRemove?.url?.startsWith('blob:')) {
      URL.revokeObjectURL(fileToRemove.url);
    }

    actualSetUploadedFiles((prev) =>
      (prev || []).filter((_, i) => i !== index)
    );
    toast.success('파일이 삭제되었습니다.');
  };

  // showPreview 대신 파일 존재 여부로 미리보기 표시 결정
  const hasFiles = actualUploadedFiles && actualUploadedFiles.length > 0;

  return (
    <div className='relative'>
      <input
        type='file'
        hidden
        multiple
        ref={fileInputRef}
        onChange={handleFileInput}
        disabled={uploading}
      />
     <div className='w-full h-auto min-h-[70px] md:px-5 py-4 md:py-6 border-t border-b border-bg-gray-d flex flex-col gap-2 bg-btn-gray-fa'>
       <div className='px-4 md:px-6 flex flex-col gap-2 md:gap-4'>
          <div className='flex gap-2 items-center'>
            <span className='t-b-16 text-bg-black mr-4'>파일 첨부:</span>
            <input
              type='file'
              id='fileUpload'
              hidden
              multiple
              ref={fileInputRef}
              onChange={handleFileInput}
              disabled={uploading}
            />
            <ToolbarButton
              icon={Paperclip}
              onClick={triggerFileUpload}
              className={buttonShadowClass}
              disabled={uploading}
            />
            <ToolbarButton
              icon={Image}
              onClick={triggerFileUpload}
              className={buttonShadowClassHidden}
              disabled={uploading}
            />
            {uploading && (
              <span className='t-r-16 text-bg-secondary'>업로드 중...</span>
            )}
          </div>

          <div className='flex flex-col gap-2 t-r-16 text-start'>
            {!hasFiles ? (
              <div>첨부된 파일이 없습니다.</div>
            ) : (
              actualUploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between group'
                >
                  <div className='flex items-center gap-2 cursor-pointer w-max border-b border-transparent hover:border-b hover:border-gray-400'>
                    <div className='bg-bg-secondary w-[20px] h-[20px] md:w-[22px] md:h-[22px] rounded-sm flex justify-center items-center'>
                      <Download size={16} color='white' strokeWidth={2} />
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-bg-secondary'>{file.name}</span>
                      {file.isNew && (
                        <span className='text-xs bg-bg-secondary/40 text-bg-black px-2 py-1 rounded'>
                          새 파일
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type='button'
                    onClick={() => removeFile(index)}
                    className='cursor-pointer hover:bg-black p-1 rounded-sm text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    삭제
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
