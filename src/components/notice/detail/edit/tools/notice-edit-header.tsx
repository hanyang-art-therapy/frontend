import IsFixedCheckbox from '@/components/notice/notice-write/editor-tools/infixed-checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORY_LIST } from '@/constants/notice/notice-category';

type NoticeFile = {
  name: string;
  url: string;
  filesNo?: number;
  isNew?: boolean;
};

type NoticeData = {
  title: string;
  category: string;
  content: string;
  periodStart: string;
  periodEnd: string;
  isFixed?: boolean;
  files?: NoticeFile[];
};

type Props = {
  formData: NoticeData;
  setFormData: React.Dispatch<React.SetStateAction<NoticeData>>;
  loading: boolean;
  selectedCategory: string;
  handleCategoryChange: (value: string) => void;
};

export default function NoticeEditHeader({
  formData,
  setFormData,
  selectedCategory,
  handleCategoryChange,
}: Props) {
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIsFixedChange = (isFixed: boolean) => {
    setFormData((prev) => ({ ...prev, isFixed }));
  };

  return (
    <div className='w-full xl:px-0 text-start pb-2 px-2'>
      <div className='flex flex-col justify-start items-start m-2 t-r-16 md:px-0 px-2 md:gap-2'>
        <div className='flex items-center'>
          <IsFixedCheckbox
            isFixed={formData.isFixed || false}
            setIsFixed={handleIsFixedChange}
          />
        </div>

        {/* 제목 + 구분 + 기간 */}
        <div className='flex flex-col md:flex-row md:items-center md:ml-0 border-b-1 md:border-b-0 border-b-bg-gray-d/40 gap-2 mt-1 w-full'>
          {/* 제목 */}
          <div className='flex w-full items-center gap-4 ml-1 md:ml-0'>
            <label className='t-b-16 whitespace-nowrap'>제목</label>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
              className='flex-1 min-h-[46px] md:min-w-[600px] t-b-24 px-[10px] overflow-hidden text-ellipsis whitespace-nowrap border border-bg-gray-d rounded-sm mr-2'
              placeholder='제목을 입력하세요'
              required
            />
          </div>

          {/* 구분 */}
          <div className='flex items-center gap-4 min-w-[140px]'>
            <label className='t-b-16 whitespace-nowrap ml-1 md:ml-0'>
              구분
            </label>
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className='flex-1 border rounded px-2 py-2 max-w-[90px] md:max-w-[140px]'>
                <SelectValue placeholder='전체' />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_LIST.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 시작일 */}
          <div className='flex w-full items-center gap-2'>
            <label className='t-b-16 whitespace-nowrap'>시작일</label>
            <input
              type='date'
              name='periodStart'
              value={formData.periodStart}
              onChange={handleInputChange}
              onClick={(e) => e.currentTarget.showPicker()}
              className='border-2 border-bg-gray-d/60 rounded px-3 py-2 md:w-auto min-w-[160px]'
            />
          </div>

          {/* 종료일 */}
          <div className='flex w-full items-center gap-2'>
            <label className='t-b-16 whitespace-nowrap'>종료일</label>
            <input
              type='date'
              name='periodEnd'
              value={formData.periodEnd}
              onChange={handleInputChange}
              onClick={(e) => e.currentTarget.showPicker()}
              className='border-2 border-bg-gray-d/60 rounded px-3 py-2 md:w-auto min-w-[160px]'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
