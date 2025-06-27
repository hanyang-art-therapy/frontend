import { supabase } from '@/lib/supabase';
import type {
  InfiniteKeywordSearchRequest,
  InfiniteScrollResponse,
} from '@/types';
import type {
  UsersResponse,
  UserResponse,
  PatchUserRequest,
} from '@/types/admin/users';
import { toast } from 'sonner';

export const getUsersTest = async ({
  keyword,
}: InfiniteKeywordSearchRequest): Promise<
  InfiniteScrollResponse<UsersResponse>
> => {
  if (keyword) {
    const { data, error } = await supabase
      .from('users')
      .select('userNo, userName, userId, studentNo')
      .ilike('userName', `%${keyword}%`);

    if (error) {
      toast.error(error.message);
    }

    if (data) {
      return {
        content: data,
        lastId: 0,
        hasNext: false,
      };
    }

    return {
      content: [],
      lastId: 0,
      hasNext: false,
    };
  }

  const { data, error } = await supabase
    .from('users')
    .select('userNo, userName, userId, studentNo');

  if (error) {
    toast.error(error.message);
  }

  if (data) {
    return {
      content: data,
      lastId: 0,
      hasNext: false,
    };
  }

  return {
    content: [],
    lastId: 0,
    hasNext: false,
  };
};

export const getUserTest = async (userNo: number): Promise<UserResponse> => {
  const { data, error } = await supabase
    .from('users')
    .select(
      'userNo, userId, password, email, userName, studentNo, role, userStatus'
    )
    .eq('userNo', userNo)
    .single();

  if (error) {
    toast.error(error.message);
  }

  return data as UserResponse;
};

export const patchUserTest = async (
  userNo: number,
  data: Omit<PatchUserRequest, 'userNo'>
) => {
  await supabase
    .from('users')
    .update({
      userId: data.userId,
      email: data.email,
      userName: data.userName,
      studentNo: data.studentNo,
      role: data.role,
      userStatus: data.userStatus,
    })
    .eq('userNo', userNo);

  return {
    message: '회원 정보가 수정되었습니다',
  };
};
