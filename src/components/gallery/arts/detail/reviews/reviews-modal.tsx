import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { NO_IMG } from '@/constants/gallery/art-details';

interface ImageModalProps {
  modalImage: string | null;
  modalImagePreview?: string | null;
  selectedComment: {
    userName: string;
    reviewText: string;
    image: string | null;
  };
  image: string | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onEdit: (newText: string) => void;
  onDelete: () => void;
  onModalImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;

  isFirst: boolean;
  isLast: boolean;
}

export default function ReviewsModal({
  modalImage,
  selectedComment,
  onClose,
  onEdit,
  onDelete,
  onModalImageChange,
  modalImagePreview,
}: ImageModalProps) {
  const [editedText, setEditedText] = useState(selectedComment.reviewText);
  const [isEditing, setIsEditing] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true); // 버튼 가시성 상태 추가
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }

    onModalImageChange?.(e); // 외부 전달된 onChange도 호출
  };
  const handlePreviewDelete = () => {
    setPreviewImage(null);
  };

  useEffect(() => {
    setEditedText(selectedComment.reviewText);
    setIsEditing(false);
  }, [selectedComment]);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsButtonVisible(false);
  };

  const handleConfirmClick = () => {
    onEdit(editedText);
    setIsEditing(false);
    setIsButtonVisible(true);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleConfirmClick();
    }
  };

  useEffect(() => {
    setEditedText(selectedComment.reviewText);
    setIsEditing(false);
  }, [selectedComment]);

  useEffect(() => {
    if (modalImagePreview) {
      setPreviewImage(modalImagePreview);
    }
  }, [modalImagePreview]);

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-70 md:mt-[100px] '
      onClick={onClose}>
      <div
        className={`bg-white rounded-lg shadow-lg p-5 w-full h-full md:w-[80%] max-w-[1260px] md:h-[100%] flex items-center relative`}
        onClick={(e) => e.stopPropagation()}>
        <div className='flex flex-col md:flex-row items-start justify-center md:justify-start md:w-full gap-[20px]'>
          <div className='w-full md:w-1/2 h-auto relative flex items-center justify-center border rounded bg-gray-50'>
            {(modalImage && modalImage !== NO_IMG) || previewImage ? (
              <>
                <img
                  src={modalImagePreview ?? previewImage ?? modalImage!}
                  alt='리뷰 이미지'
                  className='max-w-full max-h-[500px] rounded'
                />

                {previewImage && (
                  <button
                    onClick={handlePreviewDelete}
                    className='absolute top-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded'>
                    삭제
                  </button>
                )}
              </>
            ) : (
              <div className='flex flex-col items-center justify-center p-4 gap-2'>
                <p className='text-sm text-gray-600'>
                  이미지가 없습니다. 업로드해보세요.
                </p>
                <label className='cursor-pointer px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark'>
                  이미지 업로드
                  <input
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    className='hidden'
                  />
                </label>
              </div>
            )}
          </div>

          <div className='md:flex md:flex-col md:text-start md:flex-2 w-full max-h-[600px] overflow-auto'>
            <h3 className='t-b-18 mb-2'>
              {selectedComment?.userName ?? '익명'}
            </h3>
            {isEditing ? (
              <textarea
                className='w-[350px] md:w-[90%] border border-gray-9 px-3 py-2 text-sm focus:outline-none focus:ring-0 mb-30 resize-none t-r-16 max-h-[80px] overflow-y-auto'
                value={editedText}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown} // 엔터 키 이벤트 처리
                rows={5}
                autoFocus
              />
            ) : (
              <div className='min-h-[80px] w-full'>
                <p className='w-[340px] max-h-[80px] t-r-16 mb-4 md:w-[90%] md:pb-[20px] text-start overflow-y-auto whitespace-normal break-words'>
                  {selectedComment.reviewText}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 수정 버튼, 삭제 버튼, 닫기 버튼 */}
        {isButtonVisible && (
          <div className='flex gap-2 absolute right-[50%] bottom-10 md:right-[12%] transform translate-x-1/2'>
            {isEditing ? (
              <Button
                onClick={handleConfirmClick}
                variant='outline'
                size='default'
                className='w-[80px] h-[36px] py-[14px] px-3 t-r-18 md:h-[40px] md:w-[80px] md:py-[14px] rounded-full'>
                확인
              </Button>
            ) : (
              <Button
                onClick={handleEditClick}
                variant='secondary'
                size='default'
                className='w-[80px] h-[36px] py-[14px] px-3 t-r-18 md:h-[40px] md:w-[80px] text-white  md:py-[14px] rounded-full'>
                수정
              </Button>
            )}

            <Button
              onClick={onDelete}
              variant='destructive'
              size='default'
              className='w-[80px] h-[36px] py-[14px] px-3 t-r-18 text-white md:h-[40px] md:w-[80px] md:py-[14px] rounded-full'>
              삭제
            </Button>

            <Button
              onClick={onClose}
              variant='gray'
              size='default'
              className='w-[80px] h-[36px] py-[14px] px-3 t-r-18 text-white md:h-[40px] md:w-[80px] md:py-[14px] rounded-full'>
              닫기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
