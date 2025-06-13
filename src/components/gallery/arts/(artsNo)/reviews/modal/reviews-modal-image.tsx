'use client';

import type React from 'react';

import { postFile } from '@/apis/common/file';
import type { ArtReview } from '@/types/gallery/review';
import { ImageIcon, Upload, X } from 'lucide-react';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';

type ReviewsModalImageProps = {
  isEditing: boolean;
  imageUrl: string;
  selectedReview: ArtReview;
  setSelectedReview: Dispatch<SetStateAction<ArtReview>>;
};

export default function ReviewsModalImage({
  isEditing,
  imageUrl,
  selectedReview,
  setSelectedReview,
}: ReviewsModalImageProps) {
  const hasImage = selectedReview.files.length > 0;

  const handleReviewImageDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setSelectedReview({
      ...selectedReview,
      files: [],
    });
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const response = await postFile([file]);

      setSelectedReview({
        ...selectedReview,
        files: [response[0]],
      });
    }
  };

  return (
    <div className='w-full lg:w-[40%] xl:w-[35%] flex flex-col'>
      <div className='flex items-center gap-3 mb-4'>
        <h3 className='t-b-16'>첨부한 이미지</h3>
      </div>

      <div className='w-full h-[250px] sm:h-[300px] lg:h-[350px] xl:h-[400px]'>
        {hasImage ? (
          <div className='relative w-full h-full rounded-[5px] overflow-hidden transition-all duration-300 group'>
            <img
              src={imageUrl || '/placeholder.svg'}
              alt='리뷰 이미지'
              aria-label='리뷰 이미지'
              className='w-full h-full object-contain transition-transform duration-300 group-hover:scale-105'
            />

            {/* 이미지 오버레이 */}
            <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

            {isEditing && (
              <button
                onClick={handleReviewImageDelete}
                className='absolute top-1 right-1 bg-black/80 hover:bg-black rounded-full w-6 h-6 flex items-center justify-center cursor-pointer'
                aria-label='이미지 삭제'
              >
                <X
                  className='w-4 h-4 hover:scale-110 transition-all duration-100'
                  color='white'
                />
              </button>
            )}
          </div>
        ) : !isEditing ? (
          <div className='flex flex-col items-center justify-center h-full border-bg-gray-d rounded-[5px] border-2 border-dashed transition-all duration-300'>
            <div className='flex flex-col items-center justify-center p-4 sm:p-8'>
              <div className='w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-bg-gray-d flex items-center justify-center mb-4'>
                <ImageIcon className='w-6 h-6 sm:w-8 sm:h-8 text-gray-6' />
              </div>
              <span className='t-m-14 sm:t-m-16'>이미지 없음</span>
              <span className='t-r-12 sm:t-r-14 text-gray-6 mt-1 text-center px-2'>
                이 리뷰에는 첨부된 이미지가 없습니다
              </span>
            </div>
          </div>
        ) : (
          <div
            className='relative w-full h-full border-2 border-dashed border-bg-gray-d rounded-[5px] bg-bg-gray-fa 
            hover:bg-bg-gray-fa hover:border-gray-6
            transition-all duration-300 cursor-pointer group overflow-hidden'
          >
            <input
              type='file'
              accept='image/*'
              onChange={handleImageUpload}
              className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10'
            />

            {/* 업로드 배경 애니메이션 */}
            <div className='absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></div>

            <div className='absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-6'>
              <div className='w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300'>
                <Upload className='w-6 h-6 sm:w-8 sm:h-8 text-primary group-hover:text-primary/80 transition-colors duration-300' />
              </div>
              <span className='t-m-14 sm:t-m-16 text-gray-6 text-center mb-2 group-hover:text-gray-3 transition-colors duration-200 px-2'>
                이미지를 업로드하려면 클릭하세요
              </span>
              <div className='flex items-center gap-2 px-2 sm:px-3 py-1 bg-white/80 rounded-full border border-bg-gray-d'>
                <span className='t-r-12 text-gray-6'>
                  JPG, PNG등 사진 파일 지원
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
