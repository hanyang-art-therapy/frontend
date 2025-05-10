import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  ART_WORKS_CONTACT,
  NO_IMG,
  ART_DUMMY_CONTACT,
} from '@/constants/gallery/art-details';
import DetailTextarea from '@/components/gallery/arts/detail/detail-textarea';
import ReviewCard from './reviews/reviews-card';
import ImageModal from './reviews/reviews-modal';
import UploadedReviews from './reviews/reviews-upload-reviews';
import ReviewNoResult from './no-result/review-no-result';

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
  // const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  // 모달 관련 상태
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  const openImageModal = (imageUrl: string, comment: Comment) => {
    setModalImage(imageUrl || null);
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
      setModalImage(prevComment.image || NO_IMG);
    }
  };

  const handleNextComment = () => {
    const currentIndex = comments.findIndex(
      (comment) => comment === selectedComment
    );
    if (currentIndex < comments.length - 1) {
      const nextComment = comments[currentIndex + 1];
      setSelectedComment(nextComment);
      setModalImage(nextComment.image || NO_IMG);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageDelete = () => {
    // setImageFile(null);
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

      setComments([...comments, newComment]);
      setComment('');
      setImagePreview(null);
      // setImageFile(null);
    }
  };

  const art = ART_WORKS_CONTACT.find((item) => item.artsNo === Number(artsNo));
  if (!art) return <ReviewNoResult />;

  return (
    <div className='flex w-full flex-col items-start gap-[10px]'>
      <h2 className='text-[20px] font-bold text-left'>
        미술관 미술치료
        {/* 댓글 수 표시 */}
        <span className='text-bg-primary ml-2'>({comments.length})</span>{' '}
      </h2>
      {/* 댓글 작성 폼 */}
      <div className='w-full flex flex-col gap-[10px] min-h-[210px] pt-[40px]'>
        <div className='flex w-full border border-[var(--gray)] p-[20px] gap-[20px] pb-[22px]'>
          <div className='w-[150px] h-[150px] relative border border-gray-300 rounded bg-[#f9f9f9] flex items-center justify-center'>
            {/* 미리보기 */}
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
          <DetailTextarea
            comment={comment}
            onCommentChange={handleCommentChange}
            onImageChange={handleImageChange}
            onCommentSubmit={handleCommentSubmit}
          />
        </div>
      </div>
      <div className='w-full grid grid-cols-4 gap-10'>
        {/* 더미 댓글 - 분리 완료 */}
        {ART_DUMMY_CONTACT.map((item: DummyComment) => (
          <ReviewCard
            key={item.artsNo}
            userName={item.userName}
            reviewText={item.reviewText}
            image={item.files[0]?.url}
            onImageClick={() =>
              openImageModal(item.files[0]?.url || '', {
                text: item.reviewText,
                image: item.files[0]?.url || '',
                userName: item.userName,
                reviewText: item.reviewText,
              })
            }
          />
        ))}
        {/* 업로드 댓글 - 분리 완료 */}
        <UploadedReviews comments={comments} onImageClick={openImageModal} />
      </div>

      {/* 모달 - 분리 완료 */}
      {modalImage && selectedComment && (
        <ImageModal
          modalImage={modalImage}
          selectedComment={selectedComment}
          image={modalImage}
          onClose={closeImageModal}
          onPrev={handlePrevComment}
          onNext={handleNextComment}
          isFirst={comments.findIndex((c) => c === selectedComment) === 0}
          isLast={
            comments.findIndex((c) => c === selectedComment) ===
            comments.length - 1
          }
        />
      )}
    </div>
  );
}
