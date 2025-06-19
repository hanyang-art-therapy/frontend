import { MAX_FILE_SIZE } from '@/constants/common/common';
import axiosInstance from '@/lib/axios';
import type { UploadFileResponse } from '@/types/gallery/review';

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
