import { signIn } from '../../../services/supabase/auth';
import { UserCredentials } from '../../../types/userCredentials';

export const signInWithEmail = ({ email, password }: UserCredentials) =>
  signIn({ email, password });
