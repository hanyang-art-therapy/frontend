import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  ART_WORKS_CONTACT,
  NO_IMG,
  ART_DUMMY_CONTACT,
} from '@/constants/gallery/art-details';
import DetailTextarea from './detail-textarea';

interface Comment {
  text: string;
  image: string | null;
  userName: string;
  reviewText: string;
}

interface DummyComment {
  artsNo: number;
  userName: string;
  reviewText: string;
  files: {
    filesNo: number;
    name: string;
    url: string;
    filesSize: number;
    extension: string;
    filesType: string;
  }[];
}

export default function DetailReviews() {
  const { artsNo } = useParams();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  // 모달 관련 상태
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  const openImageModal = (imageUrl: string, comment: Comment) => {
    setModalImage(imageUrl);
    setSelectedComment(comment);
  };

  const closeImageModal = () => {
    setModalImage(null);
    setSelectedComment(null);
  };

  const handlePrevComment = () => {
    const currentIndex = comments.findIndex(
      (comment) => comment === selectedComment
    );
    if (currentIndex > 0) {
      const prevComment = comments[currentIndex - 1];
      setSelectedComment(prevComment);
      setModalImage(prevComment.image || NO_IMG); // 이미지가 없으면 NO_IMG로 설정
    }
  };

  const handleNextComment = () => {
    const currentIndex = comments.findIndex(
      (comment) => comment === selectedComment
    );
    if (currentIndex < comments.length - 1) {
      const nextComment = comments[currentIndex + 1];
      setSelectedComment(nextComment);
      setModalImage(nextComment.image || NO_IMG); // 이미지가 없으면 NO_IMG로 설정
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageDelete = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userNameInput = document.getElementById(
      'userName'
    ) as HTMLInputElement;
    const userName = userNameInput?.value.trim() || '익명';

    if (comment.trim()) {
      const newComment: Comment = {
        text: comment,
        image: imagePreview || '',
        userName,
        reviewText: comment,
      };

      setComments([newComment, ...comments]);
      setComment('');
      setImagePreview(null);
      setImageFile(null);
    }
  };

  const art = ART_WORKS_CONTACT.find((item) => item.artsNo === Number(artsNo));
  if (!art) return <div>작품을 찾을 수 없습니다.</div>;

  return (
    <div className='flex w-full flex-col items-start gap-[10px]'>
      <h2 className='text-[20px] font-bold text-left pb-[42px]'>
        미술관 미술치료
      </h2>
      <div className='w-full grid grid-cols-4 gap-10'>
        {/* 더미 댓글 */}
        {ART_DUMMY_CONTACT.map((item: DummyComment) => (
          <div
            key={item.artsNo}
            className='flex flex-col items-center gap-2 bg-white rounded-lg shadow-lg'>
            <div className='relative'>
              <img
                src={item.files[0].url}
                alt='예시 이미지'
                className='w-[200px] h-[200px] object-cover cursor-pointer'
                onClick={() =>
                  openImageModal(item.files[0].url, {
                    text: item.reviewText,
                    image: item.files[0]?.url || '',
                    userName: item.userName,
                    reviewText: item.reviewText,
                  })
                }
              />
            </div>
            <h3 className='font-bold text-lg mb-2'>{item.userName}</h3>
            <p className='text-[var(--black)] text-[16px] p-[10px]'>
              {item.reviewText.length > 40
                ? `${item.reviewText.slice(0, 40)}...`
                : item.reviewText}
            </p>
          </div>
        ))}

        {/* 업로드 댓글 */}
        {comments.map((comment, index) => (
          <div
            key={index}
            className='flex flex-col items-center gap-2 bg-white rounded-lg shadow-lg'>
            <div className='relative'>
              <img
                src={comment.image || NO_IMG}
                alt='업로드 이미지'
                className='w-[200px] h-[200px] object-cover cursor-pointer'
                onClick={() => openImageModal(comment.image || NO_IMG, comment)}
              />
            </div>
            <h3 className='font-bold text-lg mb-2'>
              {comment.userName || '익명'}
            </h3>
            <p className='text-[var(--black)] text-[16px] p-[10px]'>
              {comment.reviewText.length > 40
                ? `${comment.reviewText.slice(0, 40)}...`
                : comment.reviewText}
            </p>
          </div>
        ))}
      </div>

      <div className='w-full flex flex-col gap-[10px] min-h-[210px] pt-[40px]'>
        <div className='flex w-full border border-[var(--gray)] p-[20px] gap-[20px] pb-[22px]'>
          {/* 이미지 미리보기 */}
          <div className='w-[150px] h-[150px] relative border border-gray-300 rounded bg-[#f9f9f9] flex items-center justify-center'>
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt='미리보기'
                  className='w-full h-full object-cover rounded'
                />
                <button
                  onClick={handleImageDelete}
                  className='absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-opacity-80'
                  aria-label='이미지 삭제'>
                  ×
                </button>
              </>
            ) : (
              <span className='text-sm text-gray-400'>이미지 미리보기</span>
            )}
          </div>

          {/* 댓글 작성 폼 */}
          <DetailTextarea
            comment={comment}
            onCommentChange={handleCommentChange}
            onImageChange={handleImageChange}
            onCommentSubmit={handleCommentSubmit}
          />
        </div>
      </div>

      {/* 모달 */}
      {modalImage && selectedComment && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80'
          onClick={closeImageModal}>
          <div
            className='bg-white rounded-lg shadow-lg p-5 w-[80%] max-w-[600px] flex flex-col items-center relative'
            onClick={(e) => e.stopPropagation()}>
            {/* 좌우 화살표 버튼 (모달 박스 바깥에 위치) */}
            <div className='absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2'>
              <button
                onClick={handlePrevComment}
                className='text-3xl font-bold text-black p-2'
                disabled={
                  comments.findIndex(
                    (comment) => comment === selectedComment
                  ) === 0
                }>
                <ChevronLeft size={40} strokeWidth={3} />
              </button>
              <button
                onClick={handleNextComment}
                className='text-3xl font-bold text-black p-2'
                disabled={
                  comments.findIndex(
                    (comment) => comment === selectedComment
                  ) ===
                  comments.length - 1
                }>
                <ChevronRight size={40} strokeWidth={3} />
              </button>
            </div>

            <img
              src={modalImage}
              alt='확대 이미지'
              className='w-full max-h-[650px] object-contain mb-4'
            />
            <div className='w-full'>
              <h3 className='font-bold text-lg mb-2'>
                {selectedComment?.userName || '익명'}
              </h3>
              <p className='text-sm'>{selectedComment?.reviewText}</p>
            </div>
            <button
              onClick={closeImageModal}
              className='mt-4 text-white bg-black px-4 py-2 rounded-full cursor-pointer'>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
