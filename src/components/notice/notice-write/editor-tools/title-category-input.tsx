import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORY_LIST } from '@/constants/notice/notice-category';
import { useState } from 'react';

export default function TitleAndCategoryInput({
  title,
  setTitle,
  selectedCategory,
  handleCategoryChange,
}: {
  title: string;
  setTitle: (title: string) => void;
  selectedCategory: string;
  handleCategoryChange: (category: string) => void;
}) {
  const [placeholder, setPlaceholder] = useState('제목을 입력해주세요');
  return (
    <div className='flex flex-wrap items-center gap-2 md:gap-4 t-b-16 w-full'>
      {/* 제목 */}
      <div className='flex items-center gap-2 flex-grow min-w-[200px] mr-2 md:mr-0'>
        <label className='t-b-16 whitespace-nowrap w-[40px]'>제목</label>
        <input
          type='text'
          value={title}
          onFocus={() => setPlaceholder('')}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => setPlaceholder('제목을 입력해주세요')}
          placeholder={placeholder}
          className='flex-grow border-2 border-bg-gray-d/60 rounded px-3 py-2 min-w-[150px] transition-all'
        />
      </div>

      {/* 구분 */}
      <div className='flex items-center justify-center gap-2 min-w-[140px]'>
        <label className='whitespace-nowrap w-[40px]'>구분</label>
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className='border rounded w-[90px] md:w-[100px] px-2 py-1 md:px-3 md:py-2'>
            <SelectValue placeholder='구분' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>전체</SelectItem>
            {CATEGORY_LIST.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
