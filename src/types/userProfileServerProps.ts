import { User } from '@supabase/supabase-auth-helpers/react';
import { ProfileData } from '../hooks/database/users';

export type UserProfileServerProps = {
  accessToken: string;
  profile?: Array<ProfileData>;
  user?: User;
};
