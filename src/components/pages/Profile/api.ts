import { supabase } from '../../../services/supabase/supabaseClient';
import { editNameFormData } from '../../../types/schemas/editNameFormData';

export const changeName = (email: string, { firstName, lastName }: editNameFormData) => {
  return supabase
    .from('users')
    .update({ first_name: firstName, last_name: lastName })
    .eq('email', email);
};

export const changeAvatar = (email: string, avatar_url: string) => {
  console.log(email, avatar_url);
  return supabase.from('users').update({ avatar_url: avatar_url }).eq('email', email);
};

export const removeAvatar = (email: string) => {
  return supabase.from('users').update({ avatar_url: null }).eq('email', email);
};
