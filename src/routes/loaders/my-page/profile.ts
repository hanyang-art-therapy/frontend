import { getMyProfile } from '@/apis/my-page/profile';

export const myProfileLoader = async () => {
  const response = await getMyProfile();

  return response;
};
