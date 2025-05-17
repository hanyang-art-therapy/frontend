import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { EXHIBITION_OVERVIEW } from '@/constants/main/exhibition';
import { COMMUNITY_POSTS } from '@/constants/main/community';

export default function ContentsSection() {
  return (
    <section className='w-full flex justify-center py-[60px] bg-bg-gray-fa'>
      <div className='w-[1260px] flex justify-between items-stert gap-[60px] flex-col lg:flex-row px-5 xl:px-0'>
        {/* 올해의 전시 활동 Content */}
        <div className='w-auto space-y-[20px]'>
          <div className='w-full flex justify-between items-center'>
            <h2 className='t-b-24'>올해의 전시 활동</h2>
            {/* 임시 - [전시 소개]로 이동 */}
            <Link
              to='/gallery?step=intro'
              aria-label='더보기'
              className='p-2 rounded-full hover:bg-btn-gray-fa transition'>
              <Plus className='w-6 h-6 text-btn-dark' />
            </Link>
          </div>

          {/* 전시회 리스트 */}
          <ul className='flex gap-[30px]'>
            {EXHIBITION_OVERVIEW.map((EXHIBITION_OVERVIEW) => (
              <li
                key={`${EXHIBITION_OVERVIEW.id}/${EXHIBITION_OVERVIEW.title}`}
                className='w-full'>
                {/* 전시회 포스터 이미지(클릭 시 전시 소개 상세 페이지로 이동 가능) */}
                <a
                  href='/gallery?step=intro'
                  className='w-full lg:min-w-[200px] aspect-[200/300] hover:opacity-70 object-cover'>
                  <img
                    className='w-full lg:min-w-[200px] aspect-[200/300]'
                    src={EXHIBITION_OVERVIEW.imageUrl}
                    alt={EXHIBITION_OVERVIEW.title}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 자유 게시판 Content */}
        <div className='w-full space-y-[20px]'>
          <div className='flex justify-between items-center'>
            <h2 className='t-b-24'>게시판</h2>
            {/* 임시 - [자유 게시판]으로 이동 */}
            <Link
              to='/coming-soon'
              aria-label='더보기'
              className='p-2 rounded-full hover:bg-btn-gray-fa transition'>
              <Plus className='w-6 h-6 text-btn-dark' />
            </Link>
          </div>

          {/* 게시물 리스트 */}
          <ul className='h-[300px] divide-y divide-gray-9 border-y-[2px] border-gray-6'>
            {COMMUNITY_POSTS.map((COMMUNITY_POSTS) => (
              <li
                key={COMMUNITY_POSTS.id}
                className='grid grid-cols-[auto_1fr_auto] gap-[20px] items-center leading-[49px]  px-5 t-r-16'>
                {/* 번호 */}
                <span className='t-b-14'>{COMMUNITY_POSTS.id}</span>
                {/* 제목 (클릭 시 상세 페이지로 이동 가능) */}
                <Link
                  to={`coming-soon`}
                  className='t-r-18 hover:opacity-70 transition truncate'>
                  {COMMUNITY_POSTS.title}
                </Link>
                {/* 날짜 */}
                <span className='t-r-14 text-gray-9'>
                  {COMMUNITY_POSTS.date}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
