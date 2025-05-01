// 필터링 같은 경우 백엔드와 협의해야할 부분이 있어서 잠시 중지입니다.
// 필터링 기능은 추후 추가될 예정입니다.

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function GalleryFilters() {
  return (
    <div className='flex justify-center items-center gap-4'>
      <Select>
        <SelectTrigger className='w-32'>
          <SelectValue placeholder='Theme' />
        </SelectTrigger>

        <SelectContent className=''>
          <SelectItem value='light'>Light</SelectItem>
          <SelectItem value='dark'>Dark</SelectItem>
          <SelectItem value='system'>System</SelectItem>
        </SelectContent>
      </Select>

      <Select>
        <SelectTrigger className='w-32'>
          <SelectValue placeholder='Theme' />
        </SelectTrigger>

        <SelectContent className=''>
          <SelectItem value='light'>Light</SelectItem>
          <SelectItem value='dark'>Dark</SelectItem>
          <SelectItem value='system'>System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
