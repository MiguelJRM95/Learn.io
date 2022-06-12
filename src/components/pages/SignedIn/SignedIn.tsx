import React from 'react';

import { useProfile } from '../../../hooks/database/users';
import { Navbar } from '../../layout/navbar/Navbar';

export const SignedIn = () => {
  const [{ data: profileData }] = useProfile();
  const profile = profileData && profileData[0];
  return (
    <>
      <Navbar userProfile={profile} />
      <div>signedInPage</div>
    </>
  );
};

export default SignedIn;
