import { useAlert } from 'react-alert';

import {
  useSelect as reactSupabaseUseSelect,
  UseSelectConfig,
  UseSelectResponse,
} from 'react-supabase';

interface UseSelectTypes {
  table: string;
  options?: UseSelectConfig;
  shouldHandleError?: boolean;
}

export const useSelect = ({
  table,
  options,
  shouldHandleError = true,
}: UseSelectTypes): UseSelectResponse => {
  const [data, reexecute] = reactSupabaseUseSelect(table, options);
  const alert = useAlert();
  const { error } = data;
  if (shouldHandleError && error) {
    alert.error('somethingWentWrong' + error.message);
  }
  return [data, reexecute];
};
