import { Upload } from 'lucide-react';
import type { ChangeEvent } from 'react';

type ReviewsModalImageUploaderProps = {
  onUpload: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function ReviewsModalImageUploader({
  onUpload,
}: ReviewsModalImageUploaderProps) {
  return (
    <div className='relative border-2 border-dashed border-bg-gray-d rounded-[5px] bg-bg-gray-fa hover:border-gray-6 transition-all duration-300 cursor-pointer group'>
      <input
        type='file'
        accept='image/*'
        onChange={onUpload}
        className='absolute top-0 left-0 h-full opacity-0 cursor-pointer'
      />
      <div className='inset-0 flex flex-col items-center justify-center p-4 sm:p-6'>
        <div className='w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300'>
          <Upload className='w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:text-primary/80 transition-colors duration-300' />
        </div>
        <span className='t-m-16 text-gray-6 text-center mb-2 group-hover:text-gray-3 transition-colors duration-200 px-2'>
          이미지를 업로드하려면 클릭하세요
        </span>
        <div className='flex items-center gap-2 px-2 sm:px-3 py-1 bg-white/80 rounded-full border border-bg-gray-d'>
          <span className='t-r-12 text-gray-6'>JPG, PNG등 사진 파일 지원</span>
        </div>
      </div>
    </div>
  );
}
