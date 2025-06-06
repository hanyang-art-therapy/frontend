import FormField from '@/components/admin/form-field';
import { Button } from '@/components/ui/button';
import { postArtist } from '@/apis/admin/artists';
import { PostArtistRequest } from '@/types/admin/artists';
import { useState } from 'react';
import { toast } from 'sonner';
import { handleApiError } from '@/components/common/error-handler';

export default function ArtistForm({ onSuccess }: { onSuccess?: () => void }) {
  type ArtistFormState = {
    artistName: string;
    studentNo: string;
    cohort: string;
  };

  const [form, setForm] = useState<ArtistFormState>({
    artistName: '',
    studentNo: '',
    cohort: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value.replace(/\s+/g, ''), // 모든 공백 허용 안 함
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!form.artistName || !form.studentNo || !form.cohort) {
      toast.error('이름, 학번, 기수 모두 입력해주세요.');
      return;
    }
    if (form.artistName.length < 2 || form.artistName.length > 50) {
      toast.error('이름은 2자 이상 50자 이하로 입력해주세요.');
      return;
    }
    if (isNaN(Number(form.studentNo))) {
      toast.error('학번은 숫자만 입력이 가능합니다.');
      return;
    }
    if (form.studentNo.length !== 10) {
      toast.error('학번은 10자리 숫자만 입력이 가능합니다.');
      return;
    }
    if (/^0+$/.test(form.studentNo)) {
      toast.error('학번은 0으로만 구성될 수 없습니다.');
      return;
    }
    if (isNaN(Number(form.cohort))) {
      toast.error('기수는 숫자만 입력이 가능합니다.');
      return;
    }
    if (/^0+$/.test(form.cohort)) {
      toast.error('기수는 0으로만 구성될 수 없습니다.');
      return;
    }

    try {
      const submitForm: PostArtistRequest = {
        artistName: form.artistName,
        studentNo: Number(form.studentNo),
        cohort: Number(form.cohort),
      };
      await postArtist(submitForm);
      toast.success('등록이 완료되었습니다.');
      setForm({ artistName: '', studentNo: '', cohort: '' });
      onSuccess?.();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const fields = [
    { id: 'artistName', label: '이름', placeholder: '홍길동' },
    { id: 'studentNo', label: '학번', placeholder: '0000000000' },
    { id: 'cohort', label: '기수', placeholder: '00' },
  ];

  return (
    <form className='flex flex-col gap-[30px]' onSubmit={handleSubmit}>
      <div className='border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
        {fields.map(({ id, label, placeholder }) => (
          <FormField key={id} id={id} label={label}>
            <input
              id={id}
              name={id}
              value={(form as any)[id] ?? ''}
              onChange={handleChange}
              autoComplete='off'
              placeholder={placeholder}
              className='w-full px-[20px] outline-none cursor-pointer'
            />
          </FormField>
        ))}
      </div>

      <Button type='submit' className='ml-auto'>
        작가 등록
      </Button>
    </form>
  );
}
