import axiosInstance from '@/lib/axios';
import type { UploadFileResponse } from '@/types/gallery/review';

export const postFile = async (files: File[]): Promise<UploadFileResponse> => {
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
