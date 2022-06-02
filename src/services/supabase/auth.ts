import { UserCredentials } from '../../types/userCredentials';
import { UserRawMetadata } from '../../types/userRawMetadata';
import { routes } from '../../utils/routes';

import { supabase } from './supabaseClient';

export const signIn = (params: UserCredentials) => supabase.auth.signIn(params);

export const signUp = (
  { email, password }: UserCredentials,
  { first_name, last_name }: UserRawMetadata
) =>
  supabase.auth.signUp(
    {
      email,
      password,
    },
    {
      data: {
        first_name,
        last_name,
      },
    }
  );

export const resetPasswordForEmail = (email: string) =>
  supabase.auth.api.resetPasswordForEmail(email, {
    redirectTo: routes.resetpassword,
  });

export const updatePassword = (accessToken: string, password: string) =>
  supabase.auth.api.updateUser(accessToken, { password: password });
