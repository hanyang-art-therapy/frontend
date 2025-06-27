import { handleApiError } from '@/components/common/error-handler';
import { MAX_FILE_SIZE } from '@/constants/common/common';
import axiosInstance from '@/lib/axios';
import { supabase } from '@/lib/supabase';
import type { UploadFileResponse } from '@/types/gallery/review';
import { toast } from 'sonner';

export const postFile = async (files: File[]): Promise<UploadFileResponse> => {
  let filesSize = 0;

  files.forEach((file) => {
    filesSize += file.size;

    if (filesSize > MAX_FILE_SIZE) {
      throw {
        response: {
          data: {
            message: '파일의 용량이 5MB를 초과하였습니다.',
          },
        },
      };
    }
  });

  if (files.length > 5) {
    throw {
      response: {
        data: {
          message: '최대 5개의 파일만 업로드할 수 있습니다.',
        },
      },
    };
  }

  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file);
  });

  formData.append('filesType', 'ART');

  const response = await axiosInstance.post('/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const postFileTest = async (
  files: File[],
  category: string
): Promise<UploadFileResponse> => {
  const uploadResults = [];

  for (const file of files) {
    const fileName = `${Math.random().toString(36).substring(2)}`;
    const filePath = `${category}/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) {
      const errorMessage = handleApiError(uploadError);
      toast.error(errorMessage);
      continue;
    }

    const { data: filesData, error: filesError } = await supabase
      .from('files')
      .insert({
        name: fileName,
        url: supabase.storage.from('images').getPublicUrl(filePath).data
          .publicUrl,
        extension: file.type.split('/')[1],
        filesSize: file.size,
        filesType: category,
      })
      .select()
      .single();

    if (filesError) {
      const errorMessage = handleApiError(filesError);
      toast.error(errorMessage);
      continue;
    }

    uploadResults.push(filesData);
  }

  return uploadResults;
};
