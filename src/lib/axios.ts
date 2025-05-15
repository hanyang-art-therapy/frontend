import axios from 'axios';
import { useAuthStore } from '@/store/auth';

// Axios 인스턴스 생성
const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

// Request 인터셉터
apiInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;

  return config;
});

// Reponse 인터셉터
apiInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // 401 응답 (액세스 토큰 만료 시)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          '/user/refresh',
          {},
          {
            baseURL: apiInstance.defaults.baseURL,
            withCredentials: true,
            timeout: 10000,
          }
        );

        const newToken = refreshResponse.data.accessToken;

        // 새로운 토큰 저장
        useAuthStore.getState().setAccessToken(newToken);

        // 헤더에 새로운 토큰 추가
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // 기존 요청 재시도
        return apiInstance(originalRequest);
      } catch (refreshError) {
        // 403 응답 (리프레시 토큰 만료 시)
        if (
          axios.isAxiosError(refreshError) &&
          refreshError.response?.status === 403
        ) {
          // 토큰 제거
          useAuthStore.getState().clearAccessToken();

          // 로그인 페이지로 리다이렉트
          window.location.href = '/sign-in';
        }

        useAuthStore.getState().clearAccessToken();
        window.location.href = '/sign-in';
      }
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
