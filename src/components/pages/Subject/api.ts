import { v4 } from 'uuid';
import { supabase } from '../../../services/supabase/supabaseClient';

export const fetchSubjectSections = (sid: string | string[] | undefined) => {
  return supabase.from('section').select('section_id, name').eq('subject_id', sid);
};

export const createNewSection = (sectionName: string, subjectId: string | string[] | undefined) => {
  return supabase
    .from('section')
    .insert({ section_id: v4(), name: sectionName, subject_id: subjectId });
};
