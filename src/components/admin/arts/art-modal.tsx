import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import ImageUploader from '@/components/admin/image-uploader';
import ArtworkFormFields from '@/components/admin/arts/art-form-field';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AdminArtResponse, PatchAdminArtRequest } from '@/types/admin/arts';
import { ArtistResponse } from '@/types/admin/artists';
import { Gallery } from '@/types';
import { getGalleries } from '@/apis/admin/galleries';
import { getArtists } from '@/apis/admin/artists';
import ArtistSelectModal from '@/components/admin/arts/artists-modal';
import { handleApiError } from '@/components/common/error-handler';

interface Props {
  art: AdminArtResponse;
  onClose: () => void;
  onEdit: (form: PatchAdminArtRequest) => void;
  onDelete: (artsNo: number) => void;
}

export default function AdminArtModal({
  art,
  onClose,
  onEdit,
  onDelete,
}: Props) {
  const [form, setForm] = useState({ ...art, filesNo: art.filesNo ?? 0 });
  const [file, setFile] = useState<File | null>(null);
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [artists, setArtists] = useState<ArtistResponse[]>([]);
  const [showArtistModal, setShowArtistModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const galleryRes = await getGalleries();
        const artistRes = await getArtists();
        setGalleries(galleryRes);
        setArtists(artistRes);
      } catch (error) {
        const errorMessage = handleApiError(error);
        toast.error(errorMessage);
      }
    };
    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File) => {
    if (form.fileUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(form.fileUrl);
    }
    const previewUrl = URL.createObjectURL(file);
    setFile(file);
    setForm((prev) => ({ ...prev, fileUrl: previewUrl }));
  };

  const handleUploadImage = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/admin/arts`,
        formData
      );
      const { filesNo, url } = res.data;
      setForm((prev) => ({ ...prev, filesNo, fileUrl: url }));
      toast.success('이미지 업로드가 완료되었습니다.');
    } catch (error) {
      const errorMessage = handleApiError(error);
      toast.error(errorMessage);
    }
  };

  const handleAddArtist = (artist: ArtistResponse) => {
    const newArtist = {
      artistNo: artist.artistNo,
      artistName: artist.artistName,
      description: '',
    };
    setForm((prev) => ({
      ...prev,
      artists:
        prev.artType === 'SINGLE'
          ? [newArtist]
          : [
              ...prev.artists.filter((a) => a.artistNo !== artist.artistNo),
              newArtist,
            ],
    }));
  };

  const handleRemoveArtist = (artistNo: number) => {
    setForm((prev) => ({
      ...prev,
      artists: prev.artists.filter((a) => a.artistNo !== artistNo),
    }));
  };

  const handleArtistDescriptionChange = (artistNo: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      artists: prev.artists.map((a) =>
        a.artistNo === artistNo ? { ...a, description: value } : a
      ),
    }));
  };

  const handleSubmit = () => {
    const artistList = form.artists.map(
      ({ artistNo, artistName, description }) => ({
        artistNo,
        artistName,
        description,
      })
    );
    onEdit({
      artName: form.artName,
      caption: form.caption,
      artType: form.artType,
      filesNo: form.filesNo,
      galleriesNo: form.galleriesNo,
      coDescription: form.artType === 'GROUP' ? form.coDescription : null,
      artistList,
      artsNo: form.artsNo,
    });
  };

  const handleDelete = () => {
    onDelete(form.artsNo);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className='max-w-[700px]'>
        <DialogHeader>
          <DialogTitle className='text-center'>ARTWORK INFO</DialogTitle>
        </DialogHeader>

        <div className='flex gap-[15px]'>
          {/* 이미지 업로드 */}
          <ImageUploader
            previewUrl={form.fileUrl}
            onFileChange={handleFileChange}
            onUpload={handleUploadImage}
          />

          {/* 정보 입력 필드 */}
          <ArtworkFormFields
            form={form}
            galleries={galleries}
            onChange={handleChange}
            onSelectGallery={(galleriesNo) =>
              setForm((prev) => ({ ...prev, galleriesNo }))
            }
            onChangeArtType={(value) =>
              setForm((prev) => ({
                ...prev,
                artType: value,
                artists: [],
                coDescription: value === 'GROUP' ? '' : null,
              }))
            }
            onClickArtistModal={() => setShowArtistModal(true)}
            onRemoveArtist={handleRemoveArtist}
            onChangeArtistDescription={handleArtistDescriptionChange}
          />
        </div>

        <DialogFooter className='grid grid-cols-2 mx-auto mt-[10px]'>
          <Button onClick={handleSubmit}>수정</Button>
          <Button variant='destructive' onClick={handleDelete}>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>

      {showArtistModal && (
        <ArtistSelectModal
          artists={artists}
          onSelect={handleAddArtist}
          onClose={() => setShowArtistModal(false)}
        />
      )}
    </Dialog>
  );
}
