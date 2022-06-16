import { supabase } from '../../services/supabase/supabaseClient';
import { SubjectType } from '../../types/subjectType';
import { v4 } from 'uuid';

export const createSubject = ({
  subject_name,
  subject_field,
  subject_year,
  subject_password,
}: SubjectType) => {
  return supabase.from('subject').insert([
    {
      subject_id: v4(),
      subject_name: subject_name,
      subject_field: subject_field,
      subject_year: subject_year,
      subject_password: subject_password,
    },
  ]);
};
