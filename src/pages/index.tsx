import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getFragmentParams } from '../utils/getters';
import { signIn } from '../services/supabase/auth';
import { Signin as SignInPage } from '../components/pages/Signin/Signin';
import AuthLoadingScreen from '../components/AuthLoadingScreen/AuthLoadingScreen';
import { SignedIn as SignedInPage } from '../components/pages/SignedIn/SignedIn';
import { useUser } from '@supabase/supabase-auth-helpers/react';

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();
  const isSignedIn = user;
  let isWaitingForSignIn = false;
  let refreshToken: string;

  if (!isSignedIn) {
    const fragmentParams = getFragmentParams(router.asPath);
    refreshToken = fragmentParams.refresh_token;

    if (refreshToken) {
      const signUserInWithRefreshToken = () =>
        signIn({
          refreshToken,
        });
      isWaitingForSignIn = true;
      signUserInWithRefreshToken();
    }
  }

  if (isLoading || isWaitingForSignIn) {
    return <AuthLoadingScreen />;
  }
  /* is signed in */
  if (isSignedIn) return <SignedInPage uuid={user.id} />;

  return <SignInPage />;
};

export default Home;
