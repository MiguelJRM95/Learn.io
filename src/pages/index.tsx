/* eslint-disable react/jsx-no-undef */
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getFragmentParams } from '../utils/getters';
import { signIn } from '../services/supabase/auth';
import { useUser } from '../hooks/database/auth';
import { Signin as SignInPage } from '../components/pages/Signin/Signin';
import AuthLoadingScreen from '../components/AuthLoadingScreen/AuthLoadingScreen';
import { SignedIn as SignedInPage } from '../components/pages/SignedIn/SignedIn';

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  console.log(user);
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return <AuthLoadingScreen />;
  }
  /* is signed in */
  if (isSignedIn) return <SignedInPage />;

  return <SignInPage />;
};

export default Home;
