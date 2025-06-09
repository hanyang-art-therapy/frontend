import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORY_LIST } from '@/constants/notice/notice-category';

export default function CategorySelect({
  selectedCategory,
  handleCategoryChange,
}: {
  selectedCategory: string;
  handleCategoryChange: (category: string) => void;
}) {
  return (
    <div className='flex items-center gap-2'>
      <label className='font-semibold whitespace-nowrap t-b-16 w-[30px]'>
        구분
      </label>
      <Select
        value={selectedCategory}
        onValueChange={(value) => handleCategoryChange(value)}
      >
        <SelectTrigger className='border rounded w-[80px] md:w-[100px] px-1 py-0 md:px-3 md:py-2'>
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
  );
}
