// NoticeUploadEditor.tsx
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Paperclip, Image, Download, X } from 'lucide-react';
import { postFile } from '@/apis/common/file';

type NoticeFile = {
  filesNo?: number;
  name: string;
  url: string;
  file?: File;
  isNew?: boolean;
};

type NoticeData = {
  title: string;
  category: string;
  content: string;
  periodStart: string;
  periodEnd: string;
  isFixed?: boolean;
  files?: NoticeFile[];
};

type NoticeUploadEditorProps = {
  formData: NoticeData;
  setFormData: React.Dispatch<React.SetStateAction<NoticeData>>;
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

export default function NoticeUploadEditor({
  formData,
  setFormData,
}: NoticeUploadEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const response = await postFile(files);
      const uploadedFiles: NoticeFile[] = response.map((file, i) => ({
        filesNo: file.filesNo,
        name: file.name,
        url: file.url,
        file: files[i],
        isNew: true,
      }));

      setFormData((prev) => ({
        ...prev,
        files: [...(prev.files || []), ...uploadedFiles],
      }));

      setShowPreview(true);
      toast.success(`${uploadedFiles.length}개의 파일이 업로드되었습니다.`);
    } catch (error) {
      toast.error('파일 업로드에 실패했습니다.');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const removeFile = (index: number) => {
    const fileToRemove = formData.files?.[index];
    if (fileToRemove?.isNew && fileToRemove.url?.startsWith('blob:')) {
      URL.revokeObjectURL(fileToRemove.url);
    }

    setFormData((prev) => ({
      ...prev,
      files: prev.files?.filter((_, i) => i !== index) || [],
    }));

    toast.success('파일이 삭제되었습니다.');
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  const previewFiles = formData.files?.filter((file) => file.isNew) || [];

  return (
    <div className='relative'>
      <div className='w-full h-auto min-h-[70px] md:px-5 py-4 md:py-6 border-t flex flex-col gap-2 bg-btn-gray-fa'>
        <div className='px-6 flex flex-col gap-4'>
          <div className='flex gap-2 items-center'>
            <span className='t-r-16s text-btn-dark-3 mr-4'>파일 첨부:</span>
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

          <div className='flex flex-col gap-2 t-r-16'>
            {!formData.files || formData.files.length === 0 ? (
              <div>첨부된 파일이 없습니다.</div>
            ) : (
              formData.files.map((file, index) => (
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
                        <span className='text-xs bg-bg-secondary/40 text-btn-dark-3 px-2 py-1 rounded'>
                          새 파일
                        </span>
                      )}
                      {file.filesNo && (
                        <span className='text-xs bg-bg-gray-fa text-btn-dark-3 px-2 py-1 rounded'>
                          ID: {file.filesNo}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type='button'
                    onClick={() => removeFile(index)}
                    className='text-bg-primary/60 hover:text-bg-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity'
                  >
                    삭제
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showPreview && previewFiles.length > 0 && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <div className='bg-white p-6 rounded-lg max-w-4xl max-h-[80vh] overflow-y-auto relative'>
            <button
              onClick={closePreview}
              className='absolute top-4 right-4 text-btn-gray-9 hover:text-btn-dark-3'
            >
              <X size={24} />
            </button>
            <h3 className='t-m-18 mb-4'>새로 추가된 파일 미리보기</h3>
            <div className='space-y-4'>
              {previewFiles.map((item, index) => (
                <div key={index} className='border p-4 rounded-lg'>
                  <div className='flex justify-between items-start mb-2'>
                    <h4 className='font-medium'>{item.name}</h4>
                    <button
                      onClick={() => removeFile(index)}
                      className='text-bg-primary/60 hover:text-bg-primary t-r-16'
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
