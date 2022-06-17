import { v4 } from 'uuid';
import { supabase } from '../../../../services/supabase/supabaseClient';

export const addResource = (
  name: string,
  resource_url: string,
  resource_extension: string,
  section_id: string
) => {
  return supabase.from('resource').insert({
    resource_id: v4(),
    name: name,
    resource_url: resource_url,
    resource_type: 'DOCUMENT',
    resource_extension: resource_extension,
    section_id: section_id,
  });
};

export const fetchResources = (section_id: string) => {
  return supabase.from('resource').select('*').eq('section_id', section_id);
};

export const deleteResource = (resource_id: string) => {
  return supabase.from('resource').delete().eq('resource_id', resource_id);
};
