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
    <div className='w-full  xl:px-0 text-start'>
      <div className='flex flex-col justify-start items-start m-2 t-r-16 md:px-0'>
        <IsFixedCheckbox
          isFixed={formData.isFixed || false}
          setIsFixed={handleIsFixedChange}
        />

        {/* 제목 */}
        <div className='flex flex-col md:flex-row------------------ justify-start items-center md:ml-0 border-b-1 md:border-b-0 border-b-bg-gray-d/40 gap-2'>
          <label className='t-b-16 whitespace-nowrap'>제목 :</label>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleInputChange}
            className='w-[220px] md:w-full t-b-24 px-[10px] overflow-hidden text-ellipsis whitespace-nowrap border-1 border-bg-gray-d rounded-sm'
            placeholder='제목을 입력하세요'
            required
          />
        {/* 구분 + 시작일/종료일 */}
        <div className='flex flex-col md:flex-row gap-2 pt-r-14 md:gap-4 pb-[10px]'>

          {/* 구분 */}
          <div className='flex items-center justify-start gap-2 min-w-[140px]'>
            <label className='t-b-16 whitespace-nowrap w-[40px] mr-[8px] md:mr-0'>
              구분
            </label>
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className='border rounded w-[90px] md:w-[100px] px-2 py-1 md:px-3 md:py-2'>
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

          {/* 시작일/종료일 */}
          <div className='flex flex-col md:flex-row gap-2 md:gap-4'>

            {/* 시작일 */}
            <div className='flex items-center gap-2 md:gap-4'>
              <label className='t-b-16 whitespace-nowrap w-[40px] mr-[8px] md:mr-0'>
                시작일
              </label>
              <input
                type='date'
                name='periodStart'
                value={formData.periodStart}
                onChange={handleInputChange}
                onClick={(e) => e.currentTarget.showPicker()}
                className='border-2 border-bg-gray-d/60 rounded px-3 py-2 min-w-[160px]'
              />
            </div>

            {/* 종료일 */}
            <div className='flex items-center gap-2 md:gap-4'>
              <label className='t-b-16 whitespace-nowrap w-[40px] mr-[8px] md:mr-0'>
                종료일
              </label>
              <input
                type='date'
                name='periodEnd'
                value={formData.periodEnd}
                onChange={handleInputChange}
                onClick={(e) => e.currentTarget.showPicker()}
                className='border-2 border-bg-gray-d/60 rounded px-3 py-2 min-w-[160px]'
              />
            </div>

          </div>
        </div>
        </div>

      </div>
    </div>
  );
}
