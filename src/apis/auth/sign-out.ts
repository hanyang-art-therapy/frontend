import { supabase } from '@/lib/supabase';

// DELETE /user/sign-out
export const signOut = async () => {
  await supabase.auth.signOut();
};
