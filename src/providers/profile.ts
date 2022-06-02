import { User } from '@supabase/supabase-auth-helpers/react';
import React from 'react';
import { useDispatch } from 'react-redux';

import { ProfileData } from '../hooks/database/users';
import { fetchProfileClientSide } from '../services/supabase/database/select';
import { addProfile } from '../services/redux/slices/profile';
import { isEmpty } from '../utils/validations/isEmty';

interface ProfileProviderPropTypes {
  profile?: ProfileData;
  user?: User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}

/**
 * This provider ensures that latest profile is always kept in redux as a single source of truth
 * The user and profile props (pageProps) passed comes from nextjs data fetching functions (SSG or SSR):
 * https://nextjs.org/docs/advanced-features/custom-app
 * The profile is only fetched if user is signed and no profile was passed from pageProps
 */
export const ProfileProvider = ({ user, profile, children }: ProfileProviderPropTypes) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const isProfileEmpty = isEmpty(profile);
    const isUserEmpty = isEmpty(user);

    const isSignedIn = !isUserEmpty;

    if (isSignedIn) {
      if (isProfileEmpty) {
        const fetchAndStoreProfile = async () => {
          const { data } = await fetchProfileClientSide();
          const profile = data && data[0];
          dispatch(addProfile(profile));
        };
        fetchAndStoreProfile();
      } else dispatch(addProfile(profile));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return children;
};
