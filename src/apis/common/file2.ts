// @/apis/common/file.ts
import apiInstance from '@/lib/axios';

export type FileUploadResponse = {
  filesNo: number;
  name: string;
  url: string;
};

// 파일 업로드 API
export const postFile = async (
  files: File[]
): Promise<FileUploadResponse[]> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file);
  });

  const response = await apiInstance.post('/files/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  // 서버 응답 형태에 따라 조정 필요
  // 예상 응답: { filesNo: number[], names: string[], urls: string[] }
  // 또는 { files: Array<{filesNo: number, name: string, url: string}> }

  if (response.data.filesNo && Array.isArray(response.data.filesNo)) {
    // 첫 번째 형태의 응답 처리
    return response.data.filesNo.map((filesNo: number, index: number) => ({
      filesNo,
      name: files[index].name,
      url:
        response.data.urls?.[index] ||
        `${process.env.REACT_APP_API_URL}/files/${filesNo}`,
    }));
  } else if (response.data.files && Array.isArray(response.data.files)) {
    // 두 번째 형태의 응답 처리
    return response.data.files;
  } else {
    // 단순한 형태의 응답 처리
    return response.data;
  }
};
