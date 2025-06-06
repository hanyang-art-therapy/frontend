import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { PostAdminArtRequest } from '@/types/admin/arts';
import { getGalleries } from '@/apis/admin/galleries';
import { postAdminArt } from '@/apis/admin/arts';
import { FileUpload } from '@/apis/admin/files';
import FormField from '@/components/admin/form-field';

export default function AdminArtForm() {
  const [form, setForm] = useState<PostAdminArtRequest>({
    artName: '',
    caption: '',
    artType: 'SINGLE',
    filesNo: 0,
    galleriesNo: 0,
    coDescription: '',
    artistList: [],
  });

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [galleries, setGalleries] = useState<
    { galleriesNo: number; title: string }[]
  >([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files?.[0];
    if (uploaded) {
      setFile(uploaded);
      setPreviewUrl(URL.createObjectURL(uploaded));
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      toast.error('이미지를 선택해주세요.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await FileUpload(formData); // 서버에 업로드
      setForm((prev) => ({ ...prev, filesNo: res.filesNo })); // ✅ filesNo 반영
      toast.success('이미지 업로드 성공');
    } catch (error) {
      toast.error('이미지 업로드 실패');
    }
  };

  const handleSubmit = async () => {
    try {
      await postAdminArt({ ...form, galleriesNo: Number(form.galleriesNo) });
      toast.success('작품 등록 성공');
    } catch {
      toast.error('작품 등록 실패');
    }
  };

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const res = await getGalleries();
        setGalleries(res);
      } catch {
        toast.error('전시 목록 조회 실패');
      }
    };
    fetchGalleries();
  }, []);

  const fields = [
    { id: 'artType', label: '유형', placeholder: '유형' },
    { id: 'artName', label: '작품명', placeholder: '작품명' },
    { id: 'caption', label: '캡션', placeholder: '캡션' },
    { id: 'galleriesTitle', label: '전시회', placeholder: '전시회' },
    { id: 'galleriesTitle', label: '작가', placeholder: '작가' },
    { id: 'coDescription', label: '공동작품설명', placeholder: '공동작품설명' },
    { id: 'coDescription', label: '개인작품설명', placeholder: '개인작품설명' },
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
                className='w-full px-[15px] outline-none'
              />
            </FormField>
          ))}
        </div>
      </div>

      <Button type='button' onClick={handleSubmit} className='w-full mx-auto'>
        작품 등록
      </Button>
    </form>
  );
}
