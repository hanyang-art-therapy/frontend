import { getUsers } from '@/apis/admin/users';
import { InfiniteScrollResponse } from '@/types';
import { UserResponse } from '@/types/admin/users';

export const adminUserLoader = async (): Promise<
  InfiniteScrollResponse<UserResponse>
> => {
  const response = await getUsers();

  return response;
};
