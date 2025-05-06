import styles from '@/styles/gallery/gallery.module.scss';
import Professors from '@/components/info-professors/professors';

export default function GalleryPage() {
  return (
    <div className={styles.galleryWrap}>
      <Professors />
    </div>
  );
}
