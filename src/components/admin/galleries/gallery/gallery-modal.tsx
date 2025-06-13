import FormField from '@/components/admin/form-field';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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

type Props = {
  postedYears: string[];
  gallery: GalleriesResponse;
  onEdit: (form: PatchGalleryRequest) => Promise<MessageResponse>;
  onDelete: (artistNo: number) => Promise<MessageResponse>;
  onClose: () => void;
};

export default function GalleryModal({
  postedYears,
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
          <DialogDescription className='text-center'>
            전시회 상세 정보
          </DialogDescription>
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
