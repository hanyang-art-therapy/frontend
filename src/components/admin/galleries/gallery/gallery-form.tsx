import FormField from '@/components/admin/form-field';
import { Button } from '@/components/ui/button';
import { postGallery } from '@/apis/admin/galleries';
import { PostGalleryRequest } from '@/types/admin/galleries';
import { Gallery } from '@/types';
import { useState } from 'react';
import { toast } from 'sonner';
import { handleApiError } from '@/components/common/error-handler';

type Props = {
  postedYears: string[];
};

export default function GalleryForm({ postedYears }: Props) {
  const [form, setForm] = useState<Omit<Gallery, 'galleriesNo'>>({
    title: '',
    startDate: '',
    endDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const startYear = form.startDate.split('-')[0];
    const endYear = form.endDate.split('-')[0];
    const filteredYears = postedYears.filter((postedYear) => {
      return postedYear !== endYear || postedYear !== startYear;
    });

    // 유효성 검사
    if (!form.title || !form.startDate || !form.endDate) {
      toast.error('전시 제목, 전시 기간 모두 입력해주세요.');
      return;
    }
    if (filteredYears.includes(startYear)) {
      toast.error('해당년도에 이미 전시회가 등록되어 있습니다.');
      return;
    }
    if (filteredYears.includes(endYear)) {
      toast.error('해당년도에 이미 전시회가 등록되어 있습니다.');
      return;
    }
    if (startYear !== endYear) {
      toast.error('시작년도와 종료년도는 같아야 합니다.');
      return;
    }
    if (form.startDate > form.endDate) {
      toast.error('종료일자가 시작일자보다 빠를 수 없습니다.');
      return;
    }

    try {
      const submitForm: PostGalleryRequest = {
        title: form.title,
        startDate: form.startDate,
        endDate: form.endDate,
      };
      const res = await postGallery(submitForm);
      toast.success(res.message);
      setForm({ title: '', startDate: '', endDate: '' });
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const fields = [
    { id: 'title', label: '제목' },
    { id: 'startDate', label: '시작 일자' },
    { id: 'endDate', label: '종료 일자' },
  ];

  return (
    <form className='flex flex-col gap-[30px]' onSubmit={handleSubmit}>
      <div className='border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
        {fields.map(({ id, label }) => (
          <FormField key={id} id={id} label={label}>
            <input
              id={id}
              name={id}
              type={id === 'startDate' || id === 'endDate' ? 'date' : 'text'}
              value={form[id as keyof PostGalleryRequest] ?? ''}
              onChange={handleChange}
              autoComplete='off'
              className='w-full px-[15px] outline-none cursor-pointer'
            />
          </FormField>
        ))}
      </div>

      <Button type='submit' className='ml-auto'>
        전시회 등록
      </Button>
    </form>
  );
}
