import FormField from '@/components/admin/form-field';
import { Button } from '@/components/ui/button';
import { postFile } from '@/apis/common/file';
import { postProfessor } from '@/apis/admin/professors';
import { PostProfessorRequest } from '@/types/admin/professors';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { handleApiError } from '@/components/common/error-handler';

export default function ProfessorForm() {
  const [form, setForm] = useState<PostProfessorRequest>({
    professorName: '',
    position: '',
    major: '',
    email: '',
    tel: '',
    filesNo: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    const maxSize = 5 * 1024 * 1024;
    if (selected.size > maxSize) {
      toast.error('파일의 용량이 5MB를 초과하였습니다.');
      e.target.value = '';
      return;
    }

    setUploading(true);
    try {
      const uploadedFiles = await postFile([selected]);
      console.log(uploadedFiles);

      setForm((prev) => ({
        ...prev,
        filesNo: uploadedFiles[0].filesNo,
      }));

      console.log(uploadedFiles);

      setPreviewUrl(URL.createObjectURL(selected));
      toast.success('이미지 업로드가 완료되었습니다.');
    } catch (error) {
      toast.error(handleApiError(error));
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
      filesNo: prev.filesNo,
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
        filesNo: null,
      });
      setPreviewUrl('');
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
    <form className='flex flex-col gap-[15px]' onSubmit={handleSubmit}>
      <div className='flex gap-[15px]'>
        {/* 이미지 업로드 */}
        <div className='flex flex-col items-center gap-[15px]'>
          <div
            className='w-[100px] md:w-[130px] aspect-[4/5] border border-btn-gray-d bg-btn-gray-fa rounded flex items-center justify-center overflow-hidden'
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
