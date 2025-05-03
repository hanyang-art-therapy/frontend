// ArtDetail.tsx
import { useParams } from 'react-router-dom';

const artworkImages = [
  {
    id: 1,
    artistName: '강송이',
    cohort: '30기',
    src: '/images/arts/art1-sm.webp',
  },
  {
    id: 2,
    artistName: '구교희',
    cohort: '30기',
    src: '/images/arts/art2-sm.webp',
  },
  {
    id: 3,
    artistName: '김도경',
    cohort: '30기',
    src: '/images/arts/art3-sm.webp',
  },
  {
    id: 4,
    artistName: '김도형',
    cohort: '30기',
    src: '/images/arts/art4-sm.webp',
  },
  {
    id: 5,
    artistName: '김보영',
    cohort: '30기',
    src: '/images/arts/art5-sm.webp',
  },
  {
    id: 6,
    artistName: '김이슬',
    cohort: '30기',
    src: '/images/arts/art6-sm.webp',
  },
  {
    id: 7,
    artistName: '김지은',
    cohort: '30기',
    src: '/images/arts/art7-sm.webp',
  },
  {
    id: 8,
    artistName: '김희경',
    cohort: '30기',
    src: '/images/arts/art8-sm.webp',
  },
  {
    id: 9,
    artistName: '남선미',
    cohort: '30기',
    src: '/images/arts/art9-sm.webp',
  },
  {
    id: 10,
    artistName: '류민아',
    cohort: '30기',
    src: '/images/arts/art10-sm.webp',
  },
  {
    id: 11,
    artistName: '마수민',
    cohort: '30기',
    src: '/images/arts/art11-sm.webp',
  },
  {
    id: 12,
    artistName: '문지윤',
    cohort: '30기',
    src: '/images/arts/art12-sm.webp',
  },
  {
    id: 13,
    artistName: '박다리아',
    cohort: '30기',
    src: '/images/arts/art13-sm.webp',
  },
  {
    id: 14,
    artistName: '박은하',
    cohort: '30기',
    src: '/images/arts/art14-sm.webp',
  },
  {
    id: 15,
    artistName: '박진호',
    cohort: '30기',
    src: '/images/arts/art15-sm.webp',
  },
  {
    id: 16,
    artistName: '백은희',
    cohort: '30기',
    src: '/images/arts/art16-sm.webp',
  },
  {
    id: 17,
    artistName: '성인경',
    cohort: '30기',
    src: '/images/arts/art17-sm.webp',
  },
  {
    id: 18,
    artistName: '소명희',
    cohort: '30기',
    src: '/images/arts/art18-sm.webp',
  },
  {
    id: 19,
    artistName: '유봉미',
    cohort: '30기',
    src: '/images/arts/art19-sm.webp',
  },
  {
    id: 20,
    artistName: '윤희정',
    cohort: '30기',
    src: '/images/arts/art20-sm.webp',
  },
  {
    id: 21,
    artistName: '조자영',
    cohort: '30기',
    src: '/images/arts/art21-sm.webp',
  },
  {
    id: 22,
    artistName: '조혜미',
    cohort: '30기',
    src: '/images/arts/art22-sm.webp',
  },
  {
    id: 23,
    artistName: '최지혜',
    cohort: '30기',
    src: '/images/arts/art23-sm.webp',
  },
];

export default function ArtsDetail() {
  const { id } = useParams();
  const art = artworkImages.find((item) => item.id === Number(id));

  if (!art) return <div>작품을 찾을 수 없습니다.</div>;

  return (
    <div style={{ textAlign: 'center', padding: '40px' }}>
      <h2>{art.artistName}</h2>
      <img
        src={art.src}
        alt={art.artistName}
        style={{ width: '720px', height: '720px' }}
      />
    </div>
  );
}
