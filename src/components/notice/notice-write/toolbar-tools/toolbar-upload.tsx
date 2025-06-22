import React, { useState, useRef } from 'react';
import { Editor } from '@tiptap/react';
import { Paperclip, Image, Download, X, LucideIcon } from 'lucide-react';
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
  const [showPreview, setShowPreview] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [internalUploadedFiles, setInternalUploadedFiles] = useState<
    NoticeFile[]
  >([]);

  const actualUploadedFiles = uploadedFiles;
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

        actualSetUploadedFiles((prev) => {
          const updated = [...(prev || []), ...newFiles];
          console.log('업로드 후 상태 (newFiles 추가됨):', updated);
          return updated;
        });

        setShowPreview(true);
        toast.success(`${newFiles.length}개의 파일이 업로드되었습니다.`);
      } else {
        const items = files.map((file) => ({
          file,
          name: file.name,
          url: URL.createObjectURL(file),
          isNew: true,
        }));

        actualSetUploadedFiles((prev) => {
          const updated = [...(prev || []), ...items];
          console.log('업로드 후 상태 (파일 선택):', updated);
          return updated;
        });

        setShowPreview(true);
        toast.success(`${items.length}개의 파일이 선택되었습니다.`);
      }

      if (onFilesSelected) {
        onFilesSelected(files);
      }

      editor.chain().focus().extendMarkRange('link').run();
    } catch (error) {
      console.error('파일 업로드 에러:', error);
      toast.error('파일 업로드에 실패했습니다.');
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

    actualSetUploadedFiles((prev) => {
      const updated = (prev || []).filter((_, i) => i !== index);
      console.log('파일 삭제 후 상태:', updated);
      return updated;
    });
    toast.success('파일이 삭제되었습니다.');
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  const previewFiles = (actualUploadedFiles || []).filter((file) => file.isNew);

  console.log('렌더링 시 uploadedFiles 상태:', actualUploadedFiles);

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

      <div className='flex gap-2 items-center'>
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
          <span className='text-sm text-blue-600'>업로드 중...</span>
        )}
      </div>

      {actualUploadedFiles && actualUploadedFiles.length > 0 && (
        <div className='mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50'>
          <p className='text-sm text-gray-700 mb-2 font-medium'>
            첨부된 파일 ({actualUploadedFiles.length}개):
          </p>
          <div className='space-y-2'>
            {actualUploadedFiles.map((file, index) => (
              <div
                key={index}
                className='flex items-center justify-between group bg-white p-2 rounded border'
              >
                <div className='flex items-center gap-2'>
                  <div className='bg-blue-600 w-[20px] h-[20px] rounded-sm flex justify-center items-center'>
                    <Download size={14} color='white' strokeWidth={2} />
                  </div>
                  <span className='text-blue-600 text-sm'>{file.name}</span>
                  {file.isNew && (
                    <span className='text-xs bg-green-100 text-green-800 px-2 py-1 rounded'>
                      새 파일
                    </span>
                  )}
                </div>
                <button
                  type='button'
                  onClick={() => removeFile(index)}
                  className='text-red-500 hover:text-red-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity'
                >
                  삭제
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {showPreview && previewFiles.length > 0 && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto relative'>
            <button
              onClick={closePreview}
              className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
            >
              <X size={24} />
            </button>
            <h3 className='text-lg font-semibold mb-4'>
              새로 추가된 파일 미리보기
            </h3>
            <div className='space-y-4'>
              {previewFiles.map((item, index) => (
                <div key={index} className='border p-4 rounded-lg'>
                  <div className='flex justify-between items-start mb-2'>
                    <h4 className='font-medium'>{item.name}</h4>
                    <button
                      onClick={() => {
                        const originalIndex = actualUploadedFiles.findIndex(
                          (f) => f === item
                        );
                        if (originalIndex !== -1) {
                          removeFile(originalIndex);
                        }
                      }}
                      className='text-red-500 hover:text-red-700 text-sm'
                    >
                      삭제
                    </button>
                  </div>
                  {item.file?.type?.startsWith('image/') ||
                  item.url.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                    <img
                      src={item.url}
                      alt='업로드된 이미지'
                      className='max-w-[300px] max-h-[200px] object-contain rounded'
                    />
                  ) : item.file?.type === 'application/pdf' ||
                    item.url.endsWith('.pdf') ? (
                    <div className='flex items-center gap-2'>
                      <span>📄</span>
                      <a
                        href={item.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-gray-600 underline'
                      >
                        PDF 파일 - {item.name}
                      </a>
                    </div>
                  ) : (
                    <div className='flex items-center gap-2'>
                      <span>📎</span>
                      <a
                        href={item.url}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-gray-600 underline'
                      >
                        파일 - {item.name}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
