import { Link } from 'react-router-dom'
import { Plus } from 'lucide-react'
import { ExhibitionOverview } from '@/constants/exhibition'
import { CommunityPosts } from '@/constants/community'

export default function ContentsSection() {
  return (
    <section className='w-full flex justify-center py-[60px] bg-bg-muted'>
      <div className='w-[1080px] flex justify-between items-stert'>

        {/* 올해의 전시 활동 Content */}
        <div className="w-[420px] space-y-[20px]">
          <div className="flex justify-between items-center">
            <h2 className="title-b-24">올해의 전시 활동</h2>
            {/* 임시 - [전시 소개]로 이동 */}
            <Link to="/exhibition" aria-label="더보기" className="p-2 rounded-full hover:bg-btn-muted transition">
              <Plus className="w-6 h-6 text-btn-dark" />
            </Link>
          </div>

          {/* 전시회 리스트 */}
          <ul className="h-[300px] flex gap-[20px]">
            {ExhibitionOverview.map((ExhibitionOverview) => (
              <li key={ExhibitionOverview.id} className="w-[200px] h-[300px]">
                {/* 전시회 포스터 이미지(클릭 시 전시 소개 상세 페이지로 이동 가능) */}
                <a href={`/exhibition/${ExhibitionOverview.id}`} className="text-r-16 hover:opacity-70 transition object-cover">
                  <img src={ExhibitionOverview.imageUrl} alt={ExhibitionOverview.title} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* 자유 게시판 Content */}
        <div className="w-[520px] space-y-[20px]">
          <div className="flex justify-between items-center">
            <h2 className="title-b-24">자유 게시판</h2>
            {/* 임시 - [자유 게시판]으로 이동 */}
            <Link to="/community" aria-label="더보기" className="p-2 rounded-full hover:bg-btn-muted transition">
              <Plus className="w-6 h-6 text-btn-dark" />
            </Link>
          </div>

          {/* 게시물 리스트 */}
          <ul className="h-[300px] divide-y divide-btn-muted border-y border-btn-dark">
            {CommunityPosts.map((CommunityPosts) => (
              <li key={CommunityPosts.id} className="grid grid-cols-[auto_1fr_auto] gap-[20px] items-center leading-[49px]  px-[20px] text-r-16">
                {/* 번호 */}
                <span className="title-b-14">{CommunityPosts.id}</span>
                {/* 제목 (클릭 시 상세 페이지로 이동 가능) */}
                <a href={`/community/${CommunityPosts.id}`} className="text-r-16 hover:opacity-70 transition truncate">
                  {CommunityPosts.title}
                </a>
                {/* 날짜 */}
                <span className="text-r-16 text-muted">{CommunityPosts.date}</span>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </section>
  );
}
