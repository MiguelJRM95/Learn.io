import { UseSelectConfig, UseSelectResponse } from 'react-supabase';

import { tables } from '../../services/supabase/database/tables';

import { useSelect } from './handlers';

interface ParamTypes {
  options?: UseSelectConfig;
}

export interface ProfileData {
  user_id: null | string;
  avatar_url: null | string;
  first_name: null | string;
  last_name: null | string;
  role: null | string;
  is_accepted: boolean;
}

export const useProfile = ({ options }: ParamTypes = {}): UseSelectResponse<ProfileData> =>
  useSelect({ table: tables.users, options });
