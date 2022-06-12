import { User } from '@supabase/supabase-auth-helpers/nextjs';
import React from 'react';

import { useProfile } from '../../../hooks/database/users';
import { Navbar } from '../../layout/navbar/Navbar';

type Props = {
  sessionUser: User;
};

export const SignedIn = ({ sessionUser }: Props) => {
  const [{ data: profileData }] = useProfile();
  let sessionProfile = null;
  profileData?.forEach((profile) => {
    if (profile.user_id === sessionUser.id) {
      sessionProfile = profile;
    }
  });

  return (
    <>
      <Navbar userProfile={sessionProfile} />
      <div>signedInPage</div>
    </>
  );
};

export default SignedIn;
