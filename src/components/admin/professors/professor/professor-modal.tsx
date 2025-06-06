import { useRef, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import FormField from '@/components/admin/form-field';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  PatchProfessorRequest,
  ProfessorResponse,
} from '@/types/admin/professors';
import { handleApiError } from '@/components/common/error-handler';

interface Props {
  professor: ProfessorResponse;
  onEdit: (form: PatchProfessorRequest) => void;
  onDelete: (professorNo: number) => void;
  onClose: () => void;
}

export default function ProfessorModal({
  professor,
  onEdit,
  onDelete,
  onClose,
}: Props) {
  const initialUrl = professor.files?.url ?? '';
  const initialFilesNo = professor.files?.filesNo ?? 0;

  const [form, setForm] = useState({
    ...professor,
    filesNo: initialFilesNo,
    url: initialUrl,
  });

  const [previewUrl, setPreviewUrl] = useState<string>(initialUrl);
  const [file, setFile] = useState<File | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handlePickFile = () => {
    inputRef.current?.click();
  };

  const handleUploadImage = async () => {
    if (!file) {
      toast.error('이미지를 선택해주세요.');
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
      toast.success('이미지 업로드가 완료되었습니다.');
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    }
  };

  const handleSubmit = () => {
    const { professorNo, professorName, position, major, email, tel, filesNo } =
      form;
    onEdit({
      professorNo,
      professorName,
      position,
      major,
      email,
      tel,
      filesNo,
    });
    onClose();
  };

  const handleDeleteClick = () => {
    onDelete(form.professorNo);
    onClose();
  };

  const fields = [
    { name: 'professorName', label: '이름' },
    { name: 'position', label: '소속' },
    { name: 'major', label: '전공' },
    { name: 'email', label: '이메일' },
    { name: 'tel', label: '연락처' },
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className='max-w-[700px]'>
        <DialogHeader>
          <DialogTitle className='text-center'>PROFESSOR INFO</DialogTitle>
        </DialogHeader>
        <div className='flex gap-[15px]'>
          {/* 이미지 업로드 */}
          <div className='flex flex-col items-center gap-[10px]'>
            <label
              htmlFor='image-upload'
              className='w-[130px] aspect-[4/5] rounded border border-btn-gray-d cursor-pointer overflow-hidden hover:opacity-70'
              onClick={handlePickFile}
            >
              <img
                src={previewUrl || '/images/no-image.jpg'}
                alt='preview'
                className='w-full h-full object-cover'
                onError={(e) => (e.currentTarget.src = '/images/no-image.jpg')}
              />
            </label>
            <input
              id='image-upload'
              type='file'
              ref={inputRef}
              accept='image/*'
              onChange={handleFileInputChange}
              className='hidden'
            />
            <Button
              type='button'
              onClick={handleUploadImage}
              size='sm'
              variant='secondary'
              className='w-full'
            >
              이미지 업로드
            </Button>
          </div>
          {/* 입력 필드 */}
          <div className='w-full border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
            {fields.map(({ name, label }) => (
              <FormField key={name} id={name} label={label}>
                <input
                  id={name}
                  name={name}
                  value={(form as any)[name] ?? ''}
                  onChange={handleChange}
                  autoComplete='off'
                  className='w-full px-[15px] outline-none'
                />
              </FormField>
            ))}
          </div>
        </div>
        <DialogFooter className='grid grid-cols-2 mx-auto mt-[10px]'>
          <Button onClick={handleSubmit}>수정</Button>
          <Button variant='destructive' onClick={handleDeleteClick}>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
