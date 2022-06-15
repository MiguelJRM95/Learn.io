import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useAlert } from 'react-alert';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubjectFormData } from '../../types/schemas/subjectFormData';
import { supabase } from '../../services/supabase/supabaseClient';
import { createSubject } from './api';

const CreateSubjectForm = () => {
  const [subjectName, setSubjectName] = useState('');
  const [subjectYear, setSubjectYear] = useState('');
  const [subjectField, setSubjectField] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [subjectYearOptions, setSubjectYearOptions] = useState<string[]>([]);
  const [subjectFieldOptions, setSubjectFieldOptions] = useState<string[]>([]);
  const alert = useAlert();

  const formSchema = Yup.object().shape({
    subjectName: Yup.string().required(),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required(),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords do not match')
      .min(8, 'Password must be at least 8 characters')
      .required(),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit, formState, reset } = useForm<SubjectFormData>(formOptions);
  const { errors } = formState;

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        subjectName: '',
        subjectField: '',
        subjectYear: '',
        password: '',
        confirmPassword: '',
      });
    }
  }, [formState, reset]);

  const fetchFieldsandYears = async () => {
    const { data: fields, error: errorFields } = await supabase.from('list_fields').select('*');
    const { data: years, error: errorYears } = await supabase.from('list_years').select('*');
    if (years) setSubjectYearOptions(years);
    if (errorYears) console.log(errorYears);
    if (fields) setSubjectFieldOptions(fields);
    if (errorFields) console.log(errorFields);
    setLoading(!loading);
  };

  useEffect(() => {
    fetchFieldsandYears();
  });

  const onSubmit = async () => {
    console.log('first');
    const { data, error } = await createSubject({
      subjectName,
      subjectField,
      subjectYear,
      password,
    });
    if (data) alert.success('Subject created!');
    if (error) alert.error('Something went wrong.');
  };

  return (
    <form className="flex flex-col pt-3 md:pt-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-row justify-between">
        <div className="flex w-full flex-col pt-4">
          <label htmlFor="firstName" className="ml-2 text-lg">
            Subject Name
          </label>
          <input
            type="text"
            id="subjectName"
            placeholder="Subject name"
            value={subjectName}
            {...register('subjectName')}
            onInput={(e) => setSubjectName((e.target as HTMLInputElement).value)}
            className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          />
        </div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col pt-4">
          <label htmlFor="subjectField" className="ml-2 text-lg">
            Subject Field
          </label>
          <select
            onChange={(e) => {
              setSubjectField(e.target.value);
            }}
            id="subjectField"
            className="focus:shadow-outline mt-1 w-60 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          >
            {subjectFieldOptions
              ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Array.from(subjectFieldOptions).map((field: any) => {
                  return (
                    <option key={field.unnest} value={field.unnest}>
                      {field.unnest.toLowerCase()}
                    </option>
                  );
                })
              : null}
          </select>
          <div className="text-error text-center">
            {errors.subjectField?.message ? 'Invalid subject field' : null}
          </div>
        </div>

        <div className="flex flex-col pt-4">
          <label htmlFor="subjectYear" className="ml-2 text-lg">
            Subject Year
          </label>
          <select
            onChange={(e) => {
              setSubjectYear(e.target.value);
            }}
            id="subjectYear"
            className="focus:shadow-outline mt-1 w-60 appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
          >
            {subjectYearOptions
              ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Array.from(subjectYearOptions).map((year: any) => {
                  return (
                    <option key={year.unnest} value={year.unnest}>
                      {year.unnest}
                    </option>
                  );
                })
              : null}
          </select>
          <div className="text-error text-center">{errors.subjectYear?.message}</div>
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
        Create Subject
      </button>
    </form>
  );
};

export default CreateSubjectForm;
