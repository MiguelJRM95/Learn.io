import { User } from '@supabase/supabase-auth-helpers/react';
import { ProfileData } from '../hooks/database/users';

export type AppProviderProps = {
  children: React.ReactNode;
  profile?: ProfileData;
  user?: User;
};
