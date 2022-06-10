import React, { useState } from 'react';
import { useAlert } from 'react-alert';
import { signUpWithEmail } from './api';

import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import logo from '../../assets/images/logo.svg';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const alert = useAlert();

  type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };

  const formSchema = Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .min(8, 'Password must be at least 8 characters')
      .required(),
    name: Yup.string().required(),
    surname: Yup.string().required(),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState } = useForm<FormData>(formOptions);
  const { errors } = formState;

  const onSubmit = async () => {
    const { error, user } = await signUpWithEmail({ email, password }, { firstName, lastName });
    if (error) return alert.error('Something went wrong');
    if (user) {
      return alert.success('Congrats Sign up request success with email: ' + ' ' + email);
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
            <div className="flex flex-row justify-between">
              <div className="flex w-full flex-col pt-4">
                <label htmlFor="password" className="ml-2 text-lg">
                  First Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="First name"
                  value={firstName}
                  {...register('firstName')}
                  onInput={(e) => setFirstName((e.target as HTMLInputElement).value)}
                  className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
              <div className="flex w-full flex-col pt-4">
                <label htmlFor="password" className="ml-2 text-lg">
                  Last Name
                </label>
                <input
                  type="text"
                  id="surname"
                  placeholder="Last name"
                  value={lastName}
                  {...register('lastName')}
                  onInput={(e) => setLastName((e.target as HTMLInputElement).value)}
                  className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                />
              </div>
            </div>
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
              <div className="text-error text-center">{errors.confirmPassword?.message}</div>
            </div>

            <div className="flex flex-col pt-4">
              <label htmlFor="password" className="ml-2 text-lg">
                Confirm Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Repeat Password"
                value={confirmPassword}
                {...register('confirmPassword')}
                onInput={(e) => setConfirmPassword((e.target as HTMLInputElement).value)}
                className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
              />
              <div className="text-error text-center">{errors.confirmPassword?.message}</div>
            </div>

            <button
              type="submit"
              className="mt-8 bg-black p-2 text-lg font-bold text-white hover:bg-gray-700"
            >
              Register
            </button>
          </form>
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

export default Signup;
