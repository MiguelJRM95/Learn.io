import { supabase } from '../../../services/supabase/supabaseClient';

export const fetchUserSubjets = (user_id: string) => {
  return supabase.from('user_subject').select(`subject:subject_id(*)`).match({ user_id });
};
export const fetchUserProfile = (user_id: string) => {
  return supabase.from('users').select('*').eq('user_id', user_id);
};
