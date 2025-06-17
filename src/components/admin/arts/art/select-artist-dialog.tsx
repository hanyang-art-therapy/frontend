import { getArtists } from '@/apis/admin/artists';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Search from '@/components/ui/search';
import type { Artist, InfiniteScrollResponse } from '@/types';
import type { ArtistResponse } from '@/types/admin/artists';
import type { PostAdminArtRequest } from '@/types/admin/arts';
import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { handleApiError } from '@/components/common/error-handler';
import { toast } from 'sonner';

type SelectArtistDialogProps = {
  initialArtists: InfiniteScrollResponse<ArtistResponse>;
  form: PostAdminArtRequest;
  setForm: Dispatch<SetStateAction<PostAdminArtRequest>>;
};

export default function SelectArtistDialog({
  initialArtists,
  form,
  setForm,
}: SelectArtistDialogProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [filter, setFilter] = useState<'artistName' | 'studentNo'>(
    'artistName'
  );
  const [artists, setArtists] =
    useState<InfiniteScrollResponse<ArtistResponse>>(initialArtists);
  const [checkedArtists, setCheckedArtists] = useState<
    Pick<PostAdminArtRequest, 'artistList'>
  >({
    artistList: form.artistList || [],
  });

  const observerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const handleCheckedChange = (checkedArtist: Artist, checked: boolean) => {
    if (checked) {
      setCheckedArtists((prev) => {
        return {
          ...prev,
          artistList: [
            ...prev.artistList,
            { artistNo: checkedArtist.artistNo, description: '' },
          ],
        };
      });
    } else {
      setCheckedArtists((prev) => {
        return {
          ...prev,
          artistList: prev.artistList.filter(
            (artist) => artist.artistNo !== checkedArtist.artistNo
          ),
        };
      });
    }
  };

  const handleButtonClick = () => {
    setForm((prev) => ({
      ...prev,
      artistList: checkedArtists.artistList,
    }));

    setIsDialogOpen(false);
  };

  const selectArtistMessage = (
    artistList: Pick<PostAdminArtRequest, 'artistList'>
  ) => {
    if (!artistList.artistList.length) {
      return '작가를 선택해주세요.';
    }

    const artistNames = artists.content
      .filter((item) =>
        artistList.artistList.some(
          (artist) => artist.artistNo === item.artistNo
        )
      )
      .map((item) => item.artistName);

    return artistNames.join(', ');
  };

  const textAreaDescription = (selectedArtist: Artist) => {
    const artistWithDescription = checkedArtists.artistList.find(
      (item) => item.artistNo === selectedArtist.artistNo
    );

    return artistWithDescription?.description || '';
  };

  const handleTextAreaChange = (
    selectedArtist: Artist,
    event: ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCheckedArtists((prev) => ({
      ...prev,
      artistList: prev.artistList.map((item) =>
        item.artistNo === selectedArtist.artistNo
          ? { ...item, description: event.target.value }
          : item
      ),
    }));
  };

  const handleSearchChange = async () => {
    if (searchValue.length < 1) {
      const response = await getArtists({
        lastId: 0,
        filter: '',
        keyword: '',
      });

      setArtists(response);
    }

    const response = await getArtists({
      lastId: 0,
      filter: filter,
      keyword: searchValue,
    });

    setArtists({
      content: response.content,
      lastId: response.lastId,
      hasNext: response.hasNext,
    });
  };

  const loadMoreArts = useCallback(async () => {
    if (!artists.hasNext) return;

    try {
      const response = await getArtists({
        lastId: artists.lastId,
        filter,
        keyword: searchValue,
      });

      setArtists((prev) => ({
        ...prev,
        content: [...prev.content, ...response.content],
        lastId: response.lastId,
        hasNext: response.hasNext,
      }));
    } catch (error) {
      toast.error(handleApiError(error));
    }
  }, [artists.hasNext, artists.lastId, filter, searchValue]);

  useEffect(() => {
    if (!isDialogOpen) return;

    const rafId = requestAnimationFrame(() => {
      const observerTarget = observerRef.current;

      if (!observerTarget) return;

      observer.current = new IntersectionObserver(
        (entries) => {
          const [entry] = entries;
          if (entry.isIntersecting && artists.hasNext) loadMoreArts();
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
  }, [isDialogOpen, artists.hasNext, loadMoreArts, filter, searchValue]);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger className='w-full t-r-14 text-left px-[15px] cursor-pointer'>
        {selectArtistMessage(checkedArtists)}
      </DialogTrigger>

      <DialogContent className='md:w-[50vw] max-h-[70vh] flex flex-col'>
        <DialogHeader>
          <DialogTitle>작가 선택</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <div className='flex-1 overflow-y-auto'>
          <div className='flex gap-[10px] w-full p-4'>
            <Select
              value={filter}
              onValueChange={(value) =>
                setFilter(value as 'artistName' | 'studentNo')
              }
            >
              <SelectTrigger className='min-w-[100px]'>
                <SelectValue defaultValue={filter} placeholder='작품 타입' />
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

          <div className='space-y-4 p-4 overflow-y-auto max-h-[40vh]'>
            {artists.content.length > 0 ? (
              <ul className='space-y-4'>
                {artists.content.map((fetchedArtist) => {
                  const isSelected = checkedArtists.artistList.some(
                    (selectedArtist) =>
                      selectedArtist.artistNo === fetchedArtist.artistNo
                  );

                  return (
                    <li
                      key={fetchedArtist.artistNo}
                      className='flex items-start space-x-3'
                    >
                      <Checkbox
                        id={fetchedArtist.artistNo.toString()}
                        checked={isSelected}
                        onCheckedChange={(checked: boolean) =>
                          handleCheckedChange(fetchedArtist, checked)
                        }
                        className='mt-1'
                      />
                      <div className='flex-1'>
                        <label
                          htmlFor={fetchedArtist.artistNo.toString()}
                          className='t-m-16'
                        >
                          <span className='flex items-center'>
                            <span className='t-m-16 inline-block min-w-[80px]'>
                              {fetchedArtist.cohort}기{' '}
                              {fetchedArtist.artistName}
                            </span>
                            <span className='t-r-14 text-gray-6'>
                              (학번: {fetchedArtist.studentNo})
                            </span>
                          </span>
                        </label>

                        {isSelected && (
                          <div className='mt-2'>
                            <textarea
                              placeholder='작가 설명을 입력하세요'
                              className='w-full p-2 border border-gray-9 rounded t-r-14'
                              rows={3}
                              value={textAreaDescription(fetchedArtist)}
                              onChange={(event) => {
                                handleTextAreaChange(fetchedArtist, event);
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className='text-center text-primary py-8'>
                검색된 작가가 존재하지 않습니다.
              </div>
            )}

            <div ref={observerRef} className='h-1 w-full' />
          </div>
        </div>

        <DialogFooter>
          <Button className='mx-auto' onClick={handleButtonClick}>
            등록
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
