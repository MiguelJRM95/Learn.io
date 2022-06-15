import { supabase } from '../../services/supabase/supabaseClient';
import { SubjectType } from '../../types/subjectType';
import { v4 } from 'uuid';

export const createSubject = ({
  subjectName,
  subjectField,
  subjectYear,
  password,
}: SubjectType) => {
  return supabase.from('subject').insert([
    {
      subject_id: v4(),
      subject_name: subjectName,
      subject_field: subjectField,
      subject_year: subjectYear,
      subject_password: password,
    },
  ]);
};
