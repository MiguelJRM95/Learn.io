/* eslint-disable react/jsx-no-undef */
import type { NextPage } from 'next';
import Image from 'next/image';
import { useState } from 'react';
import logo from '../components/logo.svg';
import { supabase } from '../utils/supabaseClient';
const Home: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const signInWithEmail = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) throw error;
  };

  return (
    <div className="flex w-full flex-wrap">
      <div className="flex w-full flex-col md:w-1/2">
        <div className="flex justify-center pt-12 md:-mb-24 md:justify-start md:pl-12">
          <a href="#" className="bg-black p-4 text-xl font-bold text-white">
            Logo
          </a>
        </div>

        <div className="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32">
          <p className="text-center text-3xl">Weclome To Learn.io</p>
          <form className="flex flex-col pt-3 md:pt-8">
            <div className="flex flex-col pt-4">
              <label htmlFor="email" className="text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={email}
                onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="password" className="text-lg">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              />
            </div>

            <button
              type="submit"
              onClick={signInWithEmail}
              className="mt-8 bg-black p-2 text-lg font-bold text-white hover:bg-gray-700"
            >
              Login
            </button>
          </form>
          <div className="pt-12 pb-12 text-center">
            <p>
              <a href="register.html" className="font-semibold underline">
                Register here.
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="flex h-screen w-1/2 shadow-2xl">
        <div className="inset-0 my-auto">
          <Image width="1000px" className="mt-10 h-screen w-full" src={logo} alt="test" />
        </div>
      </div>
    </div>
  );
};

export default Home;
