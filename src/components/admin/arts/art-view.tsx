import AdminArtModal from '@/components/admin/arts/art-modal';
import { handleApiError } from '@/components/common/error-handler';
import { AdminArtResponse, PatchAdminArtRequest } from '@/types/admin/arts';
import { getAdminArts, patchAdminArt, deleteAdminArt } from '@/apis/admin/arts';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export default function AdminArtView() {
  const [artList, setArtList] = useState<AdminArtResponse[]>([]);
  const [selectedArt, setSelectedArt] = useState<AdminArtResponse | null>(null);

  const fetchList = async () => {
    try {
      const res = await getAdminArts();
      setArtList(res);
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    }
  };

  const handleEdit = async (form: PatchAdminArtRequest) => {
    try {
      if (!selectedArt) return;
      await patchAdminArt(selectedArt.artsNo, form);
      toast.success('작품 정보 수정이 완료되었습니다.');
      await fetchList();
      setSelectedArt(null);
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (artsNo: number) => {
    try {
      await deleteAdminArt(artsNo);
      toast.success('작품 정보 삭제가 완료되었습니다.');
      await fetchList();
      setSelectedArt(null);
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

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
        {artList.map((art, i) => (
          <div
            key={art.artsNo}
            onClick={() => setSelectedArt(art)}
            className='grid grid-cols-[1fr_3fr_3fr] leading-[44px] divide-x divide-btn-gray-d text-center t-r-14 cursor-pointer hover:bg-primary/10'
          >
            <div className='px-[15px]'>{i + 1}</div>
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
          onClose={() => setSelectedArt(null)}
        />
      )}
    </>
  );
}
