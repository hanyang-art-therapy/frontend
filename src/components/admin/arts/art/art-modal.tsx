import { getAdminArtByNo } from '@/apis/admin/arts';
import { getGalleries } from '@/apis/admin/galleries';
import { postFile } from '@/apis/common/file';
import FormField from '@/components/admin/form-field';
import AddArtistSheet from '@/components/admin/arts/art/add-artist-sheet';
import { handleApiError } from '@/components/common/error-handler';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { MessageResponse } from '@/types';
import { AdminArtResponse, PatchAdminArtRequest } from '@/types/admin/arts';
import type { GalleriesResponse } from '@/types/admin/galleries';
import {
  ChangeEvent,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { toast } from 'sonner';

type Props = {
  artsNo: number;
  onEdit: (form: PatchAdminArtRequest) => Promise<MessageResponse>;
  onDelete: (artsNo: number) => Promise<MessageResponse>;
  onClose: () => void;
};

export default function AdminArtModal({
  artsNo,
  onClose,
  onEdit,
  onDelete,
}: Props) {
  const [art, setArt] = useState<AdminArtResponse | null>(null);
  const [galleries, setGalleries] = useState<GalleriesResponse[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [artImageUrl, setArtImageUrl] = useState('/images/no-image.jpg');
  const [newFileNo, setNewFileNo] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const [artResponse, galleriesResponse] = await Promise.all([
          getAdminArtByNo(artsNo),
          getGalleries(),
        ]);

        setArt(artResponse);
        setGalleries(galleriesResponse);
        setArtImageUrl(artResponse.fileUrl || '/images/no-image.jpg');
      };

      fetchData();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  }, [artsNo]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'artType') {
      setArt((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          artType:
            prev.artists.length > 1 ? 'GROUP' : (prev.artType as 'SINGLE'),
        };
      });
      return;
    }

    setArt((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleGalleryChange = (value: string) => {
    const galleriesNo = parseInt(value);
    const selectedGallery = galleries.find(
      (g) => g.galleriesNo === galleriesNo
    );

    setArt((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        galleriesNo,
        title: selectedGallery?.title || '',
      };
    });
  };

  const handleCoDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setArt((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleArtistDescriptionChange = (
    artistNo: number,
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { value } = e.target;

    setArt((prev) => {
      if (!prev) return null;

      return {
        ...prev,
        artists: prev.artists.map((artist) =>
          artist.artistNo === artistNo
            ? { ...artist, description: value }
            : artist
        ),
      };
    });
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedImage = e.target.files?.[0];

    if (!uploadedImage) {
      toast.error('이미지를 선택해주세요.');
      return;
    }

    try {
      setArtImageUrl(URL.createObjectURL(uploadedImage));
      setFile(uploadedImage);
    } catch (error) {
      toast.error(handleApiError(error));
      e.target.value = '';
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error('이미지를 선택해주세요.');
      return;
    }

    try {
      setUploading(true);
      const response = await postFile([file]);

      setNewFileNo(response[0].filesNo);

      toast.success('작품 이미지가 등록되었습니다. 작품 등록을 진행해주세요.');
    } catch (error) {
      toast.error(handleApiError(error));
      setNewFileNo(null);
    } finally {
      setUploading(false);
    }
  };

  const handleImageError = (e: SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/images/no-image.jpg';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!art) return;

    try {
      const submitForm: PatchAdminArtRequest = {
        artsNo: art.artsNo,
        galleriesNo: art.galleriesNo,
        artName: art.artName,
        caption: art.caption,
        artType: art.artType as 'SINGLE' | 'GROUP',
        coDescription: art.coDescription,
        filesNo: newFileNo,
        artists: art.artists.map((artist) => ({
          artistNo: artist.artistNo,
          description: artist.description,
          name: artist.name,
        })),
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
      if (!art) return;

      const res = await onDelete(art.artsNo);
      toast.success(res.message);
      onClose();
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const getInputValue = (key: string): string => {
    if (!art) return '';

    const value = art[key as keyof AdminArtResponse];

    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    if (value === null || value === undefined) return '';

    return '';
  };

  // 작가 업데이트 핸들러
  const handleUpdateArtists = (
    updatedArtists: Array<{
      artistNo: number;
      description: string;
      name: string;
    }>
  ) => {
    if (!art) return;

    setArt((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        artists: updatedArtists,
      };
    });
  };

  const fields = [
    { id: 'artType', label: '작품타입' },
    { id: 'artName', label: '작품명' },
    { id: 'caption', label: '캡션' },
  ];

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className='max-w-[1000px] overflow-y-auto max-h-[80vh]'>
        <DialogHeader>
          <DialogTitle className='text-center'>ARTWORK INFO</DialogTitle>
        </DialogHeader>

        <div className='flex gap-[15px]'>
          {/* 이미지 업로드 */}
          <div className='flex flex-col items-center gap-[10px]'>
            <label
              htmlFor='file-upload'
              className='w-[130px] aspect-[4/5] border border-btn-gray-d bg-btn-gray-fa rounded cursor-pointer hover:opacity-70 flex items-center justify-center overflow-hidden'
            >
              <img
                src={artImageUrl}
                alt='preview'
                className='w-full h-full object-cover'
                onError={handleImageError}
              />
            </label>
            <input
              id='file-upload'
              type='file'
              ref={fileInputRef}
              accept='image/*'
              onChange={handleFileChange}
              className='hidden'
            />
            <Button
              type='button'
              onClick={handleFileUpload}
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
                  value={getInputValue(id)}
                  onChange={handleInputChange}
                  autoComplete='off'
                  disabled={id === 'artType'}
                  className='w-full px-[15px] outline-none'
                />
              </FormField>
            ))}

            {/* 전시회 선택 */}
            <FormField id='gallery' label='전시회'>
              <Select
                value={art?.galleriesNo?.toString() || ''}
                onValueChange={handleGalleryChange}
              >
                <SelectTrigger className='w-full border-none outline-none focus:ring-0 focus:ring-offset-0'>
                  <SelectValue placeholder='전시회를 선택하세요' />
                </SelectTrigger>
                <SelectContent>
                  {galleries.map((gallery) => (
                    <SelectItem
                      key={gallery.galleriesNo}
                      value={gallery.galleriesNo.toString()}
                    >
                      {gallery.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>

            {art?.artists.map((artist) => (
              <FormField
                key={artist.artistNo}
                id={artist.artistNo.toString()}
                label={artist.name}
              >
                <textarea
                  id={artist.artistNo.toString()}
                  name={artist.artistNo.toString()}
                  value={artist.description}
                  onChange={(e) =>
                    handleArtistDescriptionChange(artist.artistNo, e)
                  }
                  autoComplete='off'
                  className='w-full px-[15px] outline-none'
                  rows={6}
                />
              </FormField>
            ))}

            {art?.artType === 'GROUP' && (
              <FormField id='coDescription' label='공동 작품평'>
                <textarea
                  id='coDescription'
                  name='coDescription'
                  value={art?.coDescription ?? ''}
                  onChange={handleCoDescriptionChange}
                  autoComplete='off'
                  className='w-full px-[15px] outline-none'
                  rows={4}
                />
              </FormField>
            )}

            <div className='h-10 flex items-center justify-center'>
              <AddArtistSheet
                currentArtists={art?.artists || []}
                onUpdateArtists={handleUpdateArtists}
              />
            </div>
          </div>
        </div>

        <DialogFooter className='grid grid-cols-2 mx-auto mt-[10px]'>
          <Button onClick={handleSubmit}>수정</Button>
          <Button variant='destructive' onClick={handleDelete}>
            삭제
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
