import { supabase } from '../../services/supabase/supabaseClient';

export const getStudentProfile = (studentId: number) => {
  return supabase.from('users').select('user_id').eq('user_id', studentId);
};
