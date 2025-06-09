import FormField from '@/components/admin/form-field';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { Gallery } from '@/types';
import { useCallback } from 'react';

interface Props {
  form: any;
  galleries: Gallery[];
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSelectGallery: (galleriesNo: number) => void;
  onChangeArtType: (value: 'SINGLE' | 'GROUP') => void;
  onClickArtistModal: () => void;
  onRemoveArtist: (artistNo: number) => void;
  onChangeArtistDescription: (artistNo: number, value: string) => void;
}

export default function ArtworkFormFields({
  form,
  galleries,
  onChange,
  onSelectGallery,
  onChangeArtType,
  onClickArtistModal,
  onRemoveArtist,
  onChangeArtistDescription,
}: Props) {
  const handleArtistDescChange = useCallback(
    (artistNo: number, value: string) => {
      onChangeArtistDescription(artistNo, value);
    },
    [onChangeArtistDescription]
  );

  return (
    <div className='w-full max-h-[335px] overflow-y-auto border border-btn-gray-d rounded overflow-hidden divide-y divide-btn-gray-d'>
      <FormField id='artType' label='작품 유형'>
        <Select
          value={form.artType}
          onValueChange={(value) =>
            onChangeArtType(value as 'SINGLE' | 'GROUP')
          }
        >
          <SelectTrigger className='w-full border-none bg-white/0 px-[15px] outline-none'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='SINGLE'>SINGLE</SelectItem>
            <SelectItem value='GROUP'>GROUP</SelectItem>
          </SelectContent>
        </Select>
      </FormField>

      <FormField id='artName' label='작품명'>
        <input
          name='artName'
          value={form.artName}
          onChange={onChange}
          className='w-full px-[15px] outline-none'
        />
      </FormField>

      <FormField id='caption' label='캡션'>
        <input
          name='caption'
          value={form.caption}
          onChange={onChange}
          className='w-full px-[15px] outline-none'
        />
      </FormField>

      <FormField id='galleriesNo' label='전시회'>
        <Select
          value={String(form.galleriesNo)}
          onValueChange={(value) => onSelectGallery(Number(value))}
        >
          <SelectTrigger className='w-full border-none bg-white/0 px-[15px] outline-none'>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {galleries.map((g) => (
              <SelectItem key={g.galleriesNo} value={String(g.galleriesNo)}>
                {g.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormField>

      {form.artType === 'GROUP' && (
        <FormField id='coDescription' label={`공동 작품\n설명`}>
          <textarea
            name='coDescription'
            value={form.coDescription ?? ''}
            onChange={onChange}
            className='w-full min-h-[60px] px-[15px] my-[15px] resize-none outline-none'
          />
        </FormField>
      )}

      <FormField id='artistSelect' label='작가 선택'>
        <button
          type='button'
          onClick={onClickArtistModal}
          className='w-full h-full px-[15px] cursor-pointer'
        >
          <Search className='w-[18px] h-[18px] text-gray-6' />
        </button>
      </FormField>

      {form.artists.map((a: any) => (
        <FormField
          key={a.artistNo}
          id={`artist-${a.artistNo}`}
          label={`[ ${a.artistName} ]\n작품 설명`}
        >
          <div className='relative w-full'>
            <textarea
              value={a.description}
              onChange={(e) =>
                handleArtistDescChange(a.artistNo, e.target.value)
              }
              className='w-full min-h-[60px] px-[15px] my-[15px] resize-none outline-none'
            />
            <button
              type='button'
              onClick={() => onRemoveArtist(a.artistNo)}
              className='absolute top-[15px] right-[20px] text-gray-9 hover:text-black'
            >
              <X className='w-4 h-4' />
            </button>
          </div>
        </FormField>
      ))}
    </div>
  );
}
