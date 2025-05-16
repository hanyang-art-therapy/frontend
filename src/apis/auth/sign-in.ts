import { supabase } from '@/lib/supabase';

// POST /user/sign-in
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.');
  }

  return data;
};
