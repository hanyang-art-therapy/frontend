import FormField from '@/components/admin/form-field';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ArtistResponse, PatchArtistRequest } from '@/types/admin/artists';
import { Artist, MessageResponse } from '@/types';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { handleApiError } from '@/components/common/error-handler';

type Props = {
  artist: ArtistResponse;
  onEdit: (form: PatchArtistRequest) => Promise<MessageResponse>;
  onDelete: (artistNo: number) => Promise<MessageResponse>;
  onClose: () => void;
};

export default function ArtistModal({
  artist,
  onEdit,
  onDelete,
  onClose,
}: Props) {
  type ArtistFormState = Artist;

  const [form, setForm] = useState<ArtistFormState>({
    artistNo: 0,
    artistName: '',
    studentNo: 0,
    cohort: 0,
  });

  useEffect(() => {
    setForm({
      artistNo: artist.artistNo,
      artistName: artist.artistName,
      studentNo: artist.studentNo,
      cohort: artist.cohort,
    });
  }, [artist]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value.replace(/\s+/g, ''), // 공백 제거
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
    if (isNaN(form.studentNo)) {
      toast.error('학번은 숫자만 입력이 가능합니다.');
      return;
    }
    if (String(form.studentNo).length !== 10) {
      toast.error('학번은 10자리 숫자만 입력이 가능합니다.');
      return;
    }
    if (/^0+$/.test(String(form.studentNo))) {
      toast.error('학번은 0으로만 구성될 수 없습니다.');
      return;
    }
    if (isNaN(form.cohort)) {
      toast.error('기수는 숫자만 입력이 가능합니다.');
      return;
    }
    if (/^0+$/.test(String(form.cohort))) {
      toast.error('기수는 0으로만 구성될 수 없습니다.');
      return;
    }

    try {
      const submitForm: PatchArtistRequest = {
        artistNo: form.artistNo,
        artistName: form.artistName,
        studentNo: form.studentNo,
        cohort: form.cohort,
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
      const res = await onDelete(form.artistNo);
      toast.success(res.message);
      onClose();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const fields = [
    { id: 'artistName', label: '이름' },
    { id: 'studentNo', label: '학번' },
    { id: 'cohort', label: '기수' },
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className='max-w-[700px]'>
        <DialogHeader>
          <DialogTitle className='text-center'>ARTIST INFO</DialogTitle>
          <DialogDescription className='text-center'>
            작가 상세 정보
          </DialogDescription>
        </DialogHeader>
        <div className='w-full border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
          {fields.map(({ id, label }) => (
            <FormField key={id} id={id} label={label}>
              <input
                id={id}
                name={id}
                value={form[id as keyof ArtistFormState] ?? ''}
                onChange={handleChange}
                autoComplete='off'
                className='w-full px-[15px] outline-none cursor-pointer'
              />
            </FormField>
          ))}
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
