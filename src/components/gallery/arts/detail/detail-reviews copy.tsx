import { useParams } from 'react-router-dom';
import { useState } from 'react';
import {
  ART_WORKS_CONTACT,
  NO_IMG,
  ART_DUMMY_CONTACT,
} from '@/constants/gallery/art-details';
import { Image, Navigation } from 'lucide-react';

export default function DetailReviews() {
  const { artsNo } = useParams();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<
    { text: string; image: string | null }[]
  >([]);
  //모달
  const [modalImage, setModalImage] = useState<string | null>(null);
  const openImageModal = (imageUrl: string | null) => {
    if (imageUrl) setModalImage(imageUrl);
  };
  const closeImageModal = () => {
    setModalImage(null);
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
    if (comment.trim()) {
      setComments([...comments, { text: comment, image: imagePreview }]);
      setComment('');
      setImagePreview(null);
    }
    try {
      // 여기에 실제 API 호출
      // await axios.post('/api/comments', formData);

      // ✅ 최신순으로 댓글 추가 (맨 위에)
      setComments([{ text: comment, image: imagePreview }, ...comments]);
      setComment('');
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      console.error('댓글 업로드 실패:', error);
    }
  };

  const art = ART_WORKS_CONTACT.find((item) => item.artsNo === Number(artsNo));
  if (!art) return <div>작품을 찾을 수 없습니다.</div>;

  return (
    <div className='flex w-full flex-col items-start gap-[10px]'>
      <div className='w-full flex flex-col gap-[10px] min-h-[210px]'>
        <h2 className='text-[20px] font-bold text-left pb-[42px]'>
          미술관 미술치료
        </h2>
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
          <form
            onSubmit={handleCommentSubmit}
            className='flex-1 flex flex-col gap-4'>
            <textarea
              name='reviewText'
              id='reviewText'
              placeholder='감상평을 작성해주세요.'
              value={comment}
              onChange={handleCommentChange}
              className='w-full h-[150px] border border-[var(--gray)] px-3 py-2 text-sm focus:outline-none focus:ring-0'
            />
            <div className='py-[20px] flex justify-end flex-wrap gap-[20px]'>
              {/* 이미지 업로드 */}
              <label className='cursor-pointer inline-flex items-center gap-2 text-sm font-bold text-white bg-[var(--primary)] px-4 py-2 rounded-full'>
                이미지 첨부
                <Image size={16} color='#fff' />
                <input
                  type='file'
                  hidden
                  accept='image/*'
                  onChange={handleImageChange}
                />
              </label>

              {/* 댓글 업로드 */}
              <button
                type='submit'
                className='inline-flex items-center gap-2 text-sm font-bold text-white bg-[var(--primary)] px-4 py-2 rounded-full'>
                댓글 업로드
                <Navigation size={16} color='#fff' />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 댓글 리스트 */}
      <div className='w-full flex flex-col gap-[16px]'>
        {comments.map((comment, index) => (
          <div
            key={index}
            className='flex gap-4 border border-[var(--gray)]  p-[20px]'>
            <div className='w-[150px] h-[150px] flex items-center justify-center border border-gray-300 rounded bg-[#f9f9f9]'>
              {comment.image ? (
                <img
                  src={comment.image}
                  alt='댓글 이미지'
                  className='w-full h-full object-cover rounded'
                />
              ) : (
                <div className='w-full h-full object-contain flex justify-center items-center'>
                  <img src={NO_IMG} alt='이미지 없음' className='w-[80px]' />
                </div>
              )}
            </div>
            <div className='flex-1 flex flex-col justify-start items-start'>
              <p className='text-[var(--black)] text-[16px] p-[10px]'>
                {comment.text}
              </p>
            </div>
          </div>
        ))}

        {/* 더미 댓글 */}
        <div className='flex flex-col gap-4'>
          {ART_DUMMY_CONTACT.map((item) => (
            <div
              key={item.artsNo}
              className='flex gap-4 border border-[var(--gray)] p-[20px]'>
              <div className='w-[150px] h-[150px] flex items-center justify-center border border-gray-300 rounded bg-[#f9f9f9] relative'>
                <div className='flex-1 flex justify-start items-start'>
                  <img
                    src={item.files[0].url}
                    alt='예시 이미지'
                    className='w-[150px] h-[150px] object-contain'
                    onClick={() => openImageModal(item.files[0].url)} // 아래 함수와 함께 사용
                  />
                  <button
                    onClick={() => openImageModal(item.files[0].url)}
                    className='absolute bottom-1 right-1 bg-black bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center z-10 hover:bg-opacity-80 text-[18px] cursor-pointer'
                    aria-label='이미지 확대'>
                    +
                  </button>
                </div>
              </div>
              <div className='flex flex-col gap-y-[8px] px-[10px] justify-start items-start w-[900px] text-left'>
                <strong className='text-base'>{item.userName}</strong>
                <p className='m-0 text-[16px] leading-[1.5]'>
                  {item.reviewText}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {modalImage && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center'
          onClick={closeImageModal}>
          <img
            src={modalImage}
            alt='확대 이미지'
            className='max-w-[90%] max-h-[90%] rounded shadow-lg'
            onClick={(e) => e.stopPropagation()} // 이미지 클릭 시 닫히지 않게
          />
        </div>
      )}
    </div>
  );
}
