import { signUp } from '../../../services/supabase/auth';
import { UserCredentials } from '../../../types/userCredentials';
import { UserRawMetadata } from '../../../types/userRawMetadata';

export const signUpWithEmail = (
  { email, password }: UserCredentials,
  { firstName, lastName }: UserRawMetadata
) => signUp({ email, password }, { firstName, lastName });
