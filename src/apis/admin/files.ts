import apiInstance from '@/lib/axios';

export const FileUpload = async (
  formData: FormData
): Promise<{ filesNo: number }> => {
  const res = await apiInstance.post('/files/upload', formData);
  return res.data;
};
