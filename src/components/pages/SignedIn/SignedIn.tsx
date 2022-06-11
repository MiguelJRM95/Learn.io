import React from 'react';

import { useProfile } from '../../../hooks/database/users';

export const SignedIn = () => {
  const [{ data: profileData }] = useProfile();
  const profile = profileData && profileData[0];
  console.log(profile);
  return <div>signedInPage</div>;
};

export default SignedIn;
