import { supabase } from '../../services/supabase/supabaseClient';

export const setUserAsTeacher = (email: string | undefined) => {
  return supabase.from('users').update({ role: 'TEACHER', is_accepted: true }).eq('email', email);
};
