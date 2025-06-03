import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSearchParams } from 'react-router-dom';
import Search from '@/components/ui/search';
import { NOTICE_MOCK_DATA } from '@/constants/notice/notice';
import NoticeTable from './notice-table';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

const categoryList = ['실습', '모집', '일반', '전시', '학술'];

export default function NoticeList() {
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
    <div className='min-h-screen-vh mt-[10px] md:mt-[30px] flex flex-col items-center justify-center'>
      <div className='w-full max-w-[1260px] px-5 xl:px-0'>
        <strong className='flex justify-center items-center p-2 text-[#666] font-medium'>
          공지사항
        </strong>
      </div>
      <div className='w-full max-w-[1260px] md:px-5 md:xl:px-0 text-center'>
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
        <div className='flex flex-col'>
          <strong className='flex justify-start items-center pb-[12px] gap-1 font-medium'>
            <FileText size={16} strokeWidth={1.5} />총 10개의 게시물
          </strong>
          <NoticeTable data={NOTICE_MOCK_DATA.content} />
          <div className='flex w-full h-[50px] items-center pt-[22px] md:pt-[32px]'>
            <div className='flex-1 flex justify-center text-[14px] md:text-[20px]'>
              [ 페이지 네이션 들어갈 자리 ]
            </div>

            <Button
              type='submit'
              className='h-[30px] md:h-[40px] w-[80px] md:w-[120px]'
            >
              글쓰기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
