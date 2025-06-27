import { getNotices } from '@/apis/notice/notice';
import { handleApiError } from '@/components/common/error-handler';
import Search from '@/components/ui/search';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORY_LIST } from '@/constants/notice/notice-category';
import { getEgType } from '@/lib/helper/notice';
import { type GetNoticesResponse } from '@/types/notice/notice';
import { type Dispatch, type SetStateAction } from 'react';
import { toast } from 'sonner';

type NoticeSearchProps = {
  filter: string;
  searchValue: string;
  setFilter: Dispatch<SetStateAction<string>>;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setNotices: Dispatch<SetStateAction<GetNoticesResponse>>;
};

export default function NoticeSearch({
  filter,
  searchValue,
  setFilter,
  setSearchValue,
  setNotices,
}: NoticeSearchProps) {
  const handleSearchChange = async () => {
    try {
      const response = await getNotices({
        keyword: searchValue,
        category: getEgType(filter),
      });

      setNotices(response);
    } catch (error) {
      console.log(error);
      toast.error(handleApiError(error));
    }
  };

  const handleSelectChange = async (value: string) => {
    setFilter(value);

    try {
      const response = await getNotices({
        keyword: searchValue,
        category: getEgType(value),
      });

      setNotices(response);
    } catch (error) {
      console.log(error);
      toast.error(handleApiError(error));
    }
  };

  return (
    <div className='flex gap-2 mb-[20px] mt-4'>
      <Select value={filter} onValueChange={handleSelectChange}>
        <SelectTrigger className='w-[100px]'>
          <SelectValue placeholder='필터' />
        </SelectTrigger>

        <SelectContent>
          <SelectItem key='all' value='전체'>
            전체
          </SelectItem>

          {CATEGORY_LIST.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Search
        placeholder='제목이나 내용으로 검색'
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearch={handleSearchChange}
      />
    </div>
  );
}
