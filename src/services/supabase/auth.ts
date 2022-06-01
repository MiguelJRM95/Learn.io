import { UserCredentials } from '@supabase/supabase-js';

import { envVars, routes } from '@/utils';

import { supabase } from './supabaseClient';

export const signIn = (params: UserCredentials) => supabase.auth.signIn(params);

export const signUp = ({ email, password }: UserCredentials, username: string) =>
  supabase.auth.signUp(
    {
      email,
      password,
    },
    {
      data: {
        username,
      },
    }
  );

export const resetPasswordForEmail = (email: string) =>
  supabase.auth.api.resetPasswordForEmail(email, {
    redirectTo: envVars.siteUrl + routes.resetpassword,
  });

export const updatePassword = (accessToken: string, password: string) =>
  supabase.auth.api.updateUser(accessToken, { password: password });
