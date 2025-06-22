import { deleteAdminArt, getAdminArts, patchAdminArt } from '@/apis/admin/arts';
import AdminArtModal from '@/components/admin/arts/art/art-modal';
import { handleApiError } from '@/components/common/error-handler';
import type { InfiniteScrollResponse, MessageResponse } from '@/types';
import { AdminArtsResponse, PatchAdminArtRequest } from '@/types/admin/arts';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Search from '@/components/ui/search';

export default function AdminArtView() {
  const { artsResponse } = useLoaderData();

  const [keyword, setKeyword] = useState('');
  const [filter, setFilter] = useState('artName');
  const [arts, setArts] = useState<AdminArtsResponse[]>(artsResponse.content);
  const [lastId, setLastId] = useState(artsResponse.lastId);
  const [hasNext, setHasNext] = useState(artsResponse.hasNext);
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
      setArts(searchedData.content);
      setHasNext(searchedData.hasNext);
      setLastId(searchedData.lastId);
    } else {
      // 검색 데이터가 존재하지 않는 경우 초기 데이터로 초기화
      setArts(artsResponse.content);
      setHasNext(artsResponse.hasNext);
      setLastId(artsResponse.lastId);
    }
  }, [searchedData, artsResponse]);

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
      })),
      artsNo,
    });
    setSelectedArt(null);

    return res;
  };

  const handleDelete = async (artsNo: number): Promise<MessageResponse> => {
    const response = await deleteAdminArt(artsNo);
    setArts((prev) => prev.filter((art) => art.artsNo !== artsNo));
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

      setArts((prev) => [...prev, ...response.content]);
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
      <div className='border border-btn-gray-d rounded max-h-[600px] divide-y divide-btn-gray-d'>
        {/* 작품 목록 헤더 */}
        <div className='grid grid-cols-[1fr_3fr_3fr] leading-[44px] divide-x divide-btn-gray-d text-center t-b-14 text-nowrap top-0 bg-bg-gray-fa'>
          <div>No.</div>
          <div>작품명</div>
          <div>작가</div>
        </div>

        {/* 작품 목록 */}
        <div className='overflow-y-auto max-h-[400px] divide-y divide-btn-gray-d'>
          {arts.map((art, index) => (
            <div
              key={art.artsNo}
              onClick={() => setSelectedArt(art)}
              className='grid grid-cols-[1fr_3fr_3fr] leading-[44px] divide-x divide-btn-gray-d text-center t-r-14 cursor-pointer hover:bg-primary/10'
            >
              <div className='px-[15px]'>{index + 1}</div>

              <div className='px-[15px] border-r border-btn-gray-d'>
                {art.artName || '-'}
              </div>

              <div className='px-[15px]'>{renderArtists(art.artists)}</div>
            </div>
          ))}

          <div ref={observerRef} className='h-0 w-full border-none' />
        </div>
      </div>

      {/* 작품 상세 모달창 */}
      {selectedArt && (
        <AdminArtModal
          artsNo={selectedArt.artsNo}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onClose={handleClose}
        />
      )}
    </>
  );
}
