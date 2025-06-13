import ArtistSelectModal from '@/components/admin/arts/art/artists-modal';
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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { AdminArtResponse, PatchAdminArtRequest } from '@/types/admin/arts';
import { ArtistResponse } from '@/types/admin/artists';
import { Gallery } from '@/types';
import type { MessageResponse } from '@/types';
import { FileUpload } from '@/apis/admin/files';
import { getArtists } from '@/apis/admin/artists';
import { getGalleries } from '@/apis/admin/galleries';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import { handleApiError } from '@/components/common/error-handler';

type Props = {
  art: AdminArtResponse;
  onEdit: (form: PatchAdminArtRequest) => Promise<MessageResponse>;
  onDelete: (artsNo: number) => Promise<MessageResponse>;
  onClose: () => void;
};

export default function AdminArtModal({
  art,
  onClose,
  onEdit,
  onDelete,
}: Props) {
  const [form, setForm] = useState({
    artsNo: 0,
    galleriesNo: 0,
    artName: '',
    caption: '',
    artType: 'SINGLE',
    coDescription: '',
    filesNo: 0,
  });

  const [previewUrl, setPreviewUrl] = useState('/images/no-image.jpg');

  useEffect(() => {
    if (!art) return;
    setForm({
      artsNo: art.artsNo,
      galleriesNo: art.galleriesNo,
      artName: art.artName,
      caption: art.caption,
      artType: art.artType,
      coDescription: art.coDescription ?? '',
      filesNo: art.filesNo,
    });
    setPreviewUrl(art.fileUrl || '/images/no-image.jpg');
  }, [art]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value.trim(),
    }));
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selected);

      const { filesNo } = await FileUpload(formData);

      setForm((prev) => ({
        ...prev,
        filesNo,
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

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/images/no-image.jpg';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const submitForm: PatchAdminArtRequest = {
        artsNo: form.artsNo,
        galleriesNo: form.galleriesNo,
        artName: form.artName,
        caption: form.caption,
        artType: form.artType as 'SINGLE' | 'GROUP',
        coDescription: form.coDescription,
        filesNo: form.filesNo,
        // artists: form.artsNo,
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
      const res = await onDelete(form.artsNo);
      toast.success(res.message);
      onClose();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const fields = [
    { id: 'artType', label: '작품타입' },
    { id: 'artName', label: '작품명' },
    { id: 'caption', label: '캡션' },
    { id: 'galleriesNo', label: '전시회' },
    { id: 'coDescription', label: '공동 작품평' },
    { id: 'coDescription', label: '작가' },
    { id: 'coDescription', label: '[]작가 개인 작품평' },
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className='max-w-[700px]'>
        <DialogHeader>
          <DialogTitle className='text-center'>ARTWORK INFO</DialogTitle>
        </DialogHeader>

        <div className='flex gap-[15px]'>
          {/* 이미지 업로드 */}
          <div className='flex flex-col items-center gap-[10px]'>
            <div className='w-[130px] aspect-[4/5] rounded border border-btn-gray-d overflow-hidden'>
              <img
                src={previewUrl}
                alt='preview'
                className='w-full h-full object-cover'
                onError={handleImageError}
                style={{ cursor: 'default' }}
              />
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
                    form[id as keyof Omit<PatchAdminArtRequest, 'artists'>] ??
                    ''
                  }
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
          <Button variant='destructive' onClick={handleDelete}>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* 작가 목록 모달 */}
    </Dialog>
  );
}
