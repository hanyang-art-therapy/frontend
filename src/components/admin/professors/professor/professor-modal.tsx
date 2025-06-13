import FormField from '@/components/admin/form-field';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  ProfessorsResponse,
  PatchProfessorRequest,
} from '@/types/admin/professors';
import type { MessageResponse } from '@/types';
import { postFile } from '@/apis/common/file';
import { useRef, useState, useEffect } from 'react';
import { toast } from 'sonner';
import { handleApiError } from '@/components/common/error-handler';
import { getProfessor } from '@/apis/admin/professors';

type Props = {
  professor: ProfessorsResponse;
  onEdit: (form: PatchProfessorRequest) => Promise<MessageResponse>;
  onDelete: (professorNo: number) => Promise<MessageResponse>;
  onClose: () => void;
};

export default function ProfessorModal({
  professor,
  onEdit,
  onDelete,
  onClose,
}: Props) {
  const [form, setForm] = useState<PatchProfessorRequest>({
    professorNo: 0,
    professorName: '',
    position: '',
    major: '',
    email: '',
    tel: '',
    filesNo: null,
  });

  const [previewUrl, setPreviewUrl] = useState('/images/no-image.jpg');

  useEffect(() => {
    try {
      const fetchProfessor = async () => {
        const response = await getProfessor(professor.professorNo);
        setForm({
          professorNo: professor.professorNo,
          professorName: professor.professorName,
          position: professor.position,
          major: professor.major,
          email: response?.email ?? '',
          tel: response?.tel ?? '',
          filesNo: null,
        });
        setPreviewUrl(response?.files?.url || '/images/no-image.jpg');
      };

      fetchProfessor();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  }, [professor]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value.trim(),
      filesNo: null,
    }));
  };

  const handleImageUpload = () => {
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
      const uploadedFile = await postFile([selected]);

      setForm((prev) => ({
        ...prev,
        filesNo: uploadedFile[0].filesNo,
      }));

      setPreviewUrl(URL.createObjectURL(selected));
      toast.success('이미지 업로드가 완료되었습니다.');
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
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
      const submitForm: PatchProfessorRequest = {
        professorNo: form.professorNo,
        professorName: form.professorName,
        position: form.position,
        major: form.major,
        email: form.email,
        tel: form.tel,
        filesNo: form.filesNo,
      };
      const res = await onEdit(submitForm);
      toast.success(res.message);
      onClose();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const handleDelete = async () => {
    try {
      const res = await onDelete(form.professorNo);
      toast.success(res.message);
      onClose();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const fields = [
    { id: 'professorName', label: '이름' },
    { id: 'position', label: '소속' },
    { id: 'major', label: '전공' },
    { id: 'email', label: '이메일' },
    { id: 'tel', label: '연락처' },
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className='max-w-[700px]'>
        <DialogHeader>
          <DialogTitle className='text-center'>PROFESSOR INFO</DialogTitle>
          <DialogDescription className='text-center'>
            교수 상세 정보
          </DialogDescription>
        </DialogHeader>
        <div className='flex gap-[15px]'>
          {/* 이미지 업로드 */}
          <div className='flex flex-col items-center gap-[15px]'>
            <div className='w-[100px] md:w-[130px] aspect-[4/5] rounded border border-btn-gray-d overflow-hidden'>
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt='preview'
                  className='w-full h-full object-cover'
                  onError={(e) =>
                    (e.currentTarget.src = '/images/no-image.jpg')
                  }
                  style={{ cursor: 'default' }}
                />
              ) : (
                <span className='t-r-14 text-gray-6'>NO IMAGE</span>
              )}
            </div>
            <input
              id='image-upload'
              type='file'
              ref={fileInputRef}
              accept='image/*'
              onChange={handleFileChange}
              className='hidden'
            />
            <Button
              type='button'
              onClick={handleImageUpload}
              size='sm'
              variant='secondary'
              className='w-full'
              disabled={uploading}
            >
              {uploading ? '업로드 중...' : '이미지 업로드'}
            </Button>
          </div>

          {/* 정보 입력 필드 */}
          <div className='w-full border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
            {fields.map(({ id, label }) => (
              <FormField key={id} id={id} label={label}>
                <input
                  id={id}
                  name={id}
                  value={
                    form[id as keyof Omit<PatchProfessorRequest, 'files'>] ?? ''
                  }
                  onChange={handleChange}
                  autoComplete='off'
                  className='w-full px-[15px] outline-none'
                />
              </FormField>
            ))}
          </div>
        </div>
        <DialogFooter className='grid grid-cols-2 gap-[10px] mx-auto mt-[10px] w-[100%] md:w-auto'>
          <Button onClick={handleSubmit} className='w-full md:w-[200px]'>
            수정
          </Button>
          <Button
            variant='destructive'
            onClick={handleDelete}
            className='w-full md:w-[200px]'
          >
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
