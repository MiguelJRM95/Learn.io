import { supabase } from '../../../services/supabase/supabaseClient';
import { editNameFormData } from '../../../types/schemas/editNameFormData';

export const changeName = (email: string, { firstName, lastName }: editNameFormData) => {
  return supabase
    .from('users')
    .update({ first_name: firstName, last_name: lastName })
    .eq('email', email);
};
