import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArtistResponse } from '@/types/admin/artists';

interface Props {
  artists: ArtistResponse[];
  onSelect: (artist: ArtistResponse) => void;
  onClose: () => void;
}

export default function ArtistSelectModal({
  artists,
  onSelect,
  onClose,
}: Props) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className='max-w-[500px]'>
        <DialogHeader>
          <DialogTitle className='text-center'>ARTISTS SEARCH</DialogTitle>
        </DialogHeader>
        <div className='leading-[44px] px-[20px] t-r-14 border border-btn-gray-d rounded overflow-hidden'>
          <p>Search(임시)</p>
        </div>
        <div className='border border-btn-gray-d rounded overflow-hidden'>
          {/* 작가 검색 헤더 */}
          <div className='sticky top-0 grid grid-cols-[1fr_2fr_2fr_2fr] leading-[44px] divide-x divide-btn-gray-d text-center text-nowrap t-b-14 bg-bg-gray-fa border-b border-btn-gray-d'>
            <div>No.</div>
            <div>이름</div>
            <div>학번</div>
            <div>기수</div>
          </div>
          {/* 작가 목록 */}
          <div className='max-h-[224px] divide-y divide-btn-gray-d overflow-y-auto'>
            {Array.isArray(artists) &&
              artists.map((artist, i) => (
                <div
                  key={artist.artistNo}
                  onClick={() => {
                    onSelect(artist);
                    onClose();
                  }}
                  className='grid grid-cols-[1fr_2fr_2fr_2fr] leading-[44px] divide-x divide-btn-gray-d text-center t-r-14 cursor-pointer hover:bg-primary/10'
                >
                  <div>{i + 1}</div>
                  <div>{artist.artistName}</div>
                  <div>{artist.studentNo}</div>
                  <div>{artist.cohort}</div>
                </div>
              ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
