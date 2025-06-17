import { useState } from "react";

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

export default function NoticeEditHeader() {

      const [formData, setFormData] = useState<NoticeData>({
        title: '',
        category: 'GENERAL',
        content: '',
        periodStart: '',
        periodEnd: '',
        files: [],
      });
      const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
    return (
         <div
          className='w-full md:h-[140px] xl:px-0 border-t-2 py-[10px] text-start'
        >
          <div className='flex flex-col gap-4 mt-2 t-r-16 px-[20px]'>
            {/* 제목 */}
            <div>
              <input
                type='text'
                name='title'
                value={formData.title}
                onChange={handleInputChange}
                className='w-full t-b-3'
                placeholder='제목을 입력하세요'
                required
              />
            </div>
            {/* 구분 && 기간  */}
           <div className='flex flex-row flex-wrap gap-2 px-[10px] t-r-14 md:gap-4 md:pb-[10px]'>
              <div className='flex items-center gap-2'>
                <label className='whitespace-nowrap t-b-16 w-[30px]'>
                  구분
                </label>
                <div>
                  <select
                    name='category'
                    value={formData.category}
                    onChange={handleInputChange}
                    className='w-full p-2 border-2 border-b-bg-gray-d rounded-sm transition-colors bg-white'
                    required
                  >
                    <option value='GENERAL'>일반</option>
                    <option value='PRACTICE'>실습</option>
                    <option value='RECRUIT'>모집</option>
                    <option value='EXHIBITION'>전시</option>
                    <option value='ACADEMIC'>학술</option>
                  </select>
                </div>
              </div>
              {/* 기간 */}
              <div className='flex items-center gap-2 t-r-16'>
                {/* <strong className='text-shadow-gray-6'>기간</strong> */}
                <div className='flex justify-center items-center gap-6'>
                  <strong>시작일</strong>
                  <div>
                    <input
                      type='date'
                      name='periodStart'
                      value={formData.periodStart}
                      onChange={handleInputChange}
                      className='w-full p-2 border-2 border-b-bg-gray-d rounded-sm'
                    />
                  </div>
                  <div>
                    <div className='flex justify-center items-center gap-6'>
                      <strong>종료일</strong>
                      <div>
                        <input
                          type='date'
                          name='periodEnd'
                          value={formData.periodEnd}
                          onChange={handleInputChange}
                          className='w-full p-2 border-2 border-b-bg-gray-d rounded-sm'
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}