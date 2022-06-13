import {
  getUser,
  supabaseServerClient,
  withPageAuth,
} from '@supabase/supabase-auth-helpers/nextjs';
import React from 'react';

import { Profile as ProfilePage } from '../components/pages/Profile/Profile';

export const getServerSideProps = withPageAuth({
  redirectTo: '/',
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    const { data: profile } = await supabaseServerClient(ctx)
      .from('users')
      .select('first_name, last_name, role, email, is_accepted, avatar_url')
      .match({ user_id: user?.id });

    if (profile) {
      return { props: { profile } };
    }
    return { props: {} };
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Profile = (profile: any) => <ProfilePage userProfile={profile} />;
export default Profile;
