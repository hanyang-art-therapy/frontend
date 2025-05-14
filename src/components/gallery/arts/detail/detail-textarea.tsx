import { ChangeEvent, FormEvent } from 'react';
import { Image, Navigation } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DetailTextareaProps {
  comment: string;
  onCommentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onCommentSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function DetailTextarea({
  comment,
  onCommentChange,
  onImageChange,
  onCommentSubmit,
}: DetailTextareaProps) {
  const handleImageButtonClick = () => {
    document.getElementById('imageInput')?.click(); // 파일 input 클릭 이벤트 트리거
  };

  return (
    <form onSubmit={onCommentSubmit} className='md:flex-1 flex flex-col gap-4'>
      <textarea
        name='reviewText'
        id='reviewText'
        placeholder='감상평을 작성해주세요.'
        value={comment}
        onChange={onCommentChange}
        onKeyDown={(e) => {
          if (e.nativeEvent.isComposing) return;
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const form = e.currentTarget.form;
            if (form) {
              (form as HTMLFormElement).requestSubmit();
            }
          }
        }}
        className='h-[100px] md:w-full md:h-[150px] border border-bg-gray-d rounded-sm px-3 py-2 text-sm focus:outline-none focus:ring-0'
      />

      <div className='w-full flex justify-end items-center gap-2 flex-nowrap'>
        <Button
          type='button'
          className='inline-flex items-center gap-2 t-b-14 md:t-b-16 text-white bg-primary px-2.5 md:px-4 py-0 md:py-2 rounded-full whitespace-nowrap w-[100px] md:w-[150px] '
          onClick={handleImageButtonClick}>
          이미지 첨부
          <Image size={12} className='w-3 h-3 md:w-4 md:h-4' color='#fff' />
        </Button>

        <input
          id='imageInput'
          type='file'
          hidden
          accept='image/*'
          onChange={onImageChange}
        />

        <Button
          type='submit'
          className='inline-flex items-center gap-2 t-b-14 md:t-b-16 text-white bg-primary px-2.5 md:px-4 py-0 md:py-2 rounded-full whitespace-nowrap w-[100px] md:w-[150px] '>
          댓글 업로드
          <Navigation
            size={12}
            className='w-3 h-3 md:w-4 md:h-4'
            color='#fff'
          />
        </Button>
      </div>
    </form>
  );
}
