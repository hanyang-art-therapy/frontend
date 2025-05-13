import { useState, useEffect } from 'react';
import { NO_IMG } from '@/constants/gallery/art-details';
import { Button } from '@/components/ui/button';
Button;

interface ImageModalProps {
  modalImage: string | null;
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
  onDelete: () => void; // ✅ 삭제 핸들러 추가

  isFirst: boolean;
  isLast: boolean;
}

export default function ImageModal({
  modalImage,
  selectedComment,
  onClose,
  onEdit,
  onDelete,
}: ImageModalProps) {
  const [editedText, setEditedText] = useState(selectedComment.reviewText);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEditedText(selectedComment.reviewText);
    setIsEditing(false);
  }, [selectedComment]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleConfirmClick = () => {
    onEdit(editedText);
    setIsEditing(false);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80 md:mt-[100px] '
      onClick={onClose}>
      <div
        className='bg-white rounded-lg shadow-lg p-5 w-full h-full md:w-[80%] max-w-[1280px] md:h-[100%] flex items-center relative'
        onClick={(e) => e.stopPropagation()}>
        <div className='flex flex-col md:flex-row items-start justify-center md:justify-start md:w-full gap-10'>
          {modalImage && modalImage !== NO_IMG && (
            <img
              src={modalImage}
              alt='확대 이미지'
              className={`w-[400px] md:flex-2 md:max-h-[700px] object-contain mb-4 flex-shrink-0 ${
                isEditing ? 'mt-[106px]' : ''
              }`}
            />
          )}

          <div className='md:flex md:flex-col md:text-start md:flex-2 w-full max-h-[700px] overflow-auto'>
            <h3 className='t-b-18 mb-2'>
              {selectedComment?.userName ?? '익명'}
            </h3>
            {isEditing ? (
              <textarea
                className='h-[80px] w-[350px] md:w-[80%] border border-[var(--gray-9)] px-3 py-2 text-sm focus:outline-none focus:ring-0 mb-30 resize-none'
                value={editedText}
                onChange={handleTextChange}
                rows={5}
              />
            ) : (
              <div className='min-h-[100px]'>
                <p className='t-r-16 mb-4 md:w-[90%] md:pb-[20px] text-start'>
                  {selectedComment.reviewText}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className='flex gap-2 absolute right-[50%] bottom-10 md:right-[12%] transform translate-x-1/2'>
          {isEditing ? (
            <Button
              onClick={handleConfirmClick}
              variant='outline'
              size='default'
              className='w-[80px] h-[36px] py-[14px] px-3 text-r-14 md:h-[40px] md:w-[80px] md:py-[14px] md:t-b-18 rounded-full'>
              확인
            </Button>
          ) : (
            <Button
              onClick={handleEditClick}
              variant='secondary'
              size='default'
              className='w-[80px] h-[36px] py-[14px] px-3 text-r-14 md:h-[40px] md:w-[80px] text-white  md:py-[14px] md:t-b-18 rounded-full'>
              수정
            </Button>
          )}

          <Button
            onClick={onDelete}
            variant='destructive'
            size='default'
            className='w-[80px] h-[36px] py-[14px] px-3 text-r-14 text-white md:h-[40px] md:w-[80px] md:py-[14px] md:t-b-18 rounded-full'>
            삭제
          </Button>

          <Button
            onClick={onClose}
            variant='gray'
            size='default'
            className='w-[80px] h-[36px] py-[14px] px-3 text-r-14 text-white md:h-[40px] md:w-[80px] md:py-[14px] md:t-b-18 rounded-full'>
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}
