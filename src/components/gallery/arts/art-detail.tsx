import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ART_WORKS_CONTACT } from '@/constants/gallery/art-details';
import DetailReviews from './detail/detail-reviews';
import ArtDetailNoResult from './detail/no-result/art-detail-no-result';

export default function ArtsDetail() {
  const { artsNo } = useParams();

  const art = ART_WORKS_CONTACT.find((item) => item.artsNo === Number(artsNo));

  if (!art) return <ArtDetailNoResult />;

  return (
    <div className='text-center flex justify-between p-4'>
      <div className='md:max-w-[1080px] w-full mx-auto mt-[30px] md:mt-[60px]'>
        <div className='w-full h-[78px] flex items-center pt-[40px] pb-[20px] border-b-[2px] border-b-[#DDD]'>
          <ul className='w-full flex justify-between md:text-[32px] font-bold '>
            <li>
              <Link to='/gallery'>2025</Link>
            </li>
            <Link
              to='/gallery'
              className='t-r-14 pr-[10px] hover:underline cursor-pointer'>
              ART+THERAPY 展
            </Link>
          </ul>
        </div>
        <div className='w-full h-[102px] flex items-center py-[20px]'>
          <ul className='w-full flex justify-between md:text-[24px] font-semibold'>
            <div className='flex gap-[16px]'>
              <li>2025.05.17</li>
              <li>{art.artName}</li>
            </div>
            <li className='flex gap-[16px]'>
              <h2>{art.artistName}</h2>
              <h2>{art.cohort}</h2>
            </li>
          </ul>
        </div>
        <div>
          <div className='flex flex-col justify-center items-center'>
            <img
              src={art.src}
              alt={art.artistName}
              className='w-full md:w-[720px] py-[10px]'
            />
            <span className='self-end md:px-[180px] pb-[30px] text=[#5A5A5A]'>
              {art.caption}
            </span>
            <div className='flex md:max-w-[1080px] h-[auto] p-[20px] flex-col items-start gap-[10px] border border-[#ddd] mb-[40px] md:mb-[100px]'>
              <h2 className='w-full md:text-[24px] font-bold pb-[10px] md:pb-[20px] text-left'>
                작품 설명
              </h2>
              <div className='text-black md:text-[20px] text-left leading-[2] md:leading-[3.5] p-[10px]'>
                {art.description}
              </div>
            </div>
            <DetailReviews />
          </div>
        </div>
      </div>
    </div>
  );
}
