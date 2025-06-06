import { useEffect, useState } from 'react';
import {
  GalleriesResponse,
  PatchGalleryRequest,
} from '@/types/admin/galleries';
import {
  getGalleries,
  patchGallery,
  deleteGallery,
} from '@/apis/admin/galleries';
import GalleryModal from '@/components/admin/galleries/gallery/gallery-modal';

export default function GalleryView() {
  const [galleries, setGalleries] = useState<GalleriesResponse[]>([]);
  const [selectedGallery, setSelectedGallery] =
    useState<GalleriesResponse | null>(null);

  useEffect(() => {
    getGalleries().then((galleries) => setGalleries(galleries));
  }, []);

  const handleEdit = async (form: PatchGalleryRequest) => {
    const { galleriesNo, title, startDate, endDate } = form;
    await patchGallery(galleriesNo, { title, startDate, endDate });
    await getGalleries().then((galleries) => setGalleries(galleries));
    setSelectedGallery(null);
  };

  const handleDelete = async (galleriesNo: number) => {
    await deleteGallery(galleriesNo);
    await getGalleries().then((galleries) => setGalleries(galleries));
    setSelectedGallery(null);
  };

  const handleClose = () => setSelectedGallery(null);

  return (
    <>
      <div className='border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
        <div className='grid grid-cols-[1fr_3fr_3fr] divide-x divide-btn-gray-d text-center text-nowrap t-b-14 bg-bg-gray-fa'>
          {/* 전시회 타이틀 */}
          <div className='min-h-[44px] flex items-center justify-center'>
            No.
          </div>
          <div className='min-h-[44px] flex items-center justify-center'>
            제목
          </div>
          <div className='min-h-[44px] flex items-center justify-center'>
            기간
          </div>
        </div>

        {/* 전시회 목록 */}
        {galleries.map((gallery, i) => (
          <div
            key={gallery.galleriesNo}
            onClick={() => setSelectedGallery(gallery)}
            className='grid grid-cols-[1fr_3fr_3fr] divide-x divide-btn-gray-d text-center t-r-14 cursor-pointer hover:bg-primary/10'
          >
            <div className='min-h-[44px] flex items-center justify-center'>
              {i + 1}
            </div>
            <div className='min-h-[44px] flex items-center justify-center'>
              {gallery.title}
            </div>
            <div className='min-h-[44px] flex items-center justify-center'>
              {`${gallery.startDate} ~ ${gallery.endDate}`}
            </div>
          </div>
        ))}
      </div>

      {/* 전시회 상세 모달 */}
      {selectedGallery && (
        <GalleryModal
          gallery={selectedGallery}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={handleClose}
        />
      )}
    </>
  );
}
