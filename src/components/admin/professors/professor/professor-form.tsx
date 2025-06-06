import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import FormField from '@/components/admin/form-field';
import axios from 'axios';
import { toast } from 'sonner';

export default function ProfessorForm({
  onRegister,
}: {
  onRegister?: (form: any) => void;
}) {
  const fields = [
    { id: 'professorName', label: '이름', placeholder: '홍길동' },
    { id: 'position', label: '소속', placeholder: '교수' },
    { id: 'major', label: '전공', placeholder: '미술치료학과' },
    { id: 'email', label: '이메일', placeholder: 'ex@hanyang.ac.kr' },
    { id: 'tel', label: '연락처', placeholder: '010-0000-0000' },
  ];

  const [form, setForm] = useState({
    professorName: '',
    position: '',
    major: '',
    email: '',
    tel: '',
    filesNo: 0,
    url: '',
  });

  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handlePickFile = () => {
    inputRef.current?.value && (inputRef.current.value = '');
    inputRef.current?.click();
  };

  const handleUploadImage = async () => {
    if (!file) {
      toast.error('이미지 파일을 선택해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/files/upload`,
        formData
      );
      const { filesNo, url } = res.data;
      setForm((prev) => ({ ...prev, filesNo, url }));
      setPreviewUrl(url);
      toast.success('이미지 업로드 성공');
    } catch (e) {
      toast.error('이미지 업로드 실패');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = () => {
    if (!form.professorName) {
      toast.error('이름을 입력하세요.');
      return;
    }
    if (!form.filesNo) {
      toast.error('이미지를 업로드하세요.');
      return;
    }

    onRegister?.(form);
    toast.success('교수진 등록 완료');
  };

  return (
    <div className='flex flex-col gap-[30px]'>
      <div className='flex gap-[30px] items-start'>
        {/* 이미지 업로드 */}
        <div className='flex flex-col items-center gap-[15px]'>
          <label
            htmlFor='file-upload'
            className='w-[130px] aspect-[4/5] border border-btn-gray-d bg-btn-gray-fa rounded cursor-pointer hover:opacity-70 flex items-center justify-center overflow-hidden'
            onClick={handlePickFile}
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt='preview'
                className='w-full h-full object-cover'
                onError={(e) => (e.currentTarget.src = '/images/no-image.jpg')}
              />
            ) : (
              <span className='t-r-14 text-gray-6'>NO IMAGE</span>
            )}
          </label>
          <input
            id='file-upload'
            type='file'
            accept='image/*'
            ref={inputRef}
            className='hidden'
            onChange={handleFileChange}
          />

          <Button
            type='button'
            variant='secondary'
            size='sm'
            className='w-full'
            onClick={handleUploadImage}
          >
            이미지 업로드
          </Button>
        </div>

        {/* 교수진 정보 입력 필드 */}
        <div className='w-full border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
          {fields.map(({ id, label, placeholder }) => (
            <FormField key={id} id={id} label={label}>
              <input
                id={id}
                name={id}
                placeholder={placeholder}
                value={(form as any)[id]}
                onChange={handleChange}
                className='w-full px-[15px] outline-none'
                autoComplete='off'
              />
            </FormField>
          ))}
        </div>
      </div>

      <Button type='button' className='mx-auto' onClick={handleRegister}>
        교수진 등록
      </Button>
    </div>
  );
}
