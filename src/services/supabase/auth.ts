import { UserCredentials } from '../../types/userCredentials';
import { UserRawMetadata } from '../../types/userRawMetadata';
import { routes } from '../../utils/routes';

import { supabase } from './supabaseClient';

export const signIn = (params: UserCredentials) =>
  supabase.auth.signIn({
    email: params.email,
    password: params.password,
  });

export const signUp = (
  { email, password }: UserCredentials,
  { firstName, lastName }: UserRawMetadata
) =>
  supabase.auth.signUp(
    {
      email,
      password,
    },
    {
      data: {
        first_name: firstName,
        last_name: lastName,
      },
    }
  );

export const resetPasswordForEmail = (email: string) =>
  supabase.auth.api.resetPasswordForEmail(email, {
    redirectTo: routes.resetpassword,
  });

export const updatePassword = (accessToken: string, password: string) =>
  supabase.auth.api.updateUser(accessToken, { password: password });
