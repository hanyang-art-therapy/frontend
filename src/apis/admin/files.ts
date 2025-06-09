import apiInstance from '@/lib/axios';

export const FileUpload = async (
  formData: FormData
): Promise<{ filesNo: number }> => {
  const res = await apiInstance.post('/files', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res.data;
};
