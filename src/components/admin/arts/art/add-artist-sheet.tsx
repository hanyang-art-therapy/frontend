import { getArtists } from '@/apis/admin/artists';
import { handleApiError } from '@/components/common/error-handler';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import Search from '@/components/ui/search';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import type { InfiniteScrollResponse } from '@/types';
import type { ArtistResponse } from '@/types/admin/artists';
import { UserRoundPlus } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

type Artist = {
  artistNo: number;
  description: string;
  name: string;
};

type AddArtistSheetProps = {
  currentArtists?: Artist[];
  onUpdateArtists: (artists: Artist[]) => void;
};

export default function AddArtistSheet({
  currentArtists = [],
  onUpdateArtists,
}: AddArtistSheetProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState<'artistName' | 'studentNo'>(
    'artistName'
  );
  const [artists, setArtists] = useState<
    InfiniteScrollResponse<ArtistResponse>
  >({
    content: [],
    lastId: 0,
    hasNext: false,
  });
  const [selectedArtists, setSelectedArtists] = useState<Artist[]>([]);

  const observerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  // 기존 작가들로 초기화
  useEffect(() => {
    if (isSheetOpen) {
      setSelectedArtists([...currentArtists]);
    }
  }, [isSheetOpen, currentArtists]);

  const loadArtists = useCallback(
    async (reset = false) => {
      try {
        const response = await getArtists({
          lastId: reset ? 0 : artists.lastId,
          filter: searchValue.length > 0 ? filter : '',
          keyword: searchValue,
        });

        if (reset) {
          setArtists(response);
        } else {
          setArtists((prev) => ({
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
    [artists.lastId, filter, searchValue]
  );

  useEffect(() => {
    if (!isSheetOpen) return;

    const rafId = requestAnimationFrame(() => {
      const observerTarget = observerRef.current;

      if (!observerTarget) return;

      observer.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && artists.hasNext) {
            loadArtists(false);
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
  }, [isSheetOpen, artists.hasNext, loadArtists]);

  const handleSearchChange = async () => {
    await loadArtists(true);
  };

  const handleArtistSelect = (artist: ArtistResponse, checked: boolean) => {
    if (checked) {
      setSelectedArtists((prev) => [
        ...prev,
        {
          artistNo: artist.artistNo,
          description: '',
          name: artist.artistName,
        },
      ]);
    } else {
      setSelectedArtists((prev) =>
        prev.filter((item) => item.artistNo !== artist.artistNo)
      );
    }
  };

  const handleSelectedArtistDescriptionChange = (
    artistNo: number,
    description: string
  ) => {
    setSelectedArtists((prev) =>
      prev.map((artist) =>
        artist.artistNo === artistNo ? { ...artist, description } : artist
      )
    );
  };

  const handleUpdateArtists = () => {
    onUpdateArtists(selectedArtists);
    setIsSheetOpen(false);
    toast.success('작가 정보가 업데이트되었습니다.');
  };

  const handleOpenSheet = async () => {
    setIsSheetOpen(true);
    await loadArtists(true);
  };

  const getButtonText = () => {
    const currentCount = currentArtists.length;
    const selectedCount = selectedArtists.length;

    if (selectedCount > currentCount) {
      return `작가 추가 (${selectedCount - currentCount}명 추가)`;
    } else if (selectedCount < currentCount) {
      return `작가 제거 (${currentCount - selectedCount}명 제거)`;
    } else {
      return `작가 정보 업데이트`;
    }
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          className='w-full border-none t-m-14 py-1 hover:bg-primary/10'
          onClick={handleOpenSheet}
        >
          작가 편집 <UserRoundPlus />
        </Button>
      </SheetTrigger>

      <SheetContent className='w-[400px] sm:w-[540px]'>
        <SheetHeader>
          <SheetTitle>작가 관리</SheetTitle>
          <SheetDescription>
            작가를 추가하거나 제거, 설명을 수정할 수 있습니다.
          </SheetDescription>
        </SheetHeader>

        <div className='flex flex-col gap-4 mt-6'>
          {/* 검색 필터 */}
          <div className='flex gap-2'>
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
              placeholder='작가 검색'
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onSearch={handleSearchChange}
            />
          </div>

          {/* 작가 목록 */}
          <div className='flex-1 overflow-y-auto max-h-[60vh] space-y-4'>
            {artists.content.length > 0 ? (
              <>
                {artists.content.map((artist) => {
                  const isSelected = selectedArtists.some(
                    (selected) => selected.artistNo === artist.artistNo
                  );
                  const selectedArtist = selectedArtists.find(
                    (selected) => selected.artistNo === artist.artistNo
                  );

                  return (
                    <div key={artist.artistNo} className='space-y-2'>
                      <div className='flex items-start space-x-3'>
                        <Checkbox
                          id={artist.artistNo.toString()}
                          checked={isSelected}
                          onCheckedChange={(checked: boolean) =>
                            handleArtistSelect(artist, checked)
                          }
                          className='mt-1'
                        />
                        <div className='flex-1'>
                          <label
                            htmlFor={artist.artistNo.toString()}
                            className='text-sm font-medium cursor-pointer'
                          >
                            <span className='block'>
                              {artist.cohort}기 {artist.artistName}
                            </span>
                            <span className='text-xs text-gray-500'>
                              학번: {artist.studentNo}
                            </span>
                          </label>
                        </div>
                      </div>

                      {isSelected && (
                        <textarea
                          placeholder='작가 설명을 입력하세요'
                          className='w-full p-2 border border-gray-300 rounded text-sm'
                          rows={3}
                          value={selectedArtist?.description || ''}
                          onChange={(e) =>
                            handleSelectedArtistDescriptionChange(
                              artist.artistNo,
                              e.target.value
                            )
                          }
                        />
                      )}
                    </div>
                  );
                })}
                <div ref={observerRef} className='h-1 w-full' />
              </>
            ) : (
              <div className='text-center text-gray-500 py-8'>
                검색된 작가가 없습니다.
              </div>
            )}
          </div>

          {/* 업데이트 버튼 */}
          <div className='flex justify-end pt-4 border-t'>
            <Button size='sm' onClick={handleUpdateArtists}>
              {getButtonText()}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
