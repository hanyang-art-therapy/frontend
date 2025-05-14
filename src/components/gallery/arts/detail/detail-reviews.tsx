import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  ART_WORKS_CONTACT,
  NO_IMG,
  ART_DUMMY_CONTACT,
} from '@/constants/gallery/art-details';
import DetailTextarea from '@/components/gallery/arts/detail/detail-textarea';
import ReviewCard from './reviews/reviews-card';
import ReviewsModal from './reviews/reviews-modal';
import UploadedReviews from './reviews/uploaded-reviews';
import ReviewNoResult from './no-result/review-no-result';

interface Comment {
  text: string;
  image: string | null;
  userName: string;
  reviewText: string;
  createdAt: string;
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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [modalimagePreview, setModalImagePreview] = useState<string | null>(
    null
  );
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  // 모달 관련 상태
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  // 모달열기
  const openImageModal = (imageUrl: string, comment: Comment) => {
    setModalImage(imageUrl || null);
    setSelectedComment(comment);
  };

  // 모달닫기
  const closeImageModal = () => {
    setModalImage(null);
    setSelectedComment(null);
  };

  // 모달 내용 수정
  const handleCommentEdit = (newText: string) => {
    if (!selectedComment) return;

    const confirmEdit = window.confirm('댓글을 수정하시겠습니까?');
    if (confirmEdit) {
      const updatedComments = comments.map((c) =>
        c === selectedComment ? { ...c, text: newText, reviewText: newText } : c
      );
      setComments(updatedComments);
      setSelectedComment({
        ...selectedComment,
        text: newText,
        reviewText: newText,
      });
    }
  };

  // Null || 익명일 때 이미지 업로드
  const ModalImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setModalImagePreview(URL.createObjectURL(file));
    }
  };

  // 모달 댓글 삭제
  const handleCommentDelete = () => {
    if (!selectedComment) return;

    const confirmDelete = window.confirm('정말 이 댓글을 삭제하시겠습니까?');
    if (confirmDelete) {
      const updatedComments = comments.filter((c) => c !== selectedComment);
      setComments(updatedComments);
      closeImageModal();
    }
  };

  // 이전 댓글 보기
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

  // 다음 댓글 보기
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

  // 이미지 업로드
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  // 이미지 삭제
  const handleImageDelete = () => {
    setImagePreview(null);
  };

  // 댓글 입력
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  // 댓글 제출
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
        createdAt: new Date().toISOString(),
      };

      setComments([...comments, newComment]);
      setComment('');
      setImagePreview(null);
    }
  };

  const art = ART_WORKS_CONTACT.find((item) => item.artsNo === Number(artsNo));
  if (!art) return <ReviewNoResult />;

  return (
    <div className='flex w-full flex-col items-start gap-[10px]'>
      <h2 className='text-[20px] font-bold text-left'>
        미술관 미술치료
        {comments.length > 0 && (
          <span className='text-bg-primary ml-2'>({comments.length})</span>
        )}
      </h2>

      {/* 댓글 작성 */}
      <div className='flex md:flex-row w-full border border-bg-gray-d p-[10px] gap-[10px] md:p-[20px] md:gap-[20px] md:pb-[22px] rounded-sm mb-[20px]'>
        <div className='w-[100px] h-[100px] md:w-[150px] md:h-[150px] relative rounded bg-[#f9f9f9] flex items-center justify-center'>
          {imagePreview ? (
            <>
              <img
                src={imagePreview}
                alt='미리보기'
                className='w-full h-full object-cover rounded'
              />
              <button
                onClick={handleImageDelete}
                className='absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-opacity-70'
                aria-label='이미지 삭제'>
                ×
              </button>
            </>
          ) : (
            <span className='t-r-14 md:t-r-16 text-gray-9 rounded-sm'>
              이미지 미리보기
            </span>
          )}
        </div>

        <div className='w-[70%] md:w-[90%]'>
          <DetailTextarea
            comment={comment}
            onCommentChange={handleCommentChange}
            onImageChange={handleImageChange}
            onCommentSubmit={handleCommentSubmit}
          />
        </div>
      </div>

      <div className='w-full md:grid md:grid-cols-4 justify-center items-center gap-10'>
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
                createdAt: '',
              })
            }
          />
        ))}

        <UploadedReviews comments={comments} onImageClick={openImageModal} />
      </div>

      {modalImage && selectedComment && (
        <ReviewsModal
          modalImage={modalImage}
          selectedComment={selectedComment}
          image={modalImage}
          onModalImageChange={ModalImageChange} // 이미지 변경 함수 추가
          onClose={closeImageModal}
          onPrev={handlePrevComment}
          onNext={handleNextComment}
          onDelete={handleCommentDelete}
          modalImagePreview={modalimagePreview}
          isFirst={comments.findIndex((c) => c === selectedComment) === 0}
          isLast={
            comments.findIndex((c) => c === selectedComment) ===
            comments.length - 1
          }
          onEdit={handleCommentEdit}
        />
      )}
    </div>
  );
}
