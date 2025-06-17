import { useState } from "react";
import { toast } from 'sonner';

interface NoticeFile {
  name: string;
  url: string;
}

interface NoticeData {
  title: string;
  category: string;
  content: string;
  periodStart: string;
  periodEnd: string;
  files?: NoticeFile[];
}

export default function NoticeUploadEditor() {
      const [formData, setFormData] = useState<NoticeData>({
        title: '',
        category: 'GENERAL',
        content: '',
        periodStart: '',
        periodEnd: '',
        files: [],
      });

        const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files?.filter((_, i) => i !== index) || [],
    }));
    toast.success('파일이 삭제되었습니다.');
  };
    return (
             <div
            className='w-full h-auto min-h-[70px] md:px-5 py-4 md:py-6 border-t flex flex-col gap-2'
            style={{ backgroundColor: 'rgba(221, 221, 221, 0.2)' }}
          >
            <div className='px-6 flex flex-col gap-4'>
              <div>첨부된 파일이 없습니다.</div>
              <div className='flex flex-col gap-2 t-r-16'>
                {formData.files && formData.files.length > 0 && (
                  <div>
                    <div className='space-y-2'>
                      {formData.files.map((file, index) => (
                        <div
                          key={index}
                          className='flex items-center justify-between p-3 bg-white rounded-lg'
                        >
                          <span className='text-bg-secondary hover:text-bg-secondary cursor-pointer'>
                            📎 {file.name}
                          </span>
                          <button
                            type='button'
                            onClick={() => removeFile(index)}
                            className='text-[#ff4d00] hover:text-[#ff4d00] font-medium'
                          >
                            삭제
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
    )
}