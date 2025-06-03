import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'react-router-dom';
import NoticeEditor from './notice-editor';
import { useState } from 'react';

const categoryList = ['실습', '모집', '일반', '전시', '학술'];

export default function NoticeWrite() {
  const [title, setTitle] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') ?? '일반';
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleCategoryChange = (category: string) => {
    setSearchParams((prevSearchParams) => {
      if (category === 'all') {
        prevSearchParams.delete('category');
      } else {
        prevSearchParams.set('category', category);
      }
      return prevSearchParams;
    });
  };

  return (
    <div className='min-h-screen-vh mt-15 flex flex-col items-center justify-center'>
      <div className='w-full px-5 xl:px-0 text-center'>
        <strong className='flex text-start py-[20px]'>
          공지사항 게시물 작성하기
        </strong>
        <div className='flex items-center gap-4 mb-4 overflow-x-auto'>
          {/* 제목 */}
          <div className='flex items-center gap-2 flex-grow'>
            <label className='font-semiboldwhitespace-nowrap'>제목</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='제목을 입력해주세요'
              className='w-full border border-gray-300 rounded px-3 py-2'
            />
          </div>
          {/* 구분 */}
          <div className='flex items-center gap-2'>
            <label className='font-semiboldwhitespace-nowrap'>구분</label>
            <Select
              value={selectedCategory}
              onValueChange={(value) => handleCategoryChange(value)}
            >
              <SelectTrigger className='border rounded w-[100px] px-3 py-2'>
                <SelectValue placeholder='구분' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>전체</SelectItem>
                {categoryList.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 시작일 */}
          <div className='flex items-center gap-2'>
            <label className='font-semiboldwhitespace-nowrap'>시작일</label>
            <input
              type='date'
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className='border border-gray-300 rounded px-3 py-2 w-[140px]'
            />
          </div>

          {/* 종료일 */}
          <div className='flex items-center gap-2'>
            <label className='font-semiboldwhitespace-nowrap'>종료일</label>
            <input
              type='date'
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className='border border-gray-300 rounded px-3 py-2 w-[140px]'
            />
          </div>
        </div>

        {/* 에디터 */}
        <NoticeEditor />
        <div className='flex justify-end mt-4'>
          <Button
            type='button'
            className='h-[30px] md:h-[40px] w-[80px] md:w-[120px]'
            onClick={() => {
              console.log({
                title,
                category: selectedCategory,
                startDate,
                endDate,
              });
            }}
          >
            작성완료
          </Button>
        </div>
      </div>
    </div>
  );
}
