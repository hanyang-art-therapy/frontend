import styles from '@/styles/gallery/gallery.module.scss';

const artworkImages = [
  '/images/arts/art1.webp',
  '/images/arts/art2.webp',
  '/images/arts/art3.webp',
  '/images/arts/art4.webp',
  '/images/arts/art5.webp',
  '/images/arts/art6.webp',
  '/images/arts/art7.webp',
  '/images/arts/art8.webp',
  '/images/arts/art9.webp',
  '/images/arts/art10.webp',
  '/images/arts/art11.webp',
  '/images/arts/art12.webp',
  '/images/arts/art13.webp',
  '/images/arts/art14.webp',
  '/images/arts/art15.webp',
  '/images/arts/art16.webp',
  '/images/arts/art17.webp',
  '/images/arts/art18.webp',
  '/images/arts/art19.webp',
];

/*
 * 이미지 리사이징 해야합니다.
 * 화면에는 320px X 320px 사이즈로 렌더링하는데
 * 원본 사진의 사이즈는 3000px X 3000px가 넘어가서 용량이 과도하게 큽니다.
 */

export default function Arts() {
  return (
    <div className={styles.mainContent}>
      <div className={styles.galleryBoxInner}>
        {artworkImages.map((src, i) => (
          <div className={styles.artworkBox} key={i}>
            <div className={styles.artwork}>
              <img src={src} alt={`${i + 1}번 작품`} />
            </div>
            <span>{i + 1}번 작품</span>
          </div>
        ))}
      </div>
    </div>
  );
}
