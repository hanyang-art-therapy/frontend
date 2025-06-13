import { postAdminArt } from '@/apis/admin/arts';
import { postFile } from '@/apis/common/file';
import SelectArtistDialog from '@/components/admin/arts/art/select-artist-dialog';
import FormField from '@/components/admin/form-field';
import { handleApiError } from '@/components/common/error-handler';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { InfiniteScrollResponse } from '@/types';
import type { ArtistResponse } from '@/types/admin/artists';
import type { PostAdminArtRequest } from '@/types/admin/arts';
import type { GalleriesResponse } from '@/types/admin/galleries';
import {
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
  useState,
} from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'sonner';

type AdminArtFormProps = {
  setSelectedTab: Dispatch<SetStateAction<'view' | 'form'>>;
};

export default function AdminArtForm({ setSelectedTab }: AdminArtFormProps) {
  const { galleriesResponse } = useLoaderData() as {
    galleriesResponse: GalleriesResponse[];
  };

  const { artistsResponse } = useLoaderData() as {
    artistsResponse: InfiniteScrollResponse<ArtistResponse>;
  };

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [form, setForm] = useState<PostAdminArtRequest>({
    artName: '',
    caption: '',
    artType: 'SINGLE',
    filesNo: 0,
    galleriesNo: 0,
    coDescription: '',
    artistList: [],
  });

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedImage = e.target.files?.[0];

    if (!uploadedImage) {
      toast.error('이미지를 선택해주세요.');
      return;
    }

    try {
      setPreviewUrl(URL.createObjectURL(uploadedImage));
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
      const response = await postFile([file]);

      setForm((prev) => ({ ...prev, filesNo: response[0].filesNo }));

      toast.success('작품 이미지가 등록되었습니다. 작품 등록을 진행해주세요.');
    } catch (error) {
      toast.error(handleApiError(error));
      setForm((prev) => ({ ...prev, filesNo: 0 }));
    }
  };

  const handleSubmit = async () => {
    if (!form.artistList.length) {
      toast.error('작가를 선택해주세요.');
      return;
    }

    try {
      await postAdminArt({
        ...form,
        galleriesNo: Number(form.galleriesNo),
        artType: form.artistList.length > 1 ? 'GROUP' : 'SINGLE',
      });
      toast.success('작품 등록이 완료되었습니다.');
      setSelectedTab('view');
    } catch (error) {
      toast.error(handleApiError(error));
    }
  };

  const handleInputChange =
    (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [id]: e.target.value }));
    };

  const handleGallerySelectChange = (value: string) => {
    setForm((prev) => ({ ...prev, galleriesNo: Number(value) }));
  };

  const fields = [
    { id: 'artName', label: '작품명', placeholder: '작품명' },
    { id: 'caption', label: '캡션', placeholder: '캡션' },
  ];

  return (
    <form className='flex flex-col gap-[40px]'>
      <div className='flex gap-[30px] items-start'>
        <div className='flex flex-col items-center gap-[15px]'>
          <label
            htmlFor='file-upload'
            className='w-[130px] aspect-[4/5] border border-btn-gray-d bg-btn-gray-fa rounded cursor-pointer hover:opacity-70 flex items-center justify-center overflow-hidden'
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt='preview'
                className='w-full h-full object-cover'
              />
            ) : (
              <span className='t-r-14 text-gray-6'>NO IMAGE</span>
            )}
          </label>

          <input
            id='file-upload'
            type='file'
            accept='image/*'
            onChange={handleFileChange}
            className='hidden'
          />

          <Button
            type='button'
            variant='secondary'
            size='sm'
            className='w-full'
            onClick={handleFileUpload}
          >
            이미지 업로드
          </Button>
        </div>

        <div className='w-full border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
          {fields.map(({ id, label, placeholder }) => (
            <FormField key={id} id={id} label={label}>
              <input
                id={id}
                name={id}
                placeholder={placeholder}
                onChange={handleInputChange(id)}
                className='w-full px-[15px] outline-none'
              />
            </FormField>
          ))}

          <FormField id='galleriesTitle' label='전시회'>
            <Select onValueChange={handleGallerySelectChange}>
              <SelectTrigger className='w-full border-none'>
                <SelectValue placeholder='전시회를 선택해주세요.' />
              </SelectTrigger>

              <SelectContent className='w-full'>
                {galleriesResponse.map((gallery) => (
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

          <FormField id='artistList' label='작가'>
            <SelectArtistDialog
              initialArtists={artistsResponse}
              form={form}
              setForm={setForm}
            />
          </FormField>

          {form.artistList.length > 1 && (
            <FormField id='coDescription' label='공동작품설명'>
              <textarea
                id='coDescription'
                name='coDescription'
                placeholder='공동작품설명'
                className='w-full p-[15px] outline-none'
                rows={10}
              />
            </FormField>
          )}
        </div>
      </div>

      <Button type='button' onClick={handleSubmit} className='w-full mx-auto'>
        작품 등록
      </Button>
    </form>
  );
}
