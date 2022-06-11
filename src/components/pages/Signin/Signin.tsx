import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAlert } from 'react-alert';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { emailRegex } from '../../../utils/patterns';
import { signInWithEmail } from './api';
import { SignInFormData } from '../../../types/schemas/signInFormData';
import Image from 'next/image';
import logo from '../../../assets/images/logo.svg';
import Link from 'next/link';
import { routes } from '../../../utils/routes';

export const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const alert = useAlert();

  const formSchema = Yup.object().shape({
    email: Yup.string().matches(emailRegex).required(),
    password: Yup.string().required(),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm<SignInFormData>(formOptions);
  const { errors } = formState;

  const onSubmit = async () => {
    const { error, user } = await signInWithEmail({ email, password });
    if (error) return alert.error('Email or password incorrect');
    if (user) {
      return alert.success(`Signed in successfully with email: ${email}`);
    }
  };
  return (
    <div className="flex w-full flex-wrap">
      <div className="flex w-full flex-col md:w-1/2">
        <div className="flex justify-center pt-6 md:-mb-6 md:justify-start md:pl-8">
          <a href="#" className="bg-black p-4 text-xl font-extrabold text-white">
            Learn.io
          </a>
        </div>

        <div className="my-auto flex flex-col justify-center px-8 pt-8 md:justify-start md:px-24 md:pt-0 lg:px-32">
          <p className="text-center text-3xl font-semibold">Welcome to our platform.</p>
          <form className="flex flex-col pt-3 md:pt-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col pt-4">
              <label htmlFor="email" className="ml-2 text-lg">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="your@email.com"
                value={email}
                {...register('email')}
                onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
                className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              />
              <div className="text-error text-center">
                {errors.email?.message ? 'Invalid email address' : null}
              </div>
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="password" className="ml-2 text-lg">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                {...register('password')}
                onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
                className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              />
              <div className="text-error text-center">{errors.password?.message}</div>
            </div>

            <button
              type="submit"
              className="mt-8 bg-black p-2 text-lg font-bold text-white hover:bg-gray-700"
            >
              Sign in
            </button>
          </form>
          <Link href={routes.signup}>
            <p className="visited:text-black-500 mt-5 cursor-pointer text-center text-lg underline hover:text-gray-700">{`Student's Sign up`}</p>
          </Link>
        </div>
      </div>

      <div className="max-w-1/2 flex sm:h-screen sm:w-1/2 sm:shadow-2xl">
        <div className="inset-0 my-auto">
          <Image width="1000px" className="mt-10 h-screen w-full" src={logo} alt="logo" />
        </div>
      </div>
    </div>
  );
};

export default Signin;
