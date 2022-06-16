import { v4 } from 'uuid';
import { supabase } from '../../services/supabase/supabaseClient';

export const getProfilesImages = (subject_id: string) => {
  return supabase
    .from('user_subject')
    .select(`users:user_id(avatar_url)`)
    .eq('subject_id', subject_id)
    .limit(4);
};

export const enrollIntoASubject = (subject_id: string, uuid: string) => {
  return supabase
    .from('user_subject')
    .insert([{ user_subject_id: v4(), user_id: uuid, subject_id: subject_id }]);
};

export const checkSubjectPassword = async (subject_id: string, subject_password: string) => {
  return supabase.from('subject').select('*').match({ subject_id, subject_password });
};
