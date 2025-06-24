import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORY_LIST } from '@/constants/notice/notice-category';

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
  return (
    <div className='flex flex-wrap items-center gap-2 md:gap-4 t-b-16 w-full'>
      {/* 제목 */}
      <div className='flex items-center gap-2 flex-grow min-w-[200px] mr-2 md:mr-0'>
        <label className='whitespace-nowrap w-[30px]'>제목</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='제목을 입력해주세요'
          className='flex-grow border-2 border-bg-gray-d/60 rounded px-3 py-2 min-w-[150px]'
        />
      </div>

      {/* 구분 */}
      <div className='flex items-center gap-2 min-w-[140px]'>
        <label className='whitespace-nowrap w-[30px]'>구분</label>
        <Select
          value={selectedCategory}
          onValueChange={handleCategoryChange}
        >
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
