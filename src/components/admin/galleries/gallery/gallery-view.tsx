import {
  deleteGallery,
  getGalleries,
  patchGallery,
} from '@/apis/admin/galleries';
import GalleryModal from '@/components/admin/galleries/gallery/gallery-modal';
import { MessageResponse } from '@/types';
import {
  GalleriesResponse,
  PatchGalleryRequest,
} from '@/types/admin/galleries';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  galleries: GalleriesResponse[];
  setGalleries: Dispatch<SetStateAction<GalleriesResponse[]>>;
};

export default function GalleryView({ galleries, setGalleries }: Props) {
  const [selectedGallery, setSelectedGallery] =
    useState<GalleriesResponse | null>(null);

  const handleEdit = async (
    form: PatchGalleryRequest
  ): Promise<MessageResponse> => {
    const { galleriesNo, title, startDate, endDate } = form;
    const res = await patchGallery(galleriesNo, {
      title,
      startDate,
      endDate,
    });

    await getGalleries().then((galleries) => setGalleries(galleries));
    setSelectedGallery(null);

    return res;
  };

  const handleDelete = async (
    galleriesNo: number
  ): Promise<MessageResponse> => {
    const res = await deleteGallery(galleriesNo);

    await getGalleries().then((galleries) => setGalleries(galleries));
    setSelectedGallery(null);

    return res;
  };

  const handleClose = () => setSelectedGallery(null);

  const postedYears = galleries.map(
    (g) => (g.startDate.split('-')[0], g.endDate.split('-')[0])
  );

  return (
    <>
      <div className='max-h-[100vw] md:max-h-[400px] overflow-y-scroll border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
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
        {galleries.map((gallery, index) => (
          <div
            key={gallery.galleriesNo}
            onClick={() => setSelectedGallery(gallery)}
            className='grid grid-cols-[1fr_3fr_3fr] divide-x divide-btn-gray-d text-center t-r-14 cursor-pointer hover:bg-primary/10'
          >
            <div className='min-h-[44px] flex items-center justify-center'>
              {index + 1}
            </div>
            <div className='min-h-[44px] flex items-center justify-center px-2 min-w-0'>
              <span className='truncate overflow-hidden whitespace-nowrap w-full text-center'>
                {gallery.title}
              </span>
            </div>
            <div className='min-h-[44px] flex items-center justify-center px-2 min-w-0'>
              <span className='truncate overflow-hidden whitespace-nowrap w-full text-center'>
                {`${gallery.startDate} ~ ${gallery.endDate}`}
              </span>
            </div>
          </div>
        ))}
        <div className='w-full h-1 bg-bg-gray-fa' />
      </div>

      {/* 전시회 상세 모달 */}
      {selectedGallery && (
        <GalleryModal
          postedYears={postedYears}
          gallery={selectedGallery}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={handleClose}
        />
      )}
    </>
  );
}
