import styles from '@/styles/gallery/gallery.module.scss';
import Gallery from '@/components/gallery/gallery';

export default function GalleryPage() {
  return (
    <div className={styles.galleryWrap}>
      <Gallery />
    </div>
  );
}
