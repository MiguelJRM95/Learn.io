import React from 'react';

import { Signup as SignupPage } from '../components/pages/Signup';
import { supabase } from '../services/supabase/supabaseClient';

interface ServerSidePropTypes {
  req: Request;
}
export async function getServerSideProps({ req }: ServerSidePropTypes) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (user) {
    // If user is signed in navigate to home
    return { props: {}, redirect: { destination: '/', permanent: false } };
  }
  return { props: {} };
}

const Signup = () => <SignupPage />;

export default Signup;
