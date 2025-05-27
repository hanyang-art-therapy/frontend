import { supabase } from '@/lib/supabase';
import type { UploadFileResponse } from '@/types/gallery/review';
import axios from 'axios';

export const postFile = async (file: File): Promise<UploadFileResponse[]> => {
  const fileName = `${new Date().getFullYear()}_${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from('images')
    .upload(`uploads/${fileName}`, file);

  if (uploadError) {
    throw new Error('파일 업로드에 실패했습니다. 잠시 후 다시 시도해주세요');
  }

  const { data: urlData } = supabase.storage
    .from('images')
    .getPublicUrl(`uploads/${fileName}`);
  const url = urlData.publicUrl;

  const { data, error: insertError } = await supabase
    .from('files')
    .insert([
      {
        name: file.name,
        url: url,
        filesSize: file.size,
        extension: file.name.split('.').pop()?.toLowerCase() || '',
        filesType: file.type,
      },
    ])
    .select()
    .single();

  if (insertError) {
    throw new Error('파일 업로드에 실패했습니다. 잠시 후 다시 시도해주세요');
  }

  return [
    {
      url,
      name: file.name,
      filesNo: data.filesNo,
      filesSize: file.size,
      extension: file.name.split('.').pop()?.toLowerCase() || '',
      filesType: file.type,
    },
  ] as UploadFileResponse[];
};

export const postFileMocking = async (
  file: File
): Promise<UploadFileResponse[]> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
