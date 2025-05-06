// pages/gallery/page.tsx
import styles from '@/styles/gallery/gallery.module.scss';
import Gallery from '@/components/gallery/gallery';
import { Outlet } from 'react-router-dom';

export default function GalleryPage() {
  return (
    <div className={styles.galleryWrap}>
      <Gallery />
      <Outlet /> {/* 자식 라우트들: exhibition, arts 등 여기서 렌더링됨 */}
    </div>
  );
}
