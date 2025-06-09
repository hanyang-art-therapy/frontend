import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import { AxiosResponse } from 'axios';
import { User } from '@/types';

type RefreshResponse = Pick<User, 'userNo' | 'role'> & {
  accessToken: string;
};

// Axios 인스턴스 생성
const apiInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

// Request 인터셉터
apiInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  // const token = useAuthStore.getState().accessToken;
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

// Reponse 인터셉터
apiInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const { setAccessToken, setUserNo, setRole } = useAuthStore.getState();

    // const isUserEndpoint = originalRequest.url?.includes('/user/');

    // 토큰이 없고 유저 관련 엔드포인트가 아닌 경우
    // if (!accessToken && !isUserEndpoint) {
    //   originalRequest._retry = true;

    //   try {
    //     const refreshResponse: AxiosResponse<RefreshResponse> =
    //       await axios.post(
    //         '/user/refresh',
    //         {},
    //         {
    //           baseURL: apiInstance.defaults.baseURL,
    //           withCredentials: true,
    //           timeout: 10000,
    //         }
    //       );

    //     const {
    //       accessToken: newAccessToken,
    //       userNo,
    //       role,
    //     } = refreshResponse.data;

    //     setAccessToken(newAccessToken);
    //     setUserNo(userNo);
    //     setRole(role);

    //     originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

    //     return apiInstance(originalRequest);
    //   } catch (refreshError) {
    //     if (
    //       axios.isAxiosError(refreshError) &&
    //       refreshError.response?.status === 403
    //     ) {
    //       useAuthStore.getState().reset();
    //     }

    //     return Promise.reject(refreshError);
    //   }
    // }

    // 401 응답 (액세스 토큰 만료 시)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse: AxiosResponse<RefreshResponse> =
          await axios.post(
            '/user/refresh',
            {},
            {
              baseURL: apiInstance.defaults.baseURL,
              withCredentials: true,
              timeout: 10000,
            }
          );

        const {
          accessToken: newAccessToken,
          userNo,
          role,
        } = refreshResponse.data;

        // 새로운 토큰 저장
        setAccessToken(newAccessToken);
        setUserNo(userNo);
        setRole(role);

        // 헤더에 새로운 토큰 추가
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 기존 요청 재시도
        return apiInstance(originalRequest);
      } catch (refreshError) {
        // 403 응답 (리프레시 토큰 만료 시)
        if (
          axios.isAxiosError(refreshError) &&
          refreshError.response?.status === 403
        ) {
          // 토큰 제거
          useAuthStore.getState().reset();
        }

        useAuthStore.getState().reset();
      }
    }

    return Promise.reject(error);
  }
);

export default apiInstance;
