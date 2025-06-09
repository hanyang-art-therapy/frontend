import { useEffect, useState } from 'react';
import { AdminArtResponse, PatchAdminArtRequest } from '@/types/admin/arts';
import { MessageResponse } from '@/types';
import { getAdminArts, patchAdminArt, deleteAdminArt } from '@/apis/admin/arts';
import AdminArtModal from '@/components/admin/arts/art/art-modal';

export default function AdminArtView() {
  const [arts, setArts] = useState<AdminArtResponse[]>([]);
  const [selectedArt, setSelectedArt] = useState<AdminArtResponse | null>(null);

  useEffect(() => {
    getAdminArts().then(setArts);
  }, []);

  const handleEdit = async (
    form: PatchAdminArtRequest
  ): Promise<MessageResponse> => {
    const {
      artsNo,
      galleriesNo,
      artName,
      caption,
      artType,
      coDescription,
      filesNo,
      artists,
    } = form;

    const res = await patchAdminArt(artsNo, {
      galleriesNo,
      artName,
      caption,
      artType,
      coDescription,
      filesNo,
      artists,
    });

    await getAdminArts().then((arts) => setArts(arts));
    setSelectedArt(null);

    return res;
  };

  const handleDelete = async (artsNo: number): Promise<MessageResponse> => {
    const res = await deleteAdminArt(artsNo);

    await getAdminArts().then((arts) => setArts(arts));
    setSelectedArt(null);

    return res;
  };

  const handleClose = () => setSelectedArt(null);

  return (
    <>
      <div className='border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
        {/* 작품 목록 헤더 */}
        <div className='grid grid-cols-[1fr_3fr_3fr] leading-[44px] divide-x divide-btn-gray-d text-center t-b-14 text-nowrap bg-bg-gray-fa'>
          <div>No</div>
          <div>작품명</div>
          <div>작가</div>
        </div>

        {/* 작품 목록 */}
        {arts.map((art, index) => (
          <div
            key={art.artsNo}
            onClick={() => setSelectedArt(art)}
            className='grid grid-cols-[1fr_3fr_3fr] leading-[44px] divide-x divide-btn-gray-d text-center t-r-14 cursor-pointer hover:bg-primary/10'
          >
            <div className='px-[15px]'>{index + 1}</div>
            <div className='px-[15px]'>{art.artName || '-'}</div>
            <div className='px-[15px]'>
              {art.artists.length === 0
                ? '-'
                : art.artists.length === 1
                ? art.artists[0].artistName
                : `${art.artists[0].artistName} 외 ${
                    art.artists.length - 1
                  }명 참여`}
            </div>
          </div>
        ))}
      </div>

      {/* 작품 상세 모달창 */}
      {selectedArt && (
        <AdminArtModal
          art={selectedArt}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={handleClose}
        />
      )}
    </>
  );
}
