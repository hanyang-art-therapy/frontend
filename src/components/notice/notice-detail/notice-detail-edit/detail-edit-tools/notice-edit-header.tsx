import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CATEGORY_LIST } from '@/constants/notice/notice-category';
import { useNavigate, useParams } from 'react-router-dom';

interface NoticeFile {
  name: string;
  url: string;
}

interface NoticeData {
  title: string;
  category: string;
  content: string;
  periodStart: string;
  periodEnd: string;
  files?: NoticeFile[];
}

interface Props {
  formData: NoticeData;
  setFormData: React.Dispatch<React.SetStateAction<NoticeData>>;
  loading: boolean;
  selectedCategory: string;
  handleCategoryChange: (value: string) => void;
}

export default function NoticeEditHeader({
  formData,
  setFormData,
  selectedCategory,
  handleCategoryChange,
}: Props) {
  const { noticeNo } = useParams<{ noticeNo: string }>();
  const navigate = useNavigate();
  const isEdit = Boolean(noticeNo);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    navigate(isEdit ? `/notice/${noticeNo}` : '/notice');
  };

  return (
    <div className='w-full md:h-[140px] xl:px-0 text-start'>
      <div className='flex flex-col gap-4 mt-2 t-r-16 px-[12px] md:px-[20px]'>
        {/* 제목 */}
        <div>
          <div className='w-[90%] border-t-2 border-t-btn-gray-9 py-[8px]'></div>
          <input
            type='text'
            name='title'
            value={formData.title}
            onChange={handleInputChange}
            className='w-full t-b-32 px-[10px]'
            placeholder='제목을 입력하세요'
            required
          />
        </div>

        {/* 구분 && 기간 */}
        <div className='flex flex-row flex-wrap gap-2 pt-r-14 md:gap-4 md:pb-[10px]'>
          {/* 구분 */}
       

          {/* 기간 */}
          <div className='flex items-center gap-2 t-r-16'>
               <div className='flex flex-col md:flex-row items-center gap-2 md:gap-4'>
            <label className='t-b-16 whitespace-nowrap'>
                구분
              </label>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className='border border-gray-300 rounded px-1 py-0 md:w-[140px]'>
                <SelectValue placeholder='전체' />
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
            <div className='flex flex-col md:flex-row items-center gap-2 md:gap-4 '>
              <label className='t-b-16 whitespace-nowrap w-[40px] mr-[8px] md:mr-0'>
                시작일
              </label>
              <div>
                <input
                  type='date'
                  name='periodStart'
                  value={formData.periodStart}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded px-2 py-2 w-[122px] md:w-[140px]'
                />
              </div>
          
            </div>
            <div className='flex flex-col md:flex-row items-center gap-2 md:gap-4 pr-[10px] md:pr-0'>
                <label className='whitespace-nowrap t-b-16 w-[40px] mr-[8px] md:mr-0'>
                  종료일
                </label>
                <input
                  type='date'
                  name='periodEnd'
                  value={formData.periodEnd}
                  onChange={handleInputChange}
                  className='border border-gray-300 rounded px-2 py-2 w-[122px] md:w-[140px]'
                />
              </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
