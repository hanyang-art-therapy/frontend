import { useParams } from 'react-router-dom';
import { ART_WORKS_CONTACT } from '@/constants/gallery/art-details';
import DetailReviews from './detail/detail-reviews';

export default function ArtsDetail() {
  const { artsNo } = useParams();

  const art = ART_WORKS_CONTACT.find((item) => item.artsNo === Number(artsNo));

  if (!art) return <div>작품을 찾을 수 없습니다.</div>;

  return (
    <div className='text-center flex justify-between'>
      <div className='md:max-w-[1080px] w-full mx-auto mt-[50px]'>
        <div className='w-full h-[78px] flex items-center pt-[40px] pb-[20px] border-b-[2px] border-b-[#DDD]'>
          <ul className='w-full flex justify-between text-[32px] font-bold '>
            <li>
              <a href='/gallery'>2025</a>
            </li>
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
            <img
              src={art.src}
              alt={art.artistName}
              className='w-[1080px] py-[10px]'
            />
            <span className='self-end py-[10px] pb-[30px] text=[#5A5A5A]'>
              Acrylic on canvas 100x80cm
            </span>
            <div className='flex w-[1080px] h-[auto] p-[30px] flex-col items-start gap-[10px] rounded-[4px]  bg-white mb-[100px]'>
              <h2 className='w-full text-[24px] font-bold pb-[20px] text-left'>
                작품 설명
              </h2>
              <div className='text-[#000] text-[20px]  text-left leading-[3.5] p-[10px]'>
                {art.artDetail}
              </div>
            </div>

            {/* 여기 */}
            <DetailReviews />
          </div>
        </div>
      </div>
    </div>
  );
}
