import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { Paperclip, Download } from 'lucide-react';
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
      isActive ? 'bg-[var(--bg-primary)] shadow-sm' : ''
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

const buttonShadowClass =
  'border-1 border-[#ddd] p-1 rounded-sm shadow-sm mr-2';

export default function NoticeUploadEditor({
  formData,
  setFormData,
}: NoticeUploadEditorProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [, setShowPreview] = useState(false);

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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const hasFiles = formData.files && formData.files.length > 0;

  return (
    <div className='relative px-[10px] md:px-0'>
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
              isActive={hasFiles} 
            />
           
            {uploading && (
              <span className='t-r-16 text-bg-secondary'>업로드 중...</span>
            )}
          </div>

          <div className='flex flex-col gap-2 t-r-16 text-start'>
            {!hasFiles ? (
              <div>첨부된 파일이 없습니다.</div>
            ) : (
              formData.files?.map((file, index) => (
                <div
                  key={index}
                  className='flex items-center justify-between group gap-2 mr-4 md:mr-0'
                >
                  <div className='flex items-center gap-2 cursor-pointer w-max border-b border-transparent hover:border-bg-gray-d'>
                    <div className='w-[20px] h-[20px] md:w-[22px] md:h-[22px] text-primary flex justify-center items-center'>
                      <Download size={16} strokeWidth={2} />
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-bg-secondary'>{file.name}</span>
                      {file.isNew && (
                        <span className='flex justify-center items-center w-[82px] h-[24px] t-r-14 bg-bg-secondary/40 text-white px-2 py-1 rounded'>
                          새 파일
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    type='button'
                    onClick={() => removeFile(index)}
                    className='min-w-[46px] cursor-pointer p-1 rounded-sm text-white font-medium t-b-14 bg-bg-gray-d hover:bg-btn-dark-3'
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