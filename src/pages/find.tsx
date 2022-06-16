import {
  getUser,
  supabaseServerClient,
  withPageAuth,
} from '@supabase/supabase-auth-helpers/nextjs';
import React from 'react';

import { Find as FindPage, FindProps } from '../components/pages/Find/Find';

export const getServerSideProps = withPageAuth({
  authRequired: true,
  redirectTo: '/',
  async getServerSideProps(ctx) {
    const { user } = await getUser(ctx);
    const { data: profile } = await supabaseServerClient(ctx)
      .from('users')
      .select('first_name, last_name, role, email, is_accepted, avatar_url')
      .eq('user_id', user?.id);
    const { data: subjects } = await supabaseServerClient(ctx).from('subject').select('*');

    if (subjects && profile) {
      return { props: { subjects, profile, user } };
    }
    return { props: {} };
  },
});

const Find = ({ subjects, profile, user }: FindProps) => (
  <FindPage subjects={subjects} profile={profile} user={user} />
);
export default Find;
