import { deleteAdminArt, getAdminArts, patchAdminArt } from '@/apis/admin/arts';
import AdminArtModal from '@/components/admin/arts/art/art-modal';
import { handleApiError } from '@/components/common/error-handler';
import Search from '@/components/ui/search';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { InfiniteScrollResponse, MessageResponse } from '@/types';
import { AdminArtsResponse, PatchAdminArtRequest } from '@/types/admin/arts';
import type { GalleriesResponse } from '@/types/admin/galleries';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type AdminArtViewProps = {
  role: string | null;
  arts: InfiniteScrollResponse<AdminArtsResponse>;
  galleries: GalleriesResponse[];
};

export default function AdminArtView({
  role,
  arts,
  galleries,
}: AdminArtViewProps) {
  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState('artName');
  const [searhedArts, setSearhedArts] = useState<AdminArtsResponse[]>(
    arts.content
  );
  const [lastId, setLastId] = useState(arts.lastId);
  const [hasNext, setHasNext] = useState(arts.hasNext);
  const [selectedArt, setSelectedArt] = useState<AdminArtsResponse | null>(
    null
  );
  const [searchedData, setSearchedData] =
    useState<InfiniteScrollResponse<AdminArtsResponse> | null>(null);

  const observerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 검색 데이터가 존재하는 경우
    if (searchedData) {
      setSearhedArts(searchedData.content);
      setHasNext(searchedData.hasNext);
      setLastId(searchedData.lastId);
    } else {
      // 검색 데이터가 존재하지 않는 경우 초기 데이터로 초기화
      setSearhedArts(arts.content);
      setHasNext(arts.hasNext);
      setLastId(arts.lastId);
    }
  }, [searchedData, arts]);

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
      artists: artists.map((value) => ({
        artistNo: value.artistNo,
        description: value.description,
        name: value.name,
      })),
      artsNo,
    });

    setSelectedArt(null);

    setSearhedArts((searchedArts) =>
      searchedArts.map((searchedArt) =>
        searchedArt.artsNo === artsNo
          ? {
              ...searchedArt,
              artName,
              caption,
              artType,
              coDescription,
              filesNo,
              artists: artists.map((value) => value.name),
            }
          : searchedArt
      )
    );

    return res;
  };

  const handleDelete = async (artsNo: number): Promise<MessageResponse> => {
    const response = await deleteAdminArt(artsNo);
    setSearhedArts((prev) => prev.filter((art) => art.artsNo !== artsNo));
    setSelectedArt(null);

    return response;
  };

  const handleClose = () => setSelectedArt(null);

  const handleSearch = async () => {
    try {
      const response = await getAdminArts({ keyword, filter });

      setSearchedData(response);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const loadMoreArts = useCallback(async () => {
    if (!hasNext) return;

    try {
      const response = await getAdminArts({ lastId, filter, keyword });

      setSearhedArts((prev) => [...prev, ...response.content]);
      setLastId(response.lastId);
      setHasNext(response.hasNext);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  }, [hasNext, lastId, filter, keyword]);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      const observerTarget = observerRef.current;

      if (!observerTarget) return;

      observer.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;

          if (entry.isIntersecting && hasNext) {
            loadMoreArts();
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
  }, [hasNext, loadMoreArts]);

  const renderArtists = (artists: string[]) => {
    if (!artists || !artists.length) return '-';

    return artists.join(', ');
  };

  return (
    <>
      <div className='flex gap-2 mb-[20px]'>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className='w-[100px]'>
            <SelectValue defaultValue={filter} placeholder='작품 타입' />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value='artName'>작품명</SelectItem>
            <SelectItem value='artistName'>작가명</SelectItem>
          </SelectContent>
        </Select>

        <Search
          placeholder={`${filter === 'artName' ? '작품명' : '작가명'} 검색`}
          searchValue={keyword}
          setSearchValue={setKeyword}
          onSearch={handleSearch}
        />
      </div>
      <div className='max-h-[100vw] md:max-h-[400px] overflow-y-scroll border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
        {/* 작품 목록 헤더 */}
        <div className='grid grid-cols-[1fr_3fr_3fr] leading-[44px] divide-x divide-btn-gray-d text-center t-b-14 text-nowrap top-0 bg-bg-gray-fa'>
          <div>No.</div>
          <div>작품명</div>
          <div>작가</div>
        </div>

        {/* 작품 목록 */}
        <div className='overflow-y-auto max-h-[400px] divide-y divide-btn-gray-d'>
          {searhedArts.map((art, index) => (
            <div
              key={art.artsNo}
              onClick={() => setSelectedArt(art)}
              className='grid grid-cols-[1fr_3fr_3fr] leading-[44px] divide-x divide-btn-gray-d text-center t-r-14 cursor-pointer hover:bg-primary/10'
            >
              <div className='px-[15px]'>{index + 1}</div>

              <div className='px-[15px] border-r border-btn-gray-d truncate'>
                {art.artName || '-'}
              </div>

              <div className='px-[15px] truncate'>
                {renderArtists(art.artists)}
              </div>
            </div>
          ))}

          <div ref={observerRef} className='h-1 w-full border-none' />
        </div>
      </div>

      {/* 작품 상세 모달창 */}
      {selectedArt && (
        <AdminArtModal
          role={role}
          artsNo={selectedArt.artsNo}
          galleries={galleries}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={handleClose}
        />
      )}
    </>
  );
}
