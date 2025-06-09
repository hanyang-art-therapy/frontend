import FormField from '@/components/admin/form-field';
import { Button } from '@/components/ui/button';
import { FileUpload } from '@/apis/admin/files';
import { postProfessor } from '@/apis/admin/professors';
import { PostProfessorRequest } from '@/types/admin/professors';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { handleApiError } from '@/components/common/error-handler';
import { MessageResponse } from '@/types';

interface Props {
  onSuccess: (form: PostProfessorRequest) => Promise<MessageResponse>;
}

export default function ProfessorForm({ onSuccess }: Props) {
  const [form, setForm] = useState<PostProfessorRequest>({
    professorName: '',
    position: '',
    major: '',
    email: '',
    tel: '',
    files: { filesNo: 0 },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const { filesNo } = await FileUpload(formData);

      setForm((prev) => ({
        ...prev,
        files: {
          filesNo,
        },
      }));
      setPreviewUrl(URL.createObjectURL(file));
      toast.success('이미지 업로드 성공');
    } catch (e) {
      toast.error('이미지 업로드 실패');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value.trim(),
      files: { filesNo: 0 },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 유효성 검사
    if (!form.professorName || !form.position) {
      toast.error('이름, 소속 모두 입력해주세요.');
      return;
    }
    if (form.professorName.length < 2 || form.professorName.length > 50) {
      toast.error('이름은 2자 이상 50자 이하로 입력해주세요.');
      return;
    }

    try {
      const res = await postProfessor(form);
      toast.success(res.message);
      setForm({
        professorName: '',
        position: '',
        major: '',
        email: '',
        tel: '',
        files: { filesNo: 0 },
      });
      setPreviewUrl('');
      onSuccess?.(form);
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const fields = [
    { id: 'professorName', label: '이름', placeholder: '홍길동' },
    { id: 'position', label: '소속', placeholder: '교수' },
    { id: 'major', label: '전공', placeholder: '미술치료학과' },
    { id: 'email', label: '이메일', placeholder: 'ex@hanyang.ac.kr' },
    { id: 'tel', label: '연락처', placeholder: '010-0000-0000' },
  ];

  return (
    <form className='flex flex-col gap-[30px]' onSubmit={handleSubmit}>
      <div className='flex gap-[30px] items-start'>
        {/* 이미지 미리보기 (미리보기만, 클릭X, 포인터X, hoverX) */}
        <div className='flex flex-col items-center gap-[15px]'>
          <div
            className='w-[130px] aspect-[4/5] border border-btn-gray-d bg-btn-gray-fa rounded flex items-center justify-center overflow-hidden'
            style={{ cursor: 'default' }}
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
          </div>
          <input
            id='file-upload'
            type='file'
            accept='image/*'
            ref={fileInputRef}
            className='hidden'
            onChange={handleFileChange}
          />
          <Button
            type='button'
            variant='secondary'
            size='sm'
            className='w-full'
            onClick={handleImageUpload}
            disabled={uploading}
          >
            {uploading ? '업로드 중...' : '이미지 업로드'}
          </Button>
        </div>
        <div className='w-full border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
          {fields.map(({ id, label, placeholder }) => (
            <FormField key={id} id={id} label={label}>
              <input
                id={id}
                name={id}
                placeholder={placeholder}
                value={
                  form[id as keyof Omit<PostProfessorRequest, 'files'>] ?? ''
                }
                onChange={handleChange}
                className='w-full px-[15px] outline-none'
                autoComplete='off'
              />
            </FormField>
          ))}
        </div>
      </div>
      <Button type='submit' className='mx-auto'>
        교수진 등록
      </Button>
    </form>
  );
}
