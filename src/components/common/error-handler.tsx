type ApiErrorResponse = {
  message: string;
  statusCode?: number;
};

type ApiError = {
  response?: {
    data?: ApiErrorResponse;
    status?: number;
  };
};

export const handleApiError = (error: unknown): string => {
  const apiError = error as ApiError;

  const errorData = apiError.response?.data;

  if (errorData?.message) {
    return errorData.message;
  }

  // HTTP 상태 코드에 따른 기본 메시지
  switch (apiError.response?.status) {
    case 400:
      return '잘못된 요청입니다.';
    case 401:
      return '인증이 필요합니다.';
    case 403:
      return '접근이 거부되었습니다.';
    case 404:
      return '요청한 리소스를 찾을 수 없습니다.';
    case 409:
      return '이미 존재하는 데이터입니다.';
    case 500:
      return '서버 오류가 발생했습니다.';
    default:
      return '알 수 없는 오류가 발생했습니다.';
  }
};
