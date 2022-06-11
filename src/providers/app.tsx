import { UserProvider } from '@supabase/supabase-auth-helpers/react';
import * as React from 'react';
import { Provider as ReactSupabaseProvider } from 'react-supabase';
import { Provider as AlertProvider } from 'react-alert';
import { Provider as Redux } from 'react-redux';

import { ProfileProvider } from './profile';
import { AppProviderProps } from '../types/appProviderProps';
import { reduxStore } from '../services/redux/store';
import { supabase } from '../services/supabase/supabaseClient';
import { Alert } from '../components/Alert/Alert';

export const AppProvider = ({ children, profile, user }: AppProviderProps) => {
  return (
    <AlertProvider template={Alert} timeout={6000} transition={'scale'}>
      <Redux store={reduxStore}>
        <ReactSupabaseProvider
          value={
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            supabase as any
          } /* conflict between expected type supabase client from supabasejs and given supabase client from supabase-auth-helpers*/
        >
          <UserProvider supabaseClient={supabase}>
            <ProfileProvider profile={profile} user={user}>
              {children}
            </ProfileProvider>
          </UserProvider>
        </ReactSupabaseProvider>
      </Redux>
    </AlertProvider>
  );
};
