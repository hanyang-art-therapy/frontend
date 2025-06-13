import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  ArtistsResponse,
  ArtistResponse,
  PatchArtistRequest,
} from '@/types/admin/artists';
import { InfiniteScrollResponse, MessageResponse } from '@/types';
import {
  getArtists,
  getArtist,
  patchArtist,
  deleteArtist,
} from '@/apis/admin/artists';
import ArtistModal from '@/components/admin/artists/artist/artist-modal';
import { handleApiError } from '@/components/common/error-handler';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Search from '@/components/ui/search';

type Props = {
  artistsList: InfiniteScrollResponse<ArtistsResponse>;
  setArtistsList: Dispatch<
    SetStateAction<InfiniteScrollResponse<ArtistsResponse>>
  >;
};

export default function ArtistView({ artistsList, setArtistsList }: Props) {
  const [selectedArtist, setSelectedArtist] = useState<ArtistResponse | null>(
    null
  );
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState<'artistName' | 'studentNo'>(
    'artistName'
  );
  const observerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const handleEdit = async (
    form: PatchArtistRequest
  ): Promise<MessageResponse> => {
    const { artistNo, artistName, studentNo, cohort } = form;
    const res = await patchArtist(artistNo, { artistName, studentNo, cohort });

    try {
      const updated = await getArtists({});
      setArtistsList(updated);
    } catch (error) {
      toast.error(handleApiError(error));
    }

    setSelectedArtist(null);
    return res;
  };

  const handleSelectArtist = async (artistNo: number) => {
    try {
      const artistDetail = await getArtist(artistNo);
      setSelectedArtist(artistDetail);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const handleDelete = async (artistNo: number): Promise<MessageResponse> => {
    const res = await deleteArtist(artistNo);

    await getArtists({}).then((artistsList) => setArtistsList(artistsList));
    setSelectedArtist(null);

    return res;
  };

  const handleClose = () => setSelectedArtist(null);

  const loadArtists = useCallback(
    async (reset = false) => {
      try {
        const response = await getArtists({
          lastId: artistsList.lastId,
          filter: searchValue.length > 0 ? filter : '',
          keyword: searchValue,
        });

        if (reset) {
          setArtistsList(response);
        } else {
          setArtistsList((prev) => ({
            ...prev,
            content: [...prev.content, ...response.content],
            lastId: response.lastId,
            hasNext: response.hasNext,
          }));
        }
      } catch (error) {
        toast.error(handleApiError(error));
      }
    },
    [artistsList.lastId, filter, searchValue, setArtistsList]
  );

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      const observerTarget = observerRef.current;

      if (!observerTarget) return;

      observer.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && artistsList.hasNext) {
            loadArtists();
          }
        },
        {
          root: null,
          rootMargin: '20px',
          threshold: 0.1,
        }
      );

      observer.current.observe(observerTarget);
    });

    return () => {
      cancelAnimationFrame(rafId);
      if (observer.current) observer.current.disconnect();
    };
  }, [artistsList.hasNext, loadArtists]);

  const handleSearchChange = async () => {
    try {
      const response = await getArtists({ keyword: searchValue, filter });

      setArtistsList(response);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  return (
    <>
      {/* 검색 */}
      <div className='flex gap-2 mb-[20px]'>
        <Select
          value={filter}
          onValueChange={(value) =>
            setFilter(value as 'artistName' | 'studentNo')
          }
        >
          <SelectTrigger className='w-[100px]'>
            <SelectValue placeholder='필터' />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value='artistName'>작가명</SelectItem>
            <SelectItem value='studentNo'>학번</SelectItem>
          </SelectContent>
        </Select>
        <Search
          placeholder='작가명 또는 학번 검색'
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onSearch={handleSearchChange}
        />
      </div>

      <div className='max-h-[100vw] md:max-h-[400px] overflow-y-scroll border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
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
        {artistsList.content.map((artist, index) => (
          <div
            key={artist.artistNo}
            onClick={() => handleSelectArtist(artist.artistNo)}
            className='grid grid-cols-[1fr_2fr_2fr_2fr] divide-x divide-btn-gray-d text-center t-r-14 cursor-pointer hover:bg-primary/10'
          >
            <div className='min-h-[44px] flex items-center justify-center'>
              {index + 1}
            </div>
            <div className='min-h-[44px] flex items-center justify-center px-2 min-w-0'>
              <span className='truncate overflow-hidden whitespace-nowrap w-full text-center'>
                {artist.artistName}
              </span>
            </div>
            <div className='min-h-[44px] flex items-center justify-center px-2 min-w-0'>
              <span className='truncate overflow-hidden whitespace-nowrap w-full text-center'>
                {artist.studentNo}
              </span>
            </div>
            <div className='min-h-[44px] flex items-center justify-center px-2 min-w-0'>
              <span className='truncate overflow-hidden whitespace-nowrap w-full text-center'>
                {artist.cohort}
              </span>
            </div>
          </div>
        ))}
        <div className='w-full h-1 bg-bg-gray-fa' ref={observerRef} />
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
