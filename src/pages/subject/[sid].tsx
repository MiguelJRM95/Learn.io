import {
  getUser,
  supabaseServerClient,
  withPageAuth,
} from '@supabase/supabase-auth-helpers/nextjs';

import { Subject as SubjectPage } from '../../components/pages/Subject/Subject';
import { ProfileData } from '../../hooks/database/users';

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

const Subject = (profile: ProfileData[]) => <SubjectPage userProfile={profile} />;
export default Subject;
