import { supabase } from '../../../services/supabase/supabaseClient';

export const fetchUserPersonalInformation = (uid: string | null | undefined) => {
  return supabase
    .from('public.users')
    .select('first_name, last_name, role, email, is_accepted')
    .eq('public.users.user_id', uid);
};
