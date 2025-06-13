'use client';

import type { ChangeEvent, KeyboardEvent } from 'react';

type ReviewsModalTextAreaProps = {
  isEditing: boolean;
  editedText: string;
  handleTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
};

export default function ReviewsModalTextArea({
  isEditing,
  editedText,
  handleTextChange,
  handleKeyDown,
}: ReviewsModalTextAreaProps) {
  return (
    <div className='flex flex-col flex-1 w-full'>
      <div className='flex flex-col sm:flex-row sm:items-center mb-4 gap-2 sm:gap-0'>
        <h3 className='t-b-16'>리뷰 내용</h3>
        {isEditing && (
          <div className='sm:ml-3 sm:flex hidden items-center gap-2 px-2 sm:px-3 py-1 bg-success/10 rounded-[5px] border border-success/20'>
            <span className='t-r-12 text-success'>
              Enter 키를 눌러 저장할 수 있습니다
            </span>
          </div>
        )}
      </div>

      {/* 텍스트 영역 - 레이아웃 시프트 방지를 위한 고정 높이 */}
      <div className='flex-1 h-[250px] sm:h-[300px] lg:h-[350px] xl:h-[400px]'>
        {isEditing ? (
          <div className='relative group h-full'>
            <textarea
              className='w-full h-full rounded-[5px] border-2 border-bg-gray-d px-3 sm:px-5 py-3 sm:py-4 t-r-14 sm:t-r-16 
                focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary 
                transition-all duration-300 resize-none hover:border-gray-6
                placeholder:text-gray-6 bg-white/80'
              value={editedText}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              placeholder='리뷰 내용을 입력해주세요...'
            />
            <div className='absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex items-center gap-2 px-2 sm:px-3 py-1 bg-bg-gray-fa rounded-[5px] opacity-0 group-focus-within:opacity-100 transition-opacity duration-200'>
              <span className='t-r-12 text-gray-6'>
                {editedText.length} / 1,000
              </span>
            </div>
          </div>
        ) : (
          <div className='h-full bg-bg-gray-fa rounded-[5px] px-3 sm:px-5 py-3 sm:py-4 overflow-y-auto border border-bg-gray-d transition-all duration-300 group relative'>
            <p className='t-r-14 sm:t-r-16 whitespace-pre-wrap leading-relaxed'>
              {editedText || (
                <span className='text-gray-6 italic text-center block pt-4 sm:pt-8'>
                  리뷰 내용이 없습니다.
                </span>
              )}
            </p>
            {editedText && (
              <div className='absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex items-center gap-2 px-2 sm:px-3 py-1 bg-bg-gray-fa rounded-[5px] opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
                <span className='t-r-12 text-gray-6'>
                  {editedText.length} / 1,000
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
