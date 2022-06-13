import Image from 'next/image';
import React, { useState } from 'react';

import dummyPic from '../../../assets/images/default-profile.png';
import { Navbar } from '../../layout/navbar/Navbar';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { editNameFormData } from '../../../types/schemas/editNameFormData';
import { useAlert } from 'react-alert';
import { changeAvatar, changeName, removeAvatar } from './api';
import { UiFileInputButton } from '../../UIFileInputButton/UiFileInputButton';
import { uploadFileRequest } from '../../../services/upload/upload';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Profile = ({ userProfile }: any) => {
  const [editFirstName, setEditFirstName] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const alert = useAlert();
  const profile = userProfile.profile[0];
  console.log('desde perfil', profile.avatar_url);

  const nameFormSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
  });

  const nameFormOptions = { resolver: yupResolver(nameFormSchema) };
  const {
    register: nameRegister,
    handleSubmit: nameHandleSubmit,
    formState: nameFormState,
  } = useForm<editNameFormData>(nameFormOptions);

  const { errors: nameErrors } = nameFormState;

  const onSubmitName = async () => {
    const { error, data } = await changeName(profile.email, { firstName, lastName });
    if (error) return alert.error('Something went wrong changing your name');
    if (data) {
      setEditFirstName(!editFirstName);
      return alert.success('Congrats your name has been change succesfully');
    }
  };

  const onChangeAvatar = async (email: string, formData: FormData) => {
    formData.append('email', email);
    const response = await uploadFileRequest(formData, (event) => {
      console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
    });

    const { error, data } = response;
    console.log(response);
    if (error) return alert.error(response.error as string);
    if (data) {
      const { data: supabaseData, error } = await changeAvatar(data[0], data[1]);
      if (error) {
        return alert.error('Your profile avatar has change!');
      }
      if (supabaseData) {
        return alert.success('Your profile avatar has change!');
      }
    }
  };

  const onRemoveAvatar = async (email: string) => {
    const { data, error } = await removeAvatar(email);
    if (error) {
      return alert.error('Your profile avatar can not be removed!');
    }
    if (data) {
      return alert.success('Your profile avatar has been removed!');
    }
  };

  return (
    <>
      <Navbar userProfile={profile} />
      <div className="m-auto my-28 w-fit max-w-lg items-center justify-center overflow-hidden rounded-2xl bg-slate-200 shadow-xl">
        <div className="h-44 bg-white"></div>
        <div className="-mt-20 flex justify-center">
          <Image
            alt="..."
            src={profile.avatar_url ? `/uploads/${profile.avatar_url}` : dummyPic}
            height={250}
            width={250}
            className="rounded-full"
            priority
          />
        </div>
        <div>
          <div className="mt-5 mb-1 px-3  flex justify-center space-x-4">
            <p className="text-center text-3xl font-bold">
              {firstName !== '' ? firstName : profile.first_name}{' '}
              {lastName !== '' ? lastName : profile.last_name}
            </p>
          </div>
        </div>
        <div className="mb-5 px-3 text-center text-sky-500 text-xl">
          {profile.role[0].toUpperCase() + profile.role.slice(1).toLowerCase()}
        </div>
        <blockquote>
          <p className="mx-2 mb-7 text-center text-base">{profile.email}</p>
        </blockquote>
        <div className="flex justify-center content-evenly gap-3">
          <button
            onClick={() => {
              onRemoveAvatar(profile.email);
            }}
            className="p-3 bg-black text-white m-2 rounded-md font-semibold hover:bg-slate-700"
          >
            Remove Avatar
          </button>
          <UiFileInputButton
            label="Change Avatar"
            uploadFileName="theFiles"
            onChange={(formData) => {
              onChangeAvatar(profile.email, formData);
            }}
            className="p-3 bg-black text-white m-2 rounded-md font-semibold hover:bg-slate-700"
          />
          <button
            onClick={() => {
              setEditFirstName(!editFirstName);
            }}
            className="p-3 bg-black text-white m-2 rounded-md font-semibold hover:bg-slate-700"
          >
            Change Name
          </button>
        </div>
        {editFirstName ? (
          <form
            onSubmit={nameHandleSubmit(onSubmitName)}
            className="m-5 flex flex-col items-center"
          >
            <div className="flex flex-row justify-between gap-2">
              <div className="flex w-full flex-col pt-4">
                <label htmlFor="firstName" className="ml-2 text-lg">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  placeholder="First name"
                  value={firstName}
                  {...nameRegister('firstName')}
                  onInput={(e) => setFirstName((e.target as HTMLInputElement).value)}
                  className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <div className="text-error text-center">
                  {nameErrors.firstName?.message ? 'First name required' : null}
                </div>
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
                  {...nameRegister('lastName')}
                  onInput={(e) => setLastName((e.target as HTMLInputElement).value)}
                  className="focus:shadow-outline mt-1 w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                />
                <div className="text-error text-center">
                  {nameErrors.lastName?.message ? 'Last name required' : null}
                </div>
              </div>
            </div>
            <button
              type="submit"
              className=" max-w-fit p-3 px-11 bg-black text-white m-2 rounded-md font-semibold hover:bg-slate-700"
            >
              Save
            </button>
          </form>
        ) : null}
      </div>
    </>
  );
};

export default Profile;
