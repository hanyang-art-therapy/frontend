import FormField from '@/components/admin/form-field';
import { Button } from '@/components/ui/button';
import { postGallery } from '@/apis/admin/galleries';
import { PostGalleryRequest } from '@/types/admin/galleries';
import { useState } from 'react';
import { toast } from 'sonner';
import { handleApiError } from '@/components/common/error-handler';

export default function GalleryForm({ onSuccess }: { onSuccess?: () => void }) {
  const [form, setForm] = useState<PostGalleryRequest>({
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

    // 유효성 검사
    if (!form.title || !form.startDate || !form.endDate) {
      toast.error('전시 제목, 전시 기간 모두 입력해주세요.');
      return;
    }

    try {
      const submitForm: PostGalleryRequest = {
        title: form.title,
        startDate: form.startDate,
        endDate: form.endDate,
      };
      await postGallery(submitForm);
      toast.success('전시회 등록이 완료되었습니다.');
      setForm({ title: '', startDate: '', endDate: '' });
      onSuccess?.();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const fields = [
    { id: 'title', label: '제목', placeholder: '올해의 전시회' },
    { id: 'startDate', label: '시작 일자' },
    { id: 'endDate', label: '종료 일자' },
  ];

  return (
    <form className='flex flex-col gap-[30px]' onSubmit={handleSubmit}>
      <div className='border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
        {fields.map(({ id, label, placeholder }) => (
          <FormField key={id} id={id} label={label}>
            <input
              id={id}
              name={id}
              type={id === 'startDate' || id === 'endDate' ? 'date' : 'text'}
              value={(form as any)[id] ?? ''}
              onChange={handleChange}
              autoComplete='off'
              placeholder={placeholder}
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
