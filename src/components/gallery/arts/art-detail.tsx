import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { ART_WORKS_CONTACT } from '@/constants/art-details';

export default function ArtsDetail() {
  const { artsNo } = useParams();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [comment, setComment] = useState<string>('');
  const [comments, setComments] = useState<
    { text: string; image: string | null }[]
  >([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleImageDelete = () => {
    setImagePreview(null);
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, { text: comment, image: imagePreview }]);
      setComment('');
      setImagePreview(null);
    }
  };

  const art = ART_WORKS_CONTACT.find((item) => item.artsNo === Number(artsNo));

  if (!art) return <div>작품을 찾을 수 없습니다.</div>;

  return (
    <div className='text-center flex justify-between'>
      <div className='md:max-w-[1080px] w-full mx-auto'>
        <div className='w-full h-[78px] flex items-center pt-[40px] pb-[20px] border-b-[2px] border-b-[#DDD]'>
          <ul className='w-full flex justify-between text-[32px] font-bold '>
            <a href='/gallery'>
              <li>2025</li>
            </a>
            <a href='/gallery'>
              <li>ART+THERAPY 展</li>
            </a>
          </ul>
        </div>
        <div className='w-full h-[102px] flex items-center py-[20px]'>
          <ul className='w-full flex justify-between text-[24px] font-semibold'>
            <div className='flex gap-[16px]'>
              <li>9999.12.31</li>
              <li>{art.artTitle}</li>
            </div>
            <li className='flex gap-[16px]'>
              <h2>{art.artistName}</h2>
              <h2>{art.cohort}</h2>
            </li>
          </ul>
        </div>
        <div>
          <div className='flex  flex-col justify-center items-center'>
            <img src={art.src} alt={art.artistName} className='w-[1080px]' />
            <span className='self-end py-[10px] pb-[30px] text=[#5A5A5A]'>
              Acrylic on canvas 100x80cm
            </span>
            <div className='flex w-[1080px] h-[auto] p-[30px] flex-col items-start gap-[10px] rounded-[4px] border border-[#B6B5B5] bg-white mb-[100px]'>
              <h2 className='w-full text-[24px] font-bold pb-[20px] text-left'>
                작품 설명
              </h2>
              <div className='text-[#000] text-[20px]  text-left leading-[3.5] p-[10px]'>
                {art.artDetail}
              </div>
            </div>
            <div className='flex w-full flex-col items-start gap-[10px]'>
              <div className='w-full flex flex-col gap-[10px] min-h-[210px]'>
                <h2 className='text-[20px] font-bold text-left pb-[42px]'>
                  미술관 미술치료 (댓글)
                </h2>
                <div className='flex w-full border border-[var(--gray)] p-[20px] gap-[20px] pb-[22px]'>
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
                      <span className='text-sm text-gray-400'>
                        이미지 미리보기
                      </span>
                    )}
                  </div>
                  <div className='flex-1 flex flex-col gap-4'>
                    <input
                      type='text'
                      value={comment}
                      onChange={handleCommentChange}
                      className='w-full h-[150px] border border-[var(--gray)] px-3 py-2 text-sm focus:outline-none focus:ring-0'
                      placeholder='댓글을 입력하세요'
                    />
                    <div className='py-[20px] flex justify-end flex-wrap gap-[20px]'>
                      <label className='cursor-pointer inline-flex items-center gap-2 text-sm font-bold text-white bg-[var(--primary)] px-4 py-2 rounded-full'>
                        이미지 첨부
                        <input
                          type='file'
                          multiple
                          hidden
                          onChange={handleImageChange}
                        />
                      </label>

                      <button
                        onClick={handleCommentSubmit}
                        className='h-[40px] px-6 bg-[var(--primary)] text-white font-bold rounded-full text-sm cursor-pointer'>
                        댓글 업로드
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='w-full flex flex-col gap-[16px]'>
                {comments.map((comment, index) => (
                  <div
                    key={index}
                    className='flex gap-4 border border-[var(--gray)]  p-[20px]'>
                    {comment.image && (
                      <div className='w-[150px] h-[150px]'>
                        <img
                          src={comment.image}
                          alt='댓글 이미지'
                          className='w-full h-full object-cover rounded'
                        />
                      </div>
                    )}
                    <div className='flex-1 flex flex-col justify-start items-start'>
                      <p className='text-[var(-black)] text-[16px] p-[10px]'>
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
