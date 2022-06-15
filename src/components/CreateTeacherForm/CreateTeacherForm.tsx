import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';
import { SignUpFormData } from '../../types/schemas/studentSignUpFormData';
import { emailRegex } from '../../utils/patterns';
import { signUpWithEmail } from '../pages/Signup/api';
import { setUserAsTeacher } from './api';

const CreateTeacherForm = () => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const alert = useAlert();

  const formSchema = Yup.object().shape({
    email: Yup.string().matches(emailRegex).required(),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .min(8, 'Password must be at least 8 characters')
      .required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState, reset } = useForm<SignUpFormData>(formOptions);
  const { errors } = formState;

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [formState, reset]);

  const onSubmit = async () => {
    const { error, user } = await signUpWithEmail({ email, password }, { firstName, lastName });
    if (error) return alert.error('Something went wrong');
    if (user) {
      const { error, data: teacher } = await setUserAsTeacher(user.email);
      if (teacher)
        return alert.success('Congrats Sign up request success with email: ' + ' ' + email);
      if (error) return alert.error('Something went wrong');
    }
  };

  return (
    <form className="flex flex-col pt-3 md:pt-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row justify-between">
        <div className="flex w-full flex-col pt-4">
          <label htmlFor="firstName" className="ml-2 text-lg">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="First name"
            value={firstName}
            {...register('firstName')}
            onInput={(e) => setFirstName((e.target as HTMLInputElement).value)}
            className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
        <div className="flex w-full flex-col pt-4">
          <label htmlFor="lastName" className="ml-2 text-lg">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
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

      <div className="flex flex-col pt-4">
        <label htmlFor="repeatPassword" className="ml-2 text-lg">
          Confirm Password
        </label>
        <input
          type="password"
          id="repeatPassword"
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
        Add Teacher
      </button>
    </form>
  );
};

export default CreateTeacherForm;
