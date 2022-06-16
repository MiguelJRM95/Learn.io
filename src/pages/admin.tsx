import {
  getUser,
  supabaseServerClient,
  withPageAuth,
} from '@supabase/supabase-auth-helpers/nextjs';
import React from 'react';

import { Admin as AdminPage } from '../components/pages/Admin/Admin';
import { ProfileData } from '../hooks/database/users';

export const getServerSideProps = withPageAuth({
  redirectTo: '/',
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    const { data: profile } = await supabaseServerClient(ctx)
      .from('users')
      .select('first_name, last_name, role, email, is_accepted, avatar_url')
      .eq('user_id', user?.id);

    if (profile) {
      return { props: { profile } };
    }
    return { props: {} };
  },
});

const Admin = (profile: ProfileData[]) => <AdminPage userProfile={profile} />;
export default Admin;
