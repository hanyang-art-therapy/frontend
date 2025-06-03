import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Search from '@/components/ui/search';
import { NOTICE_MOCK_DATA } from '@/constants/notice/notice';
import NoticeTable from './notice-table';
import { Button } from '@/components/ui/button';
import { FileText, Volume2 } from 'lucide-react';

const categoryList = ['실습', '모집', '일반', '전시', '학술'];

export default function NoticeList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') ?? 'all';
  const navigate = useNavigate();
  const handleCategoryChange = async (category: string) => {
    setSearchParams((prevSearchParams) => {
      if (category === 'all') prevSearchParams.delete('category');
      else prevSearchParams.set('category', category);

      return prevSearchParams;
    });
  };
  const handleWriteClick = () => {
    navigate('/notice/write');
  };

  return (
    <div className='min-h-screen-vh mt-[10px] md:mt-[30px] flex flex-col items-center justify-start'>
      <div className='flex flex-col justify-start items-start w-full px-5 xl:px-0'>
        <div className='flex  justify-start items-center pb-[20px] gap-2 w-full'>
          <div className='p-3 rounded-[5px] w-[40px] h-[40px] flex justify-center  items-center text-white bg-secondary'>
            <Volume2 size={30} strokeWidth={2} />
          </div>
          <strong className='p-2 text-[#666] font-medium t-b-32'>
            공지사항
          </strong>
        </div>
        <div className='p-4 bg-gray-100 rounded text-sm t-r-16 flex-1 min-w-0'>
          본 게시판은 미술치료학과의 학사, 실습, 전시, 행사 등과 관련된 주요
          공지사항을 안내합니다. 일정 확인 및 필수 제출 서류 등은 수시로
          확인해주세요.
        </div>
      </div>

      <div className='w-full  text-center'>
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
          <strong className='flex justify-start items-center pb-[12px] gap-1 t-b-16'>
            <FileText size={16} strokeWidth={1.5} />총 10개의 게시물
          </strong>
          <NoticeTable data={NOTICE_MOCK_DATA.content} />
          <div className='flex w-full h-[50px] items-center pt-[22px] md:pt-[32px]'>
            <div className='flex-1 flex justify-center t-b-16'>
              [ 페이지 네이션 들어갈 자리 ]
            </div>
            <Button
              type='button'
              onClick={handleWriteClick}
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
