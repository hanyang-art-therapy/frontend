import { useId } from 'react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

type ImageUploaderProps = {
  previewUrl: string;
  onFileChange: (file: File) => void;
  onUpload: () => void;
};

export default function ImageUploader({
  previewUrl,
  onFileChange,
  onUpload,
}: ImageUploaderProps) {
  const inputId = useId();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  const inputRef = useRef(null);

  return (
    <div className='flex flex-col items-center gap-[10px]'>
      <label
        htmlFor={inputId}
        className='w-[130px] aspect-[4/5] rounded border border-btn-gray-d cursor-pointer overflow-hidden hover:opacity-70'
      >
        <img
          src={previewUrl || 'images/fallback.jpg'}
          alt='preview'
          className='w-full h-full object-cover'
          onError={(e) => (e.currentTarget.src = 'images/fallback.jpg')}
        />
      </label>
      <input
        id={inputId}
        type='file'
        ref={inputRef}
        accept='image/*'
        onChange={handleInputChange}
        className='hidden'
      />
      <Button
        type='button'
        onClick={onUpload}
        size='sm'
        variant='secondary'
        className='w-full'
      >
        이미지 업로드
      </Button>
    </div>
  );
}
