import { useEffect, useState } from 'react';
import { ArtistResponse, PatchArtistRequest } from '@/types/admin/artists';
import { getArtists, patchArtist, deleteArtist } from '@/apis/admin/artists';
import ArtistModal from '@/components/admin/artists/artist/artist-modal';

export default function ArtistView() {
  const [artists, setArtists] = useState<ArtistResponse[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<ArtistResponse | null>(
    null
  );

  useEffect(() => {
    getArtists().then((artists) => setArtists(artists));
  }, []);

  const handleEdit = async (form: PatchArtistRequest) => {
    const { artistNo, artistName, studentNo, cohort } = form;
    await patchArtist(artistNo, { artistName, studentNo, cohort });
    const artists = await getArtists();
    setArtists(artists);
    setSelectedArtist(null);
  };

  const handleDelete = async (artistNo: number) => {
    await deleteArtist(artistNo);
    await getArtists().then((artists) => setArtists(artists));
    setSelectedArtist(null);
  };

  const handleClose = () => setSelectedArtist(null);

  return (
    <>
      {/* 검색 */}
      <div className='w-full h-[45px] flex items-center mb-[20px] border border-btn-gray-d rounded overflow-hidden'>
        <p className='pl-[20px]'>Search(임시)</p>
      </div>
      <div className='max-h-[400px] overflow-y-scroll border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
        {/* 작가 목록 헤더 */}
        <div className='sticky top-0 z-1 grid grid-cols-[1fr_2fr_2fr_2fr] divide-x divide-btn-gray-d text-center t-b-14 text-nowrap bg-bg-gray-fa'>
          <div className='min-h-[44px] flex items-center justify-center'>
            No.
          </div>
          <div className='min-h-[44px] flex items-center justify-center'>
            이름
          </div>
          <div className='min-h-[44px] flex items-center justify-center'>
            학번
          </div>
          <div className='min-h-[44px] flex items-center justify-center'>
            기수
          </div>
        </div>

        {/* 작가 목록 */}
        {artists.map((artist, index) => (
          <div
            key={artist.artistNo}
            onClick={() => setSelectedArtist(artist)}
            className='grid grid-cols-[1fr_2fr_2fr_2fr] divide-x divide-btn-gray-d text-center t-r-14 cursor-pointer hover:bg-primary/10'
          >
            <div className='min-h-[44px] flex items-center justify-center'>
              {index + 1}
            </div>
            <div className='min-h-[44px] flex items-center justify-center'>
              {artist.artistName}
            </div>
            <div className='min-h-[44px] flex items-center justify-center'>
              {artist.studentNo}
            </div>
            <div className='min-h-[44px] flex items-center justify-center'>
              {artist.cohort}
            </div>
          </div>
        ))}
      </div>

      {/* 작가 상세 모달 */}
      {selectedArtist && (
        <ArtistModal
          artist={selectedArtist}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={handleClose}
        />
      )}
    </>
  );
}
