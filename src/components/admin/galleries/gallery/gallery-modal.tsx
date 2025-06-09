import FormField from '@/components/admin/form-field';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  GalleriesResponse,
  PatchGalleryRequest,
} from '@/types/admin/galleries';
import { Gallery } from '@/types';
import { MessageResponse } from '@/types';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { handleApiError } from '@/components/common/error-handler';

interface Props {
  gallery: GalleriesResponse;
  onEdit: (form: PatchGalleryRequest) => Promise<MessageResponse>;
  onDelete: (artistNo: number) => Promise<MessageResponse>;
  onClose: () => void;
}

export default function GalleryModal({
  gallery,
  onEdit,
  onDelete,
  onClose,
}: Props) {
  type GalleryFormState = Gallery;

  const [form, setForm] = useState<GalleryFormState>({
    galleriesNo: 0,
    title: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    setForm({
      galleriesNo: gallery.galleriesNo,
      title: gallery.title,
      startDate: gallery.startDate,
      endDate: gallery.endDate,
    });
  }, [gallery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value.trim(),
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
      const submitForm: PatchGalleryRequest = {
        galleriesNo: form.galleriesNo,
        title: form.title,
        startDate: form.startDate,
        endDate: form.endDate,
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
      const res = await onDelete(form.galleriesNo);
      toast.success(res.message);
      onClose();
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
    <Dialog open onOpenChange={onClose}>
      <DialogContent className='max-w-[700px]'>
        <DialogHeader>
          <DialogTitle className='text-center'>GALLERY INFO</DialogTitle>
        </DialogHeader>

        <div className='w-full border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
          {fields.map(({ id, label }) => (
            <FormField key={id} id={id} label={label}>
              <input
                id={id}
                name={id}
                type={id === 'startDate' || id === 'endDate' ? 'date' : 'text'}
                value={form[id as keyof GalleryFormState] ?? ''}
                onChange={handleChange}
                autoComplete='off'
                className='w-full px-[15px] outline-none cursor-pointer'
              />
            </FormField>
          ))}
        </div>

        <DialogFooter className='grid grid-cols-2 mx-auto mt-[10px] gap-[15px]'>
          <Button onClick={handleSubmit}>수정</Button>
          <Button variant='destructive' onClick={handleDelete}>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
