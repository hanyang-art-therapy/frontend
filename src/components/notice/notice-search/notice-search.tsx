import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Search from '@/components/ui/search';
import { useSearchParams } from 'react-router-dom';
import { CATEGORY_LIST } from '@/constants/notice/notice-category';

const categoryList = CATEGORY_LIST;

export const NoticeSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') ?? 'all';
  const handleCategoryChange = async (category: string) => {
    setSearchParams((prevSearchParams) => {
      if (category === 'all') prevSearchParams.delete('category');
      else prevSearchParams.set('category', category);

      return prevSearchParams;
    });
  };
  return (
    <div className='w-full text-center'>
      {/* 구분 선택 && 검색바 */}
      <div className='flex w-full items-center gap-2 md:gap-4 mt-4 pb-[20px] md:pb-[32px]'>
        <Select
          value={selectedCategory}
          onValueChange={(value) => handleCategoryChange(value)}
        >
          <SelectTrigger className='md:px-4 md:py-2 border rounded w-[80px] md:w-[150px]'>
            <SelectValue placeholder='전체 기수' />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value='all'>구분</SelectItem>
            {categoryList.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className='flex-1'>
          <Search
            placeholder='검색어를 입력하세요'
            onSearch={(value) => console.log('검색:', value)}
          />
        </div>
      </div>
    </div>
  );
};
